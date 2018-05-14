const node = require('@neutrinojs/node');
const lint = require('./node-lint');
const decorators = require('./decorators');
const versioning = require('./versioning');
const devtool = require('./devtool');
const localModules = require('./local-modules');
const stage = require('./stage');

module.exports = (neutrino, options = {}) => {
  neutrino.use(lint, options.eslint);
  neutrino.use(node, options);
  neutrino.use(decorators);
  neutrino.use(versioning, { cacheVersion: options.cacheVersion });
  neutrino.use(devtool);
  neutrino.use(localModules);
  neutrino.use(stage, options.staging);
};
