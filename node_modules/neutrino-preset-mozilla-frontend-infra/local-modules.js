const { join } = require('path');

const MODULES = join(__dirname, 'node_modules');

module.exports = neutrino => {
  neutrino.config.resolve.modules.add(MODULES);
  neutrino.config.resolveLoader.modules.add(MODULES);
};
