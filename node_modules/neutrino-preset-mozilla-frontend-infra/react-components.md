## React Components Quickstart

After installing Neutrino and the this preset, if you want to have automatically
wired source-maps added to your project, add `source-map-support`:

#### Yarn

```bash
❯ yarn add source-map-support
```

#### npm

```bash
❯ npm install --save source-map-support
```

## Project Layout

`@neutrinojs/react-components` follows the standard
[project layout](https://neutrino.js.org/project-layout) specified by Neutrino.
This means that by default all project source code should live in a directory
named `src` in the root of the project. This includes JavaScript files that
would be available to your compiled project.

All components should be their own module within a directory named `components`
inside the source directory.

```bash
❯ mkdir -p src/components
```

Add this preset to your `use` array in `.neutrinorc.js`:

```js
module.exports = {
  use: ['neutrino-preset-mozilla-frontend-infra/react-components'],
};
```

## Building

`@neutrinojs/react-components` builds components that align with our
browser-support matrix to the `build` directory by default when running
`neutrino build`. It also builds a secondary version of the components to the
`es5` for use within ES5 environments such as Create React App.
For example, if you have a component in `components` named `Callback`.

```bash
❯ yarn build

Hash: 0cf7327331a4fb0fd5ec
Version: webpack 3.11.0
Time: 1887ms
           Asset     Size  Chunks             Chunk Names
     Callback.js  1.79 kB       1  [emitted]  Callback
 Callback.js.map  5.26 kB       1  [emitted]  Callback
 
[components-es5] Hash: a46a8cc9a84619fa56fb
[components-es5] Version: webpack 3.11.0
[components-es5] Time: 1056ms
[components-es5]            Asset     Size  Chunks             Chunk Names
[components-es5]      Callback.js   2.8 kB       1  [emitted]  Callback
[components-es5]  Callback.js.map  5.25 kB       1  [emitted]  Callback
```

You can then publish these components to npm. When publishing your project to
npm, consider excluding your `src` directory in `package.json` by using the
`files` property to whitelist `build` and `es5`, or via `.npmignore` to
blacklist `src`. Components are generated as UMD named modules, with the name
corresponding to the component file name. e.g.
`src/components/Callback/index.jsx` maps to `Callback`, as well as
`src/components/Callback.js` mapping to `Callback`.

These modules are ES-compatible modules, so they can be `import`ed as expected.
If you want to use them with CJS `require`, you'll need to use the
`.default` property to access the default exports:

```js
const YourCustomComponent = require('your-custom-component').default;
```

By default this preset creates an individual entry point for every top-level
component found in `src/components`. These are set and accessible via the API at
[`neutrino.options.mains`](https://neutrino.js.org/api#optionsmains).

Remember that two builds are running during this phase: one for browsers within
our support matrix, and another set in the `es5` directory for use in ES5
environments, such as community-used CRA projects. Publish both of these
directories to npm.

## Customizing

To override the build configuration, start with the documentation on
[customization](https://neutrino.js.org/customization).
`@neutrinojs/react-components` uses a few rules and plugins in addition to the
ones in use by the React and Web presets.
See the [Web documentation customization](https://neutrino.js.org/packages/web#customizing)
for preset-specific configuration to override.

### Rules

This preset does not define any additional rules or loaders in addition to those
already used by `@neutrinojs/web`, `@neutrinojs/react`, or
`@neutrinojs/react-components`.

### Plugins

This preset does not define any additional plugins in addition to those already
used by `@neutrinojs/web`, `@neutrinojs/react`, or `@neutrinojs/react-components`.

---

By following the [customization guide](https://neutrino.js.org/customization)
and knowing the rule, loader, and plugin IDs above, you can override and augment
the build by by providing a function to your `.neutrinorc.js` `use` array. You
can also make these changes from the Neutrino API in custom middleware.

_Example: Change the name of the components directory:_

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/react-components', {
      // now you can put your components in src/react-stuff/
      components: 'react-stuff', 
    }]
  ]
}
```

## Styleguide

You can preview your React components in isolation from the React app using the
`styleguide` middleware. Any components within `src/components/**/*.jsx` can be
rendered. Add the styleguide middleware to your `use` array before the
`react-components` preset:

```js
module.exports = {
  use: [
    'neutrino-preset-mozilla-frontend-infra/styleguide',
    'neutrino-preset-mozilla-frontend-infra/react-components',
  ],
};
```

To start the styleguide, use `neutrino styleguide:start`.
To build the styleguide, use `neutrino styleguide:build`. You can alias these to
scripts in package.json to make them more convenient.
