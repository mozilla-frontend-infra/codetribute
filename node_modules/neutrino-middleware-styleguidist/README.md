# Neutrino Styleguidist Middleware

`neutrino-middleware-styleguidist` is a Neutrino middleware that supports previewing components using
[React Styleguidist](https://react-styleguidist.js.org/). Plays _mostly_ nicely with
other Neutrino middleware, so you can preview and build styleguides from components in an app or standalone
component repo.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Join the Neutrino community on Spectrum][spectrum-image]][spectrum-url]

## Features

- Zero upfront configuration necessary to start a styleguidist app.
- Integrates with existing Neutrino middleware and presets.

## Requirements

- Node.js v6 LTS, v8, v9
- Yarn v1.2.1+, or npm v5.4+
- Neutrino v8

## Installation

`neutrino-middleware-styleguidist` can be installed via the Yarn or npm clients. Inside your project, make sure
`neutrino` and `neutrino-middleware-styleguidist` are development dependencies. You will also need middleware
or a preset for building your components separately from this middleware. For example, if you are building a
React app, you may be using `@neutrinojs/react`, or you may be using `@neutrinojs/react-components` to build
standalone React components. You can use `neutrino-middleware-styleguidist` to build a styleguide for either.

In the example below, we are using the `@neutrinojs/react-components` preset along with this.
Follow the instructions for your particular middleware or preset prior for installation details.

#### Yarn

```bash
❯ yarn add --dev neutrino-middleware-styleguidist
```

#### npm

```bash
❯ npm install --save-dev neutrino-middleware-styleguidist
```

It is recommended to add some scripts to your package.json to make starting and building the styleguide
easier:

```json
{
  "scripts": {
    "styleguide:start": "neutrino styleguide:start",
    "styleguide:build": "neutrino styleguide:build"
  }
}
```

## Project Layout

`neutrino-middleware-styleguidist` follows the standard [project layout](https://neutrino.js.org/project-layout)
specified by Neutrino. This means that by default all project source code should live in a directory named `src` in the
root of the project. This includes JavaScript files that would be available to your compiled project.

**All components should be their own module within a directory named `components` inside the source directory.**

In your `.neutrinorc.js` file, add this preset to your `use` array, but **put it before your other building presets**:

```js
module.exports = {
  use: [
    // PUT THE STYLEGUIDIST MIDDLEWARE BEFORE
    // YOUR OTHER BUILD PRESETS!
    'neutrino-middleware-styleguidist',
    '@neutrinojs/react-components'
  ]
};
```

## Commands

`neutrino-middleware-styleguidist` exposes two Neutrino commands for starting and building a styleguide.

### Starting the local styleguide server

#### Yarn

```bash
❯ yarn styleguide:start

✔ Styleguidist server running at 0.0.0.0:6060
```

#### npm

```bash
❯ npm run styleguide:start

✔ Styleguidist server running at 0.0.0.0:6060
```

## Building

`neutrino-middleware-styleguidist` builds components to the `styleguide` directory by default when running
`neutrino styleguide:build`. Using the example above as a reference:

```bash
❯ yarn styleguide:build

✔ Style guide published to /project/styleguide
✔ Running styleguide:build completed
```

You can then host this styleguide on GitHub pages or other static site hosting platform.

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization).
`neutrino-middleware-styleguidist` allows you to pass options for customizing the operation of
`react-styleguidist`. Pass an array-pair instead of a string to customize the options for this middleware.

_Example: Show props usage in the guide, and skip displaying components with no docs:_

```js
module.exports = {
  use: [
    ['neutrino-middleware-styleguidist', {
      showUsage: true,
      skipComponentsWithoutExample: true,
    }]
  ]
}
```

[Any options that are acceptable by React Styleguidist](https://react-styleguidist.js.org/docs/configuration.html)
can be passed to this middleware, except `webpackConfig`.

## Important Note!

**This middleware works mostly well, except React Styleguidist has trouble when the ExtractTextWebpackPlugin
is being used. If you have this plugin, for example with Neutrino's Web-based plugins, you'll want to disable
extraction when running the styleguide commands in your `.neutrinorc.js`:**

```js
const buildingStyleguide = process.argv[2].includes('styleguide');

module.exports = {
  use: [
    'neutrino-middleware-styleguidist',
    ['@neutrinojs/react', {
      style: {
        extract: buildingStyleguide ? false : {}
      }
    }]
  ]
};
```

[npm-image]: https://img.shields.io/npm/v/neutrino-middleware-styleguidist.svg
[npm-downloads]: https://img.shields.io/npm/dt/neutrino-middleware-styleguidist.svg
[npm-url]: https://npmjs.org/package/neutrino-middleware-styleguidist
[spectrum-image]: https://withspectrum.github.io/badge/badge.svg
[spectrum-url]: https://spectrum.chat/neutrino
