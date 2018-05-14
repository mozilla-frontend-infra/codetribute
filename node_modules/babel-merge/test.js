const merge = require('./');

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
);

console.log(JSON.stringify(together, null, 2));
