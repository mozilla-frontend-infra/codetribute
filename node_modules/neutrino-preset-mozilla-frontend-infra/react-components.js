const fork = require('@neutrinojs/fork');
const lint = require('./react-lint');
const decorators = require('./decorators');
const devtool = require('./devtool');
const localModules = require('./local-modules');
const stage = require('./stage');

const reactComponents = require.resolve('@neutrinojs/react-components');

module.exports = (neutrino, options = {}) => {
  neutrino.use(lint, options.eslint);
  neutrino.use(reactComponents, options);
  neutrino.use(devtool);
  neutrino.config.when(neutrino.options.command === 'build', () => {
    neutrino.use(fork, {
      configs: {
        'components-es5': {
          options: {
            output: 'es5',
          },
          use: [reactComponents, require.resolve('./react-components-es5')],
        },
      },
    });
  });
  neutrino.use(decorators);
  neutrino.use(localModules);
  neutrino.use(stage, options.staging);
};
