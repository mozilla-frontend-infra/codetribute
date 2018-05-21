module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/react', {
      html: {
        title: 'Mozilla Bugs and Issues'
      }
    }],
    (neutrino) => {
      neutrino.config.module
        .rule('js-yaml')
        .test(/\.(yaml|yml)$/)
        .use('js-yaml-loader')
        .loader('js-yaml-loader');
    }
  ],
};
