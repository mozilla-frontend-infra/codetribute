"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Icon = _interopRequireDefault(require("./Icon"));

var _ref = _react.default.createElement(_Icon.default, null);

var _ref2 = _react.default.createElement(_Icon.default, null, "account_circle");

var _ref3 = _react.default.createElement(_Icon.default, null, "account_circle");

var _ref4 = _react.default.createElement(_Icon.default, {
  "data-test": "hello"
}, "account_circle");

var _ref5 = _react.default.createElement(_Icon.default, {
  className: "meow"
}, "account_circle");

var _ref6 = _react.default.createElement(_Icon.default, {
  color: "secondary"
}, "account_circle");

var _ref7 = _react.default.createElement(_Icon.default, {
  color: "action"
}, "account_circle");

var _ref8 = _react.default.createElement(_Icon.default, {
  color: "error"
}, "account_circle");

var _ref9 = _react.default.createElement(_Icon.default, {
  color: "primary"
}, "account_circle");

describe('<Icon />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('renders children by default', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.contains('account_circle'), true, 'should contain the children');
  });
  it('should render an span with root class', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'span');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });
  it('should spread props on span', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the span');
  });
  describe('optional classes', function () {
    it('should render with the user class', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
    });
    it('should render with the secondary color', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });
    it('should render with the action color', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorAction), true, 'should have the "action" color');
    });
    it('should render with the error color', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorError), true, 'should have the "error" color');
    });
    it('should render with the primary class', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the "primary" color');
    });
  });
});