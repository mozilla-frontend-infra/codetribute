## React Quickstart

After installing Neutrino and the this preset, add a new directory named `src` in the root of the project, with
a single JS file named `index.jsx` in it.

```bash
❯ mkdir src && touch src/index.jsx
```

This React preset exposes an element in the page with an ID of `root` to which you can mount your application. Edit
your `src/index.jsx` file with the following:

```jsx
import React from 'react';
import { render } from 'react-dom';

render(<h1>Hello world!</h1>, document.getElementById('root'));
```

Now edit your project's package.json to add commands for starting, building, and linting the application:

```json
{
  "scripts": {
    "start": "neutrino start",
    "build": "neutrino build",
    "lint": "neutrino lint"
  }
}
```

Then create a `.neutrinorc.js` file in the root of the project, add this preset to your use array:

```js
module.exports = {
  use: ['neutrino-preset-mozilla-frontend-infra/react']
};
```

Start the app, then open a browser to the address in the console:

#### Yarn

```bash
❯ yarn start

✔ Development server running on: http://localhost:5000
✔ Build completed
```

#### npm

```bash
❯ npm start

✔ Development server running on: http://localhost:5000
✔ Build completed
```

## Building

`neutrino-preset-mozilla-frontend-infra` builds static assets to the `build` directory by default when running
`neutrino build`. Using the quick start example above as a reference:

```bash
❯ yarn build

✔ Building project completed
Hash: b26ff013b5a2d5f7b824
Version: webpack 3.10.1
Time: 9773ms
                           Asset       Size    Chunks             Chunk Names
   index.dfbad882ab3d86bfd747.v1.js     181 kB     index  [emitted]  index
 runtime.3d9f9d2453f192a2b10f.v1.js    1.51 kB   runtime  [emitted]  runtime
                      index.html  846 bytes            [emitted]
✨  Done in 4.62s.
```

You can either serve or deploy the contents of this `build` directory as a static site.

## Static assets

If you wish to copy files to the build directory that are not imported from application code, you can place
them in a directory within `src` called `static`. All files in this directory will be copied from `src/static`
to `build/static`.

## Paths

The `neutrino-preset-web` preset loads assets relative to the path of your application by setting Webpack's
[`output.publicPath`](https://webpack.js.org/configuration/output/#output-publicpath) to `./`. If you wish to load
assets instead from a CDN, or if you wish to change to an absolute path for your application, customize your build to
override `output.publicPath`. See the [Customizing](#Customizing) section below.

## Preset options

You can provide custom options and have them merged with this preset's default options to easily affect how this
preset builds. You can modify the React and ESLint preset settings from `.neutrinorc.js` by overriding with an options
object. Use an array pair instead of a string to supply these options in `.neutrinorc.js`.

The following shows how you can pass an options object to this preset and override its options. See the
[Web documentation](https://neutrino.js.org/presets/neutrino-preset-web#presetoptions) or
[Airbnb ESLint documentation](https://neutrino.js.org/presets/neutrino-preset-airbnb-base#presetoptions)
for specific options you can override with this object. Any options passed will be sent to the underlying
`react` or `node` middleware, except for the `eslint` options, which is sent to the underlying `airbnb` middleware. 

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/react', {
      eslint: {
        rules: {
          semi: 'off'
        }
      },
      // Example: disable Hot Module Replacement
      hot: false,

      // Example: change the page title
      html: {
        title: 'Epic React App'
      }
    }]
  ]
};
```

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization).
`neutrino-preset-mozilla-frontend-infra/react` does not use any additional named rules, loaders, or plugins that aren't already in use by the
Web preset. See the [Web documentation customization](https://neutrino.js.org/presets/neutrino-preset-web#customizing)
for preset-specific configuration to override.

### Overriding configuration

By following the [customization guide](https://neutrino.js.org/customization) and knowing the rule, loader, and plugin IDs from
`neutrino-preset-web`, you can override and augment the build by providing a function to your `.neutrinorc.js` use
array. You can also make these changes from the Neutrino API in custom middleware.

#### Vendoring

By defining an entry point named `vendor` you can split out external dependencies into a chunk separate
from your application code.

_Example: Put React and React DOM into a separate "vendor" chunk:_

```js
module.exports = {
  use: [
    'neutrino-preset-mozilla-frontend-infra/react',
    (neutrino) => {
      neutrino.config
        .entry('vendor')
          .add('react')
          .add('react-dom');
    }
  ]
};
```

## React Hot Module Replacement

While `neutrino-preset-react` supports Hot Module Replacement your app using React Hot Loader, it does require some
application-specific changes in order to operate.

First, install `react-hot-loader` as a dependency, this **must** be React Hot Loader v4+.

#### Yarn

```bash
❯ yarn add react-hot-loader
```

#### npm

```bash
❯ npm install --save react-hot-loader
```

---

Next, wrap your top-level Application component, and any dynamically imported modules, with a call to `hot` from
`react-hot-loader` to enable HMR. That's it! You can use decorator or HOC syntax:

```jsx
# src/index.jsx
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));
```

```jsx
import { hot } from 'react-hot-loader';
import { Component } from 'react';

# Using decorator syntax:

@hot(module)
export default class App extends Component {
  // ...
}

# Using HOC syntax:

class App extends Component {
  // ...
}

export default hot(module)(App);
```

## Styleguide

You can preview your React components in isolation from the React app using the `styleguide` middleware.
Any components within `src/components/**/*.{js,jsx}` can be rendered. Add the
styleguide middleware to your `use` array before the `react` preset:

```js
module.exports = {
  use: [
    'neutrino-preset-mozilla-frontend-infra/styleguide',
    'neutrino-preset-mozilla-frontend-infra/react',
  ],
};
```

To start the styleguide, use `neutrino styleguide:start`; to build the styleguide,
use `neutrino styleguide:build`. You can alias these to scripts in package.json
to make it more convenient.
