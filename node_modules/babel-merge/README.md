# babel-merge
[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads]][npm-url]

`babel-merge` takes two Babel configuration objects and merges them into a single copy.
Plugin and preset objects and arrays will be merged together.

## Requirements

- Node.js v6.10+
- Yarn or npm client

## Installation

`babel-merge` can be installed via the Yarn or npm clients.

#### Yarn

```bash
❯ yarn add babel-merge
```

#### npm

```bash
❯ npm install --save babel-merge
```

## Usage

```js
const merge = require('babel-merge');

const together = merge(
  {
    presets: [
      ['babel-preset-env', {
        targets: {
          browsers: ['latest 1 Chrome']
        }
      }]
    ]
  },
  {
    presets: [
      ['babel-preset-env', {
        targets: {
          browsers: ['latest 1 Firefox']
        }
      }]
    ]
  }
)

console.log(together);

{
  presets: [
    ['babel-preset-env', {
      targets: {
        browsers: [
          'latest 1 Chrome',
          'latest 1 Firefox'
        ]
      }
    }]
  ]
}
```

If a pathname was used in an earlier merge, you can still merge by exact name:

```js
const merge = require('babel-merge');

const together = merge(
  {
    presets: [
      [require.resolve('babel-preset-env'), {
        targets: {
          browsers: ['latest 1 Chrome']
        }
      }]
    ]
  },
  {
    presets: [
      ['babel-preset-env', {
        targets: {
          browsers: ['latest 1 Firefox']
        }
      }]
    ]
  }
)

console.log(together);

{
  presets: [
    ['/Users/me/code/app/node_modules/babel-preset-env/lib/index.js', {
      targets: {
        browsers: [
          'latest 1 Chrome',
          'latest 1 Firefox'
        ]
      }
    }]
  ]
}
```

Even works for plugins and presets within environments:

```js
const merge = require('babel-merge');

const together = merge(
  {
    env: {
      development: {
        presets: [
          [require.resolve('babel-preset-env'), {
            targets: {
              browsers: ['latest 1 Chrome']
            }
          }]
        ]
      }
    }
  },
  {
    env: {
      development: {
        presets: [
          ['babel-preset-env', {
            targets: {
              browsers: ['latest 1 Firefox']
            }
          }]
        ]
      }
    }
  }
)

console.log(together);

{
  env: {
    development: {
      presets: [
        ['/Users/me/code/app/node_modules/babel-preset-env/lib/index.js', {
          targets: {
            browsers: [
              'latest 1 Chrome',
              'latest 1 Firefox'
            ]
          }
        }]
      ]
    }
  }
}
```

Order is preserved between non-option plugins and presets and ones with options:

```js
const merge = require('babel-merge');

const together = merge(
  {
    plugins: [
      'fast-async',
      'babel-plugin-syntax-dynamic-import'
    ]
  },
  {
    plugins: [
      'babel-plugin-transform-object-rest-spread',
      ['fast-async', { spec: true }],
      'babel-plugin-transform-class-properties'
    ]
  }
)

console.log(together);

{
  plugins: [
    ['fast-async', { 'spec': true }],
    'babel-plugin-syntax-dynamic-import',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-transform-class-properties'
  ]
}
```

[npm-image]: https://img.shields.io/npm/v/babel-merge.svg
[npm-downloads]: https://img.shields.io/npm/dt/babel-merge.svg
[npm-url]: https://npmjs.org/package/babel-merge
