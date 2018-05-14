"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _DialogTitle = _interopRequireDefault(require("./DialogTitle"));

var _ref = _react.default.createElement(_DialogTitle.default, null, "foo");

var _ref2 = _react.default.createElement(_DialogTitle.default, null, "foo");

var _ref3 = _react.default.createElement(_DialogTitle.default, {
  "data-my-prop": "woofDialogTitle"
}, "foo");

var _ref4 = _react.default.createElement(_DialogTitle.default, {
  className: "woofDialogTitle"
}, "foo");

var _ref5 = _react.default.createElement("p", {
  className: "test"
}, "Hello");

describe('<DialogTitle />', function () {
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

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialogTitle', 'custom prop should be woofDialogTitle');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofDialogTitle'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render JSX children', function () {
    var children = _ref5;
    var wrapper = shallow(_react.default.createElement(_DialogTitle.default, {
      disableTypography: true
    }, children));

    _chai.assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should render string children as given string', function () {
    var children = 'Hello';
    var wrapper = shallow(_react.default.createElement(_DialogTitle.default, null, children));

    _chai.assert.strictEqual(wrapper.childAt(0).props().children, children);
  });
});