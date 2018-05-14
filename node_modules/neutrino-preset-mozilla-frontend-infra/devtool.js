module.exports = neutrino => {
  neutrino.config
    .when(process.env.NODE_ENV === 'development', config => {
      config.devtool('cheap-module-source-map');
    })
    .when(process.env.NODE_ENV === 'production', config => {
      config.when(
        process.env.CI === 'true' && process.env.TRAVIS_BRANCH !== 'master',
        config => config.devtool(false),
        config => config.devtool('source-map')
      );
    });
};
