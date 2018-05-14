"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Divider = _interopRequireDefault(require("./Divider"));

var _ref = _react.default.createElement(_Divider.default, null);

var _ref2 = _react.default.createElement(_Divider.default, null);

var _ref3 = _react.default.createElement(_Divider.default, null);

var _ref4 = _react.default.createElement(_Divider.default, {
  absolute: true
});

var _ref5 = _react.default.createElement(_Divider.default, {
  inset: true
});

var _ref6 = _react.default.createElement(_Divider.default, {
  light: true
});

describe('<Divider />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a hr', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'hr');
  });
  it('should render with the root and default class', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should set the absolute class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.absolute), true, 'should be absolute');
  });
  it('should set the inset class', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have inset class');
  });
  it('should set the light class', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.light), true, 'should have light class');
  });
});