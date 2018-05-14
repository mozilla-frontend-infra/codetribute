"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _chai = require("chai");

var MaterialUI = _interopRequireWildcard(require("./index"));

//  weak

/* eslint import/namespace: ['error', { allowComputed: true }] */

/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
describe('material-ui', function () {
  it('should have exports', function () {
    _chai.assert.strictEqual((0, _typeof2.default)(MaterialUI), 'object');
  });
  it('should not do undefined exports', function () {
    (0, _keys.default)(MaterialUI).forEach(function (exportKey) {
      return _chai.assert.strictEqual(Boolean(MaterialUI[exportKey]), true);
    });
  });
});