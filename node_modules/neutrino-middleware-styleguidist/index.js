const styleguidist = require('react-styleguidist');
const merge = require('deepmerge');
const ora = require('ora');
const { join } = require('path');

const MODULES = join(__dirname, 'node_modules');

const prepCommand = (neutrino, env, spinner) => {
  const { interactive } = global;

  global.interactive = false;
  process.env.NODE_ENV = env;
  neutrino.options.env.NODE_ENV = env;

  if (!neutrino.options.args.quiet) {
    spinner.enabled = interactive;
    spinner.start();
  }
};

module.exports = (neutrino, opts = {}) => {
  const spinner = ora({ text: 'Building styleguide' });
  const options = merge({
    logger: {
      warn: console.warn,
      info: console.log,
      debug: console.log
    },
    components: join(
      neutrino.options.source,
      'components/**',
      `*.{${neutrino.options.extensions.join(',')}}`
    )
  }, opts || {});

  neutrino.config.resolve.modules.add(MODULES);
  neutrino.config.resolveLoader.modules.add(MODULES);

  if (neutrino.options.command === 'styleguide:start') {
    prepCommand(neutrino, 'development', spinner);
  } else if (neutrino.options.command === 'styleguide:build') {
    prepCommand(neutrino, 'production', spinner);
  }

  neutrino.register('styleguide:start', () =>
    new Promise((resolve, reject) => {
      const styleguide = styleguidist(merge(options, {
        webpackConfig: neutrino.config.toConfig()
      }));

      styleguide.server((err, config) => {
        if (err) {
          if (!neutrino.options.args.quiet) {
            spinner.fail('Starting styleguide failed');
            reject(err);
          }
        } else {
          if (!neutrino.options.args.quiet) {
            spinner.succeed(`Styleguidist server running at http://${config.serverHost}:${config.serverPort}`);
          }

          process.on('SIGINT', () => process.exit(0));
          process.on('SIGTERM', () => process.exit(0));
        }
      });
    }),
    'Launch a Styleguidist server to preview React components'
  );

  neutrino.register('styleguide:build', () =>
    new Promise((resolve, reject) => {
      neutrino.config.when(
        neutrino.config.plugins.has('runtime-chunk'),
        (config) => {
          config.plugins
            .delete('runtime-chunk')
            .delete('vendor-chunk')
            .delete('named-modules')
            .delete('named-chunks')
            .delete('name-all');
        }
      );

      const styleguide = styleguidist(merge(options, {
        webpackConfig: neutrino.config.toConfig()
      }));

      styleguide.build((err, config) => {
        if (err) {
          if (!neutrino.options.args.quiet) {
            spinner.fail('Building styleguide failed');
            reject(err);
          }
        } else {
          if (!neutrino.options.args.quiet) {
            spinner.succeed(`Style guide published to ${config.styleguideDir}`);
          }

          resolve();
        }
      });
    }),
    'Launch a Styleguidist server to preview React components'
  );
};
