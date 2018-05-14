"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _AppBar = _interopRequireDefault(require("./AppBar"));

var _ref = _react.default.createElement(_AppBar.default, null, "Hello World");

var _ref2 = _react.default.createElement(_AppBar.default, null, "Hello World");

var _ref3 = _react.default.createElement(_AppBar.default, null, "Hello World");

var _ref4 = _react.default.createElement(_AppBar.default, {
  className: "test-class-name"
}, "Hello World");

var _ref5 = _react.default.createElement(_AppBar.default, {
  color: "primary"
}, "Hello World");

var _ref6 = _react.default.createElement(_AppBar.default, {
  color: "secondary"
}, "Hello World");

var _ref7 = _react.default.createElement(_AppBar.default, {
  position: "fixed"
}, "Hello World");

describe('<AppBar />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a Paper component', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.props().elevation, 4, 'should render with a 4dp shadow');
  });
  it('should render with the root class and primary', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorSecondary), false);
  });
  it('should render the custom className and the appBar class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');
  });
  it('should render a primary app bar', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorSecondary), false);
  });
  it('should render an secondary app bar', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), false, 'should not have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
  });
  describe('Dialog', function () {
    it('should add a .mui-fixed class', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.hasClass('mui-fixed'), true);
    });
  });
});