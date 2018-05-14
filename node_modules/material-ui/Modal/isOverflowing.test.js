"use strict";

var _chai = require("chai");

var _isOverflowing = require("./isOverflowing");

describe('isOverflowing', function () {
  describe('isBody', function () {
    it('work as expected', function () {
      _chai.assert.strictEqual((0, _isOverflowing.isBody)(document.body), true);

      _chai.assert.strictEqual((0, _isOverflowing.isBody)(document.createElement('div')), false);
    });
  });
});