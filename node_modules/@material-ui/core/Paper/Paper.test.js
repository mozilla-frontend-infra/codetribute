"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Paper = _interopRequireDefault(require("./Paper"));

var _ref = _react.default.createElement(_Paper.default, null);

var _ref2 = _react.default.createElement(_Paper.default, null, "Hello World");

var _ref3 = _react.default.createElement(_Paper.default, null, "Hello World");

var _ref4 = _react.default.createElement(_Paper.default, {
  square: true
}, "Hello World");

var _ref5 = _react.default.createElement(_Paper.default, {
  elevation: 16
}, "Hello World");

var _ref6 = _react.default.createElement(_Paper.default, {
  component: "header"
}, "Hello World");

describe('<Paper />', function () {
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
  it('should render with the root class, default depth class', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.rounded), true);
  });
  it('should disable the rounded class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.rounded), false);
  });
  it('should set the elevation elevation class', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.elevation16), true, 'should have the 16 elevation class');

    wrapper.setProps({
      elevation: 24
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.elevation24), true, 'should have the 24 elevation class');

    wrapper.setProps({
      elevation: 2
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.elevation2), true, 'should have the 2 elevation class');
  });
  describe('prop: component', function () {
    it('should render a header', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.name(), 'header');
    });
  });
});