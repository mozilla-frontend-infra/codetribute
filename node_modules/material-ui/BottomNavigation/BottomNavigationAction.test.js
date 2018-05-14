"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Icon = _interopRequireDefault(require("../Icon"));

var _BottomNavigationAction = _interopRequireDefault(require("./BottomNavigationAction"));

var _ref = _react.default.createElement(_Icon.default, null, "restore");

var _ref2 = _react.default.createElement(_BottomNavigationAction.default, null);

var _ref11 = _react.default.createElement(_BottomNavigationAction.default, null);

describe('<BottomNavigationAction />', function () {
  var shallow;
  var classes;
  var icon = _ref;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref2);
  });

  var _ref3 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  });

  it('should render a ButtonBase', function () {
    shallow(_ref3);
  });

  var _ref4 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  });

  it('should render with the root class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref5 = _react.default.createElement(_BottomNavigationAction.default, {
    className: "woofBottomNavigationAction",
    icon: icon
  });

  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass('woofBottomNavigationAction'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref6 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon,
    selected: true
  });

  it('should render with the selected and root classes', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref7 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon,
    showLabel: false
  });

  it('should render with the selectedIconOnly and root classes', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.hasClass(classes.iconOnly), true, 'should have the iconOnly class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref8 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  });

  it('should render icon', function () {
    var wrapper = shallow(_ref8);

    _chai.assert.strictEqual(wrapper.contains(icon), true, 'should have the icon');
  });

  var _ref9 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon,
    selected: true
  });

  it('should render label with the selected class', function () {
    var wrapper = shallow(_ref9);
    var labelWrapper = wrapper.childAt(0).childAt(1);

    _chai.assert.strictEqual(labelWrapper.hasClass(classes.selected), true);

    _chai.assert.strictEqual(labelWrapper.hasClass(classes.label), true);
  });

  var _ref10 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon,
    showLabel: false
  });

  it('should render label with the iconOnly class', function () {
    var wrapper = shallow(_ref10);
    var labelWrapper = wrapper.childAt(0).childAt(1);

    _chai.assert.strictEqual(labelWrapper.hasClass(classes.iconOnly), true, 'should have the iconOnly class');

    _chai.assert.strictEqual(labelWrapper.hasClass(classes.label), true, 'should have the label class');
  });
  it('should not render an Icon if icon is not provided', function () {
    var wrapper = shallow(_ref11);

    _chai.assert.strictEqual(wrapper.find(_Icon.default).exists(), false);
  });
  describe('prop: onClick', function () {
    it('should be called when a click is triggered', function () {
      var handleClick = (0, _sinon.spy)();
      var wrapper = shallow(_react.default.createElement(_BottomNavigationAction.default, {
        icon: "book",
        onClick: handleClick,
        value: "foo"
      }));
      wrapper.simulate('click', 'bar');

      _chai.assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });
  describe('prop: onChange', function () {
    it('should be called when a click is triggered', function () {
      var handleChange = (0, _sinon.spy)();
      var wrapper = shallow(_react.default.createElement(_BottomNavigationAction.default, {
        icon: "book",
        onChange: handleChange,
        value: "foo"
      }));
      wrapper.simulate('click', 'bar');

      _chai.assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
    });
  });
});