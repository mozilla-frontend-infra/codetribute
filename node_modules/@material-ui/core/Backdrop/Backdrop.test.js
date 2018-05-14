"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

var _ref = _react.default.createElement(_Backdrop.default, {
  open: true
});

var _ref2 = _react.default.createElement(_Backdrop.default, {
  open: true,
  className: "woofBackdrop"
});

describe('<Backdrop />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a backdrop div', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass('woofBackdrop'), true);

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.root), true);
  });
});