module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/react', {
      html: {
        title: 'Mozilla Bugs and Issues'
      }
    }],
    ['@neutrinojs/env', ['GITHUB_PERSONAL_ACCESS_TOKEN']],
    (neutrino) => {
    neutrino.config.output.publicPath('/');
    neutrino.config.module
      .rule('js-yaml')
      .test(/\.(yaml|yml)$/)
      .use('js-yaml-loader')
      .loader('js-yaml-loader');
    neutrino.config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .include
      .add(neutrino.options.source)
      .end()
      .use('gql-loader')
      .loader(require.resolve('graphql-tag/loader'));
  }
  ],
};
