const webpack = require('webpack');

module.exports = {
  externals: [
    'react-docgen',
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    library: 'AnnotationResolver',
    libraryTarget: 'umd',
  },
};
