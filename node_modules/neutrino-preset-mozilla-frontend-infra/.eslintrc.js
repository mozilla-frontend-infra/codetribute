const { Neutrino } = require('neutrino');

module.exports = Neutrino({ root: __dirname, source: __dirname })
  .use('.neutrinorc')
  .call('eslintrc');
