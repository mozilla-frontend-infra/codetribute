const images = require('@neutrinojs/image-loader');

module.exports = {
  use: [
    ['@mozilla-frontend-infra/react-lint', {
      parserOptions: {
        ecmaFeatures: {
          legacyDecorators: true
        }
      },
      rules: {
        'react/no-access-state-in-setstate': 'off',
        'babel/no-unused-expressions': 'off',
      }
    }],
    ['@neutrinojs/react', {
      image: {
        limit: 1,
      },
      html: {
        title: 'Codetribute',
        meta: [
          {
            name: 'Description',
            content: 'Find your first code contribution with Mozilla',
          },
        ],
        favicon: './src/static/favicon.png',
      },
      devServer: {
        port: 5000,
        historyApiFallback: { disableDotRule: true },
      },
      env: {
        GITHUB_PERSONAL_API_TOKEN : '',
        BUGZILLA_ENDPOINT : 'http://localhost:3090',
      },
    }],
    (neutrino) => {
      neutrino.config.module
        .rule('js-yaml')
          .test(/\.(yaml|yml)$/)
          .use('js-yaml-loader')
          .options({ safe: true })
            .loader(require.resolve('js-yaml-loader'));
      neutrino.config.module
        .rule('graphql')
          .test(/\.graphql$/)
          .include
            .add(neutrino.options.source)
            .end()
          .use('gql-loader')
            .loader(require.resolve('graphql-tag/loader'));
      neutrino.config.module
        .rule('compile')
          .use('babel')
          .tap(options => ({
            ...options,
            plugins: options.plugins
            // @babel/plugin-proposal-decorators needs to come before @babel/plugin-proposal-class-properties
            .filter(plugin => !plugin[0].includes('plugin-proposal-class-properties'))
            .concat([
              [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
              [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
            ]).filter(Boolean)
          }));
    },

    '@neutrinojs/jest'
  ],
};
