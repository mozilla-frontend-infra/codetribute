const styleguide = require('neutrino-middleware-styleguidist');
const merge = require('deepmerge');
const { basename, join } = require('path');

module.exports = (neutrino, opts = {}) => {
  const addBabelPolyfill =
    opts.polyfill &&
    opts.polyfill.babel !== false &&
    neutrino.options.packageJson.dependencies.includes('babel-polyfill');
  const options = merge(
    {
      components: join(
        basename(neutrino.options.source),
        'components/**/*.jsx'
      ),
      require: addBabelPolyfill ? ['babel-polyfill'] : [],
      showUsage: true,
      skipComponentsWithoutExample: true,
    },
    opts
  );

  neutrino.use(styleguide, options);
};
