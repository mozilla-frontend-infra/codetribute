"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _KeyboardArrowLeft = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));

var _testUtils = require("../test-utils");

var _TabScrollButton = _interopRequireDefault(require("./TabScrollButton"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

describe('<TabScrollButton />', function () {
  var props = {
    direction: 'left'
  };
  var shallow;
  var mount;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_TabScrollButton.default, props));
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  describe('prop: visible', function () {
    it('should render as a button with the root class', function () {
      var wrapper = shallow(_react.default.createElement(_TabScrollButton.default, (0, _extends2.default)({}, props, {
        visible: true
      })));

      _chai.assert.strictEqual(wrapper.is(_ButtonBase.default), true, 'should be a button');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: !visible', function () {
    it('should render as a div with root class', function () {
      var wrapper = shallow(_react.default.createElement(_TabScrollButton.default, (0, _extends2.default)({}, props, {
        visible: false
      })));

      _chai.assert.strictEqual(wrapper.name(), 'div');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: className', function () {
    it('should render with the user and root classes', function () {
      var wrapper = shallow(_react.default.createElement(_TabScrollButton.default, (0, _extends2.default)({}, props, {
        className: "woofTabScrollButton"
      })));

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      _chai.assert.strictEqual(wrapper.hasClass('woofTabScrollButton'), true);
    });
  });
  describe('prop: direction', function () {
    it('should render with the left icon', function () {
      var wrapper = mount(_react.default.createElement(_TabScrollButton.default, (0, _extends2.default)({}, props, {
        direction: "left",
        visible: true
      })));

      _chai.assert.strictEqual(wrapper.find(_KeyboardArrowLeft.default).length, 1, 'should be the left icon');
    });
    it('should render with the right icon', function () {
      var wrapper = mount(_react.default.createElement(_TabScrollButton.default, (0, _extends2.default)({}, props, {
        direction: "right",
        visible: true
      })));

      _chai.assert.strictEqual(wrapper.find(_KeyboardArrowRight.default).length, 1, 'should be the right icon');
    });
  });
});