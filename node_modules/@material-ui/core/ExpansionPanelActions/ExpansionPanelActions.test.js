"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _ExpansionPanelActions = _interopRequireDefault(require("./ExpansionPanelActions"));

var _ref = _react.default.createElement(_ExpansionPanelActions.default, null, "foo");

var _ref2 = _react.default.createElement(_ExpansionPanelActions.default, null, "foo");

var _ref3 = _react.default.createElement(_ExpansionPanelActions.default, {
  "data-my-prop": "woofExpansionPanelActions"
}, "foo");

var _ref4 = _react.default.createElement(_ExpansionPanelActions.default, {
  className: "woofExpansionPanelActions"
}, "foo");

var _ref5 = _react.default.createElement(_ExpansionPanelActions.default, null, _react.default.createElement("button", {
  className: "woofExpansionPanelActions"
}, "Hello"));

var _ref6 = _react.default.createElement(_ExpansionPanelActions.default, null, _react.default.createElement("button", null, "Hello"), null);

describe('<ExpansionPanelActions />', function () {
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

    _chai.assert.strictEqual(wrapper.props()['data-my-prop'], 'woofExpansionPanelActions', 'custom prop should be woofExpansionPanelActions');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofExpansionPanelActions'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children with the button class wrapped in a div with the action class', function () {
    var wrapper = shallow(_ref5);
    var button = wrapper.childAt(0);

    _chai.assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');

    _chai.assert.strictEqual(button.type(), 'button');

    _chai.assert.strictEqual(button.hasClass('woofExpansionPanelActions'), true, 'should have the user class');
  });
  it('should render a valid children', function () {
    var wrapper = shallow(_ref6);
    var button = wrapper.childAt(0);

    _chai.assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');

    _chai.assert.strictEqual(button.type(), 'button');
  });
});