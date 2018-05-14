"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _chai = require("chai");

var _exactProp = _interopRequireWildcard(require("./exactProp"));

describe('exactProp()', function () {
  var componentNameInError = 'componentNameInError';
  var exactPropTypes;
  before(function () {
    exactPropTypes = (0, _exactProp.default)({
      bar: {}
    }, componentNameInError);
  });
  it('should have the right shape', function () {
    _chai.assert.strictEqual((0, _typeof2.default)(_exactProp.default), 'function', 'should be a function');

    _chai.assert.strictEqual((0, _typeof2.default)(exactPropTypes), 'object', 'should be a function');
  });
  describe('exactPropTypes', function () {
    var props;
    it('should return null for supported properties', function () {
      props = {
        bar: false
      };

      var result = exactPropTypes[_exactProp.specialProperty](props);

      _chai.assert.strictEqual(result, null);
    });
    it('should return an error for unknown properties', function () {
      props = {
        foo: true
      };

      var result = exactPropTypes[_exactProp.specialProperty](props);

      _chai.assert.match(result.message, /componentNameInError: unknown props found: foo/);
    });
  });
});