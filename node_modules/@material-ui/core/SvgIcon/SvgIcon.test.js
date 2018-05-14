"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _SvgIcon = _interopRequireDefault(require("./SvgIcon"));

var _ref = _react.default.createElement(_SvgIcon.default, null, "foo");

var _ref2 = _react.default.createElement("path", {
  d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
});

var _ref4 = _react.default.createElement(_SvgIcon.default, null, "book");

describe('<SvgIcon />', function () {
  var shallow;
  var classes;
  var path;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
    path = _ref2;
  });

  var _ref3 = _react.default.createElement(_SvgIcon.default, null, path);

  it('renders children by default', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.contains(path), true, 'should contain the children');

    _chai.assert.strictEqual(wrapper.props()['aria-hidden'], 'true');
  });
  it('should render an svg', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.name(), 'svg');
  });

  var _ref5 = _react.default.createElement(_SvgIcon.default, {
    "data-test": "hello",
    viewBox: "0 0 32 32"
  }, path);

  it('should spread props on svg', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.props()['data-test'], 'hello', 'should be spread on the svg');

    _chai.assert.strictEqual(wrapper.props().viewBox, '0 0 32 32', 'should override the viewBox');
  });

  var _ref6 = _react.default.createElement(_SvgIcon.default, {
    title: "Go to link",
    titleAccess: "Network"
  }, path);

  describe('prop: titleAccess', function () {
    it('should be able to make an icon accessible', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.find('title').text(), 'Network');

      _chai.assert.strictEqual(wrapper.props()['aria-hidden'], 'false');
    });
  });

  var _ref7 = _react.default.createElement(_SvgIcon.default, {
    className: "meow"
  }, path);

  var _ref8 = _react.default.createElement(_SvgIcon.default, {
    color: "secondary"
  }, path);

  var _ref9 = _react.default.createElement(_SvgIcon.default, {
    color: "action"
  }, path);

  var _ref10 = _react.default.createElement(_SvgIcon.default, {
    color: "error"
  }, path);

  var _ref11 = _react.default.createElement(_SvgIcon.default, {
    color: "primary"
  }, path);

  describe('prop: color', function () {
    it('should render with the user and SvgIcon classes', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the SvgIcon class');
    });
    it('should render with the secondary color', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });
    it('should render with the action color', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorAction), true, 'should have the "action" color');
    });
    it('should render with the error color', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorError), true, 'should have the "error" color');
    });
    it('should render with the primary class', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the "primary" color');
    });
  });
});