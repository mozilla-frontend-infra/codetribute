const airbnb = require('@neutrinojs/airbnb-base');
const loaderMerge = require('@neutrinojs/loader-merge');
const lint = require('./lint');

module.exports = (neutrino, options = {}) => {
  neutrino.use(lint, {
    use: [airbnb],
  });

  neutrino.use(loaderMerge('lint', 'eslint'), options);
};
