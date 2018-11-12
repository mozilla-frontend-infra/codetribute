const neutrino = require('neutrino');

const config = neutrino().webpack();

config.resolve.modules.push('src');
config.resolve.modules.push('node_modules');

module.exports = config;
