## Node.js Quickstart

After installing Neutrino and the this preset, if you want to have automatically
wired sourcemaps added to your project, add `source-map-support`:

#### Yarn

```bash
❯ yarn add source-map-support
```

#### npm

```bash
❯ npm install --save source-map-support
```

Add a new directory named `src` in the root of the project, with
a single JS file named `index.js` in it.

```bash
❯ mkdir src && touch src/index.js
```

Edit your `src/index.js` file with the following example:

```js
import { createServer } from 'http';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const port = process.env.PORT || 3000;

createServer(async (req, res) => {
  await delay(500);
  console.log('Request!');
  res.end('hi!');
})
.listen(port, () => console.log(`Server running on port ${port}`));
```

Now edit your project's package.json to add commands for starting and building the application.

```json
{
  "scripts": {
    "start": "neutrino start",
    "build": "neutrino build"
  }
}
```

In your `.neutrinorc.js` file, add this preset to your use array:

```js
module.exports = {
  use: ['neutrino-preset-mozilla-frontend-infra/node'],
};
```

Start the app, then either open a browser to http://localhost:3000 or use curl from another terminal window:

#### Yarn

```bash
❯ yarn start

Server running on port 3000
```

```bash
❯ curl http://localhost:3000

hi!
```

#### npm

```bash
❯ npm start

Server running on port 3000
```

```bash
❯ curl http://localhost:3000

hi!
```

## Building

This preset builds assets to the `build` directory by default when running `neutrino build`. Using the
quick start example above as a reference:

```bash
❯ yarn build

Hash: 89e4fb250fc535920ba4
Version: webpack 3.10.1
Time: 424ms
       Asset     Size  Chunks             Chunk Names
    index.js  4.29 kB       0  [emitted]  index
index.js.map  3.73 kB       0  [emitted]  index
✨  Done in 1.51s.
```

You can either serve or deploy the contents of this `build` directory as a Node.js module, server, or tool. For Node.js
this usually means adding a `main` property to package.json pointing to the primary main built entry point. Also when
publishing your project to npm, consider excluding your `src` directory by using the `files` property to whitelist
`build`, or via `.npmignore` to blacklist `src`.

```json
{
  "main": "build/index.js",
  "files": [
    "build"
  ]
}
```

_Note: While this preset works well for many types of Node.js applications, it's important to make the distinction
between applications and libraries. This preset will not work optimally out of the box for creating distributable
libraries, and will take a little extra customization to make them suitable for that purpose. You can also use
`@neutrinojs/library` to create libraries._

## Hot Module Replacement

While this preset supports Hot Module Replacement for your app, it does require some application-specific
changes in order to operate. Your application should define split points for which to accept modules to reload using
`module.hot`:

For example:

```js
import { createServer } from 'http';
import app from './app';

if (module.hot) {
  module.hot.accept('./app');
}

createServer((req, res) => {
  res.end(app('example'));  
}).listen(/* */);
```

Or for all paths:

```js
import { createServer } from 'http';
import app from './app';

if (module.hot) {
  module.hot.accept();
}

createServer((req, res) => {
  res.end(app('example'));  
}).listen(/* */);
```

Using dynamic imports with `import()` will automatically create split points and hot replace those modules upon
modification during development.

## Debugging

You can start the Node.js server in `inspect` mode to debug the process by setting `neutrino.options.debug` to `true`.
This can be done from the [API](https://neutrino.js.org/api#optionsdebug) or the [CLI using `--debug`](https://neutrino.js.org/cli#-debug).

## Preset options

You can provide custom options and have them merged with this preset's default options to easily affect how this
preset builds. You can modify Node.js preset settings from `.neutrinorc.js` by overriding with an options object. Use
an array pair instead of a string to supply these options in `.neutrinorc.js`.

The following shows how you can pass an options object to the Node.js preset and override its options, showing the
defaults:

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/node', {
      // Enables Hot Module Replacement. Set to false to disable
      hot: true,

      polyfills: {
        // Enables fast-async polyfill. Set to false to disable
        async: true
      },

      // Target specific versions via babel-preset-env
      targets: {
        node: '6.10'
      },

      // Remove the contents of the output directory prior to building.
      // Set to false to disable cleaning this directory
      clean: {
        paths: [neutrino.options.output]
      },

      // Add additional Babel plugins, presets, or env options
      babel: {
        // Override options for babel-preset-env, showing defaults:
        presets: [
          ['babel-preset-env', {
            targets: { node: '6.10' },
            modules: false,
            useBuiltIns: true,
            // These are excluded when using polyfills.async. Disabling the async polyfill
            // will remove these from the exclusion list
            exclude: ['transform-regenerator', 'transform-async-to-generator']
          }]
        ]
      }
    }]
  ]
};
```

_Example: Override the Node.js Babel compilation target to Node.js v8:_

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/node', {
      // Add additional Babel plugins, presets, or env options
      babel: {
        // Override options for babel-preset-env
        presets: [
          ['babel-preset-env', {
            // Passing in targets to babel-preset-env will replace them
            // instead of merging them
            targets: {
              node: '8.0'
            }
          }]
        ]
      }
    }]
  ]
};
```

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization).
`neutrino-preset-mozilla-frontend-infra/node` does not use any additional named rules, loaders, or plugins that aren't already in use by the
Node.js preset. See the [Node.js documentation customization](https://neutrino.js.org/packages/node#customizing)
for preset-specific configuration to override.

### Overriding configuration

By following the [customization guide](https://neutrino.js.org/customization) and knowing the rule, loader, and plugin IDs from
`@neutrinojs/node`, you can override and augment the build by providing a function to your `.neutrinorc.js` use
array. You can also make these changes from the Neutrino API in custom middleware.

### Vendoring

This preset automatically vendors all external dependencies into a separate chunk based on their inclusion in your
package.json. No extra work is required to make this work.
