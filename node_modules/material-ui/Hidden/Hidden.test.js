"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Hidden = _interopRequireDefault(require("./Hidden"));

var _HiddenJs = _interopRequireDefault(require("./HiddenJs"));

var _HiddenCss = _interopRequireDefault(require("./HiddenCss"));

var _ref = _react.default.createElement(_Hidden.default, null, "Hello");

var _ref2 = _react.default.createElement(_Hidden.default, {
  implementation: "css"
}, "Hello");

describe('<Hidden />', function () {
  var shallow;
  before(function () {
    shallow = (0, _testUtils.createShallow)();
  });
  describe('prop: implementation', function () {
    it('should use HiddenJs by default', function () {
      var wrapper = shallow(_ref);

      _chai.assert.strictEqual(wrapper.find(_HiddenJs.default).length, 1);
    });
    it('should change the implementation', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.find(_HiddenCss.default).length, 1);
    });
  });
});