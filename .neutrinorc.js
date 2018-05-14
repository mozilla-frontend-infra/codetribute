module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'bugsahoy'
        }
      }
    ],
    (neutrino) => {
    neutrino.config.module
      .rule('js-yaml')
      .test(/\.yaml$/)
      .use('js-yaml-loader')
      .loader('js-yaml-loader');
  }
  ],

};
