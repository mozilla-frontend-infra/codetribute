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
      publicPath: '/',
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
        port: process.env.PORT,
        historyApiFallback: { disableDotRule: true },
      },
      env: {
        'GITHUB_PERSONAL_API_TOKEN' : '',
        'BUGZILLA_ENDPOINT' : 'http://localhost:3090',
        'NODE_ENV' : 'development',
        'PORT': 5000,
      },
      babel: {
        plugins: [
          [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
          require.resolve('@babel/plugin-proposal-class-properties'),
        ],
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
      neutrino.use(images, { limit: 1 });
      // Data URIs are not allowed by the CSP
      // ['ico', 'svg', 'img']
      //   .forEach(rule => neutrino.config.module.rule(rule)
      //     .use(images)
      //     // .tap(options => ({ ...options, limit: 1 })))
      //       .loader(require.resolve('@neutrinojs/image-loader'));
      // neutrino.on('build', () => {
      //   ['contribute.json'].forEach(file => {
      //     fs.copyFileSync(file, join(__dirname, `build/${file}`));
      //   })
      // });
    },
    '@neutrinojs/jest'
  ],
};
