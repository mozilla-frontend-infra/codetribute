# inspect-f

[![NPM Version](https://badge.fury.io/js/inspect-f.svg)](https://www.npmjs.com/package/inspect-f)
[![Dependencies](https://david-dm.org/fluture-js/inspect-f.svg)](https://david-dm.org/fluture-js/inspect-f)
[![Build Status](https://travis-ci.org/fluture-js/inspect-f.svg?branch=master)](https://travis-ci.org/fluture-js/inspect-f)
[![Code Coverage](https://codecov.io/gh/fluture-js/inspect-f/branch/master/graph/badge.svg)](https://codecov.io/gh/fluture-js/inspect-f)


Cast a function to string and adjust its indentation. Intended for rendering
function bodies in `pre`-tags or consoles and what have you.

> `npm install --save inspect-f`


## Usage

Let's say we have this deeply indented function which uses a 6-space indentation scheme:

```js
          function someDeeplyIndentedFunction(a, b){
                return (
                      a + b
                );
          }
```

Then the following:

```js
const inspectf = require('inspect-f');
console.log(inspectf(2, someDeeplyIndentedFunction));
```

Would output:

```js
function someDeeplyIndentedFunction(a, b){
  return (
    a + b
  );
}
```
