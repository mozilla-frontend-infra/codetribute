"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _chai = require("chai");

var _requirePropFactory = _interopRequireDefault(require("./requirePropFactory"));

describe('requirePropFactory', function () {
  var componentNameInError = 'componentNameInError';
  var requireProp;
  before(function () {
    requireProp = (0, _requirePropFactory.default)(componentNameInError);
  });
  it('should have the right shape', function () {
    _chai.assert.strictEqual((0, _typeof2.default)(_requirePropFactory.default), 'function', 'should be a function');

    _chai.assert.strictEqual((0, _typeof2.default)(requireProp), 'function', 'should return a function');
  });
  describe('requireProp()', function () {
    var requiredPropName = 'requiredPropName';
    var requirePropValidator;
    before(function () {
      requirePropValidator = requireProp(requiredPropName);
    });
    it('should return a function', function () {
      _chai.assert.strictEqual((0, _typeof2.default)(requirePropValidator), 'function');
    });
    describe('requirePropValidator', function () {
      var props;
      var propName;
      it('should return null for propName not in props', function () {
        propName = 'propName';
        props = {};
        var result = requirePropValidator(props, propName, undefined, undefined, undefined);

        _chai.assert.strictEqual(result, null);
      });
      it('should return null for propName and requiredProp in props', function () {
        propName = 'propName';
        props = {};
        props[propName] = true;
        props[requiredPropName] = true;
        var result = requirePropValidator(props, propName, undefined, undefined, undefined);

        _chai.assert.strictEqual(result, null);
      });
      describe('propName is in props and requiredProp not in props', function () {
        var result;
        before(function () {
          props = {};
          propName = 'propName';
          props[propName] = true;
          delete props[requiredPropName];
          result = requirePropValidator(props, propName, undefined, undefined, undefined);
        });
        it('should return Error', function () {
          _chai.assert.property(result, 'name', 'result should have name property');

          _chai.assert.property(result, 'name', 'result should have name property');

          _chai.assert.strictEqual(result.name, 'Error');

          _chai.assert.property(result, 'message', 'result should have message property');

          _chai.assert.strictEqual(result.message.indexOf(propName) > -1, true, 'returned error message should have propName');

          _chai.assert.strictEqual(result.message.indexOf(requiredPropName) > -1, true, 'returned error message should have requiredPropName');

          _chai.assert.strictEqual(result.message.indexOf(componentNameInError) > -1, true, 'returned error message should have componentNameInError');
        });
        describe('propFullName given to validator', function () {
          var propFullName;
          before(function () {
            propFullName = 'propFullName';
            result = requirePropValidator(props, propName, undefined, undefined, propFullName);
          });
          it('returned error message should have propFullName', function () {
            _chai.assert.strictEqual(result.message.indexOf(propFullName) > -1, true);
          });
          it('returned error message should not have propName', function () {
            _chai.assert.strictEqual(result.message.indexOf(propName), -1);
          });
        });
      });
    });
  });
});