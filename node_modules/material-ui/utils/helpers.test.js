"use strict";

var _chai = require("chai");

var _helpers = require("./helpers");

describe('utils/helpers.js', function () {
  describe('capitalize', function () {
    it('should work', function () {
      _chai.assert.strictEqual((0, _helpers.capitalize)('foo'), 'Foo');
    });
    it('should throw when not used correctly', function () {
      _chai.assert.throw(function () {
        (0, _helpers.capitalize)();
      }, /expects a string argument/);
    });
  });
  describe('find(arr, pred)', function () {
    it('should search for an item in an array containing the predicate', function () {
      var array = ['woofHelpers', 'meow', {
        foo: 'bar'
      }, {
        woofHelpers: 'meow'
      }];

      _chai.assert.strictEqual((0, _helpers.find)(array, 'lol'), undefined, 'should work for primitives');

      _chai.assert.strictEqual((0, _helpers.find)(array, 'woofHelpers'), array[0], 'should work for primitives');

      _chai.assert.strictEqual((0, _helpers.find)(array, {
        foo: 'bar'
      }), array[2], 'should work for objects');

      _chai.assert.strictEqual((0, _helpers.find)(array, function (n) {
        return n && n.woofHelpers === 'meow';
      }), array[3], 'should work for functions');
    });
  });
  describe('contains(obj, pred)', function () {
    it('should check if an object contains the partial object', function () {
      var obj = {
        woofHelpers: 'meow',
        cat: 'dog'
      };
      var pred = {
        cat: 'dog'
      };
      var failPred = {
        cat: 'meow'
      };

      _chai.assert.strictEqual((0, _helpers.contains)(obj, pred), true);

      _chai.assert.strictEqual((0, _helpers.contains)(obj, failPred), false);
    });
  });
});