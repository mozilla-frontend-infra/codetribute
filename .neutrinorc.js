const images = require('@neutrinojs/image-loader');

module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        parserOptions: {
          ecmaFeatures: {
            legacyDecorators: true
          }
        },
        emitWarning: process.env.NODE_ENV === 'development',
        baseConfig: {
          extends: ['eslint-config-prettier', 'plugin:react/recommended'],
        },
        envs: ['worker', 'serviceworker'],
        plugins: ['prettier'],
        rules: {
          'react/jsx-wrap-multilines': 'off',
          'react/prop-types': 'off',
          'react/jsx-one-expression-per-line': 'off',
          'react/forbid-prop-types': 'off',
          'react/prefer-stateless-function': 'off',
          'react/no-access-state-in-setstate': 'off',
          'react/destructuring-assignment': 'off',
          'babel/no-unused-expressions': 'off',
          'import/no-extraneous-dependencies': 'off',
          // Specify the maximum length of a line in your program
          'max-len': [
            'error',
            80,
            2,
            {
              ignoreUrls: true,
              ignoreComments: false,
              ignoreStrings: true,
              ignoreTemplateLiterals: true,
            },
          ],
          // Allow using class methods with static/non-instance functionality
          // React lifecycle methods commonly do not use an instance context for
          // anything
          'class-methods-use-this': 'off',
          // Allow console during development, otherwise throw an error
          'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
          'prettier/prettier': [
            'error',
            {
              singleQuote: true,
              trailingComma: 'es5',
              bracketSpacing: true,
              jsxBracketSameLine: false,
            },
          ],
          'consistent-return': 'off',
          'no-shadow': 'off',
          'no-return-assign': 'off',
          'babel/new-cap': 'off',
          'no-mixed-operators': 'off',
          "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
          }]
        }
      },
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
