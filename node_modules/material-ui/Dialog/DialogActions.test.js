"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _DialogActions = _interopRequireDefault(require("./DialogActions"));

var _ref = _react.default.createElement(_DialogActions.default, null);

var _ref2 = _react.default.createElement(_DialogActions.default, null);

var _ref3 = _react.default.createElement(_DialogActions.default, {
  "data-my-prop": "woofDialogActions"
});

var _ref4 = _react.default.createElement(_DialogActions.default, {
  className: "woofDialogActions"
});

var _ref5 = _react.default.createElement(_DialogActions.default, null, _react.default.createElement("button", {
  className: "woofDialogActions"
}, "Hello"));

var _ref6 = _react.default.createElement("button", {
  className: "woofDialogActions"
}, "Hello");

var _ref7 = _react.default.createElement("button", null, "false button");

describe('<DialogActions />', function () {
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
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialogActions', 'custom prop should be woofDialogActions');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofDialogActions'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children with the button class wrapped in a div with the action class', function () {
    var wrapper = shallow(_ref5);
    var button = wrapper.childAt(0);

    _chai.assert.strictEqual(button.is('button'), true, 'should be a button');

    _chai.assert.strictEqual(button.hasClass('woofDialogActions'), true, 'should have the user class');

    _chai.assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');
  });
  it('should render children with the conditional buttons', function () {
    var showButton = true;
    var wrapper = shallow(_react.default.createElement(_DialogActions.default, null, showButton ? _ref6 : null, !showButton ? _ref7 : null));
    var button = wrapper.childAt(0);

    _chai.assert.strictEqual(button.hasClass('woofDialogActions'), true, 'should have the user class');

    _chai.assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');

    _chai.assert.strictEqual(button.is('button'), true, 'should be a button');
  });
});