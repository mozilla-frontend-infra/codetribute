# js-yaml-loader for Webpack

[JS-YAML](https://github.com/nodeca/js-yaml) loader for webpack.

## Installation

`yarn add js-yaml-loader`

## Usage

[Webpack documentation](https://webpack.js.org/concepts/loaders/#using-loaders)

``` javascript
import doc from 'js-yaml-loader!./file.yml';
// => returns a javascript object. see https://github.com/nodeca/js-yaml
```

``` javascript
// webpack.config.js
module: {
  rules: [{
    test: /\.yaml$/,
    use: 'js-yaml-loader',
  }]
}
```

### Difference from [yaml-loader](https://github.com/okonet/yaml-loader)

[yaml-loader](https://github.com/okonet/yaml-loader) loads YAML files
as _JSON_ and is commonly used in conjuction with
[json-loader](https://github.com/webpack-contrib/json-loader).

In contrast, this loader loads YAML files as JavaScript objects using
node's `util.inspect` function. This allows YAML value types otherwise
disallowed in JSON such as `Infinity`, `RegExp`, `Function`, etc.
[See js-yaml's supported YAML types](https://github.com/nodeca/js-yaml#supported-yaml-types)

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
