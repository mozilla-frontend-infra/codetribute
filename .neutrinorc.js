const fs = require('fs-extra');
const { join } = require('path');

module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/react', {
      html: {
        title: 'Codetribute',
        meta: [
          {
            name: 'Description',
            content: 'Find your first code contribution with Mozilla',
          }
        ],
        links: [
          {
            href: './static/favicon.png',
            rel: 'shortcut icon',
          },
        ]
      },
    }],
    ['@neutrinojs/env', ['GITHUB_PERSONAL_API_TOKEN', 'BUGZILLA_ENDPOINT', 'NODE_ENV']],
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
      neutrino.on('build', () => {
        ['contribute.json'].forEach(file => {
          fs.copyFileSync(file, join(__dirname, `build/${file}`));
        })
      });
    },
    '@neutrinojs/jest'
  ],
};
