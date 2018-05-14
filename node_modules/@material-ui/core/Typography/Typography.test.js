"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Typography = _interopRequireDefault(require("./Typography"));

var _ref = _react.default.createElement(_Typography.default, null, "Hello");

var _ref2 = _react.default.createElement(_Typography.default, null, "Hello");

var _ref3 = _react.default.createElement(_Typography.default, {
  "data-test": "hello"
}, "Hello");

var _ref4 = _react.default.createElement(_Typography.default, null, "Hello");

var _ref5 = _react.default.createElement(_Typography.default, {
  className: "woofTypography"
}, "Hello");

var _ref6 = _react.default.createElement(_Typography.default, {
  align: "center",
  className: "woofTypography"
}, "Hello");

var _ref10 = _react.default.createElement(_Typography.default, {
  color: "inherit"
}, "Hello");

var _ref11 = _react.default.createElement(_Typography.default, {
  variant: "button"
}, "Hello");

var _ref12 = _react.default.createElement(_Typography.default, {
  paragraph: true
}, "Hello");

var _ref13 = _react.default.createElement(_Typography.default, {
  variant: "title"
}, "Hello");

var _ref14 = _react.default.createElement(_Typography.default, {
  component: "h1"
}, "Hello");

describe('<Typography />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render the text', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });
  it('should spread props', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });
  it('should render body1 root by default', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.body1), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should merge user classes', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.body1), true);

    _chai.assert.strictEqual(wrapper.hasClass('woofTypography'), true);
  });
  it('should center text', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.alignCenter), true);
  });
  ['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'].forEach(function (variant) {
    var _ref7 = _react.default.createElement(_Typography.default, {
      variant: variant
    }, "Hello");

    it("should render ".concat(variant, " text"), function () {
      var wrapper = shallow(_ref7);

      _chai.assert.ok(classes[variant] !== undefined);

      _chai.assert.strictEqual(wrapper.hasClass(classes[variant]), true, "should be ".concat(variant, " text"));
    });
  });
  [['primary', 'colorPrimary'], ['textSecondary', 'colorTextSecondary'], ['secondary', 'colorSecondary'], ['inherit', 'colorInherit'], ['error', 'colorError']].forEach(function (_ref8) {
    var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
        color = _ref9[0],
        className = _ref9[1];

    it("should render ".concat(color, " color"), function () {
      var wrapper = shallow(_react.default.createElement(_Typography.default, {
        color: color
      }, "Hello"));

      _chai.assert.ok(classes[className] !== undefined);

      _chai.assert.strictEqual(wrapper.hasClass(classes[className]), true, "should be ".concat(color, " text"));
    });
  });
  describe('prop: color', function () {
    it('should inherit the color', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    });
  });
  describe('headline', function () {
    it('should render a span by default', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.name(), 'span');
    });
    it('should render a p with a paragraph', function () {
      var wrapper = shallow(_ref12);

      _chai.assert.strictEqual(wrapper.name(), 'p');
    });
    it('should render the mapped headline', function () {
      var wrapper = shallow(_ref13);

      _chai.assert.strictEqual(wrapper.name(), 'h2');
    });
    it('should render a h1', function () {
      var wrapper = shallow(_ref14);

      _chai.assert.strictEqual(wrapper.name(), 'h1');
    });
  });
});