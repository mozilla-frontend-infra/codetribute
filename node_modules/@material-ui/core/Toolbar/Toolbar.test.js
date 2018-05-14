"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _ref = _react.default.createElement(_Toolbar.default, null, "foo");

var _ref2 = _react.default.createElement(_Toolbar.default, null, "foo");

var _ref3 = _react.default.createElement(_Toolbar.default, {
  className: "woofToolbar"
}, "foo");

var _ref4 = _react.default.createElement(_Toolbar.default, {
  disableGutters: true
}, "foo");

describe('<Toolbar />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the user, root and gutters classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass('woofToolbar'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.gutters), true);
  });
  it('should disable the gutters', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.gutters), false, 'should not have the gutters class');
  });
});