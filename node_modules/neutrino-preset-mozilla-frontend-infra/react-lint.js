const airbnb = require('@neutrinojs/airbnb');
const loaderMerge = require('@neutrinojs/loader-merge');
const {
  rules: airbnbBaseRules,
} = require('eslint-config-airbnb-base/rules/variables');
const lint = require('./lint');

module.exports = (neutrino, options = {}) => {
  neutrino.use(lint, {
    use: [
      airbnb,
      {
        baseConfig: {
          extends: ['plugin:react/recommended'],
        },
        envs: ['worker', 'serviceworker'],
        rules: {
          // The worker/serviceworker envs above don't properly respect
          // the `self` global with the Airbnb preset rules
          // https://github.com/airbnb/javascript/issues/1632
          'no-restricted-globals': airbnbBaseRules[
            'no-restricted-globals'
          ].filter(global => global !== 'self'),
          // Prefer double or quotes in JSX attributes
          // http://eslint.org/docs/rules/jsx-quotes
          'jsx-quotes': ['error', 'prefer-double'],
          // Enable anchors with react-router Link
          'jsx-a11y/anchor-is-valid': [
            'error',
            {
              components: ['Link'],
              specialLink: ['to'],
            },
          ],
          'jsx-a11y/click-events-have-key-events': 'off',
          'jsx-a11y/no-static-element-interactions': 'off',
          // Disallow spaces for JSX attribute braces interior
          // JSX braces are interpolation, not objects
          'react/jsx-curly-spacing': ['error', 'never'],
          // Disallow spaces around JSX attribute assignment equals
          // (idiomatic HTML)
          'react/jsx-equals-spacing': ['error', 'never'],
          // Require JSX props to be on new lines when a component is multiline
          // improves readability
          'react/jsx-first-prop-new-line': ['error', 'multiline'],
          // Ensure JSX props are indented 2 spaces from opening tag
          'react/jsx-indent-props': ['error', 2],
          // Validate JSX has key prop when in array or iterator
          'react/jsx-key': 'error',
          // Prevent comments from being inserted as text nodes
          'react/jsx-no-comment-textnodes': 'error',
          // Prevent usage of unsafe target="_blank"
          // ensure anchors also have rel="noreferrer noopener"
          'react/jsx-no-target-blank': 'error',
          // Ensure JSX components are PascalCase
          'react/jsx-pascal-case': 'error',
          // Require space before self-closing bracket in JSX
          'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
          // Ensure multiline JSX is wrapped in parentheses (idiomatic React)
          // Must be coupled with no-extra-parens: off
          'react/jsx-wrap-multilines': 'error',
          // Disable enforcement of React PropTypes
          'react/default-props-match-prop-types': 'off',
          'react/jsx-closing-bracket-location': 'off',
          'react/jsx-handler-names': [
            'error',
            {
              eventHandlerPrefix: 'handle',
              eventHandlerPropPrefix: 'on',
            },
          ],
          'react/jsx-indent': 'off',
          'react/prefer-stateless-function': 'off',
          'react/prop-types': 'off',
          'react/sort-comp': 'off',
          // Too strict for now:
          'react/forbid-prop-types': 'off',
          // Can produce false-positives:
          'react/no-unused-prop-types': 'off',
          // Doesn't always help with a lot of PureComponents:
          'react/require-default-props': 'off',
        },
      },
    ],
  });

  neutrino.use(loaderMerge('lint', 'eslint'), options);
};
