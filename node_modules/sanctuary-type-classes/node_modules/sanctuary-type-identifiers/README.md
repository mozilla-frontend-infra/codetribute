# sanctuary-type-identifiers

A type is a set of values. Boolean, for example, is the type comprising
`true` and `false`. A value may be a member of multiple types (`42` is a
member of Number, PositiveNumber, Integer, and many other types).

In certain situations it is useful to divide JavaScript values into
non-overlapping types. The language provides two constructs for this
purpose: the [`typeof`][1] operator and [`Object.prototype.toString`][2].
Each has pros and cons, but neither supports user-defined types.

This package specifies an [algorithm][3] for deriving a _type identifier_
from any JavaScript value, and exports an implementation of the algorithm.
Authors of algebraic data types may follow this specification in order to
make their data types compatible with the algorithm.

### Algorithm

1.  Take any JavaScript value `x`.

2.  If `x` is `null` or `undefined`, go to step 6.

3.  If `x.constructor` evaluates to `null` or `undefined`, go to step 6.

4.  If `x.constructor.prototype === x`, go to step 6. This check prevents a
    prototype object from being considered a member of its associated type.

5.  If `typeof x.constructor['@@type']` evaluates to `'string'`, return
    the value of `x.constructor['@@type']`.

6.  Return the [`Object.prototype.toString`][2] representation of `x`
    without the leading `'[object '` and trailing `']'`.

### Compatibility

For an algebraic data type to be compatible with the [algorithm][3]:

  - every member of the type must have a `constructor` property pointing
    to an object known as the _type representative_;

  - the type representative must have a `@@type` property; and

  - the type representative's `@@type` property (the _type identifier_)
    must be a string primitive, ideally `'<npm-package-name>/<type-name>'`.

For example:

```javascript
//  Identity :: a -> Identity a
function Identity(x) {
  if (!(this instanceof Identity)) return new Identity(x);
  this.value = x;
}

Identity['@@type'] = 'my-package/Identity';
```

Note that by using a constructor function the `constructor` property is set
implicitly for each value created. Constructor functions are convenient for
this reason, but are not required. This definition is also valid:

```javascript
//  IdentityTypeRep :: TypeRep Identity
var IdentityTypeRep = {
  '@@type': 'my-package/Identity'
};

//  Identity :: a -> Identity a
function Identity(x) {
  return {constructor: IdentityTypeRep, value: x};
}
```

### Usage

```javascript
var Identity = require('my-package').Identity;
var type = require('sanctuary-type-identifiers');

type(null);         // => 'Null'
type(true);         // => 'Boolean'
type([1, 2, 3]);    // => 'Array'
type(Identity);     // => 'Function'
type(Identity(0));  // => 'my-package/Identity'
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
[3]: #algorithm
