const react = require('@neutrinojs/react');
const lint = require('./react-lint');
const decorators = require('./decorators');
const rhl = require('./rhl');
const versioning = require('./versioning');
const devtool = require('./devtool');
const localModules = require('./local-modules');
const stage = require('./stage');

module.exports = (neutrino, options = {}) => {
  neutrino.use(lint, options.eslint);
  neutrino.use(react, options);
  neutrino.use(decorators);
  neutrino.use(rhl);
  neutrino.use(versioning, { cacheVersion: options.cacheVersion });
  neutrino.use(devtool);
  neutrino.use(localModules);
  neutrino.use(stage, options.staging);
};
