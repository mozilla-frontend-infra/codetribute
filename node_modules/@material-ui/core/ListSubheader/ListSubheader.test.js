"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _ListSubheader = _interopRequireDefault(require("./ListSubheader"));

var _ref = _react.default.createElement(_ListSubheader.default, null);

var _ref2 = _react.default.createElement(_ListSubheader.default, null);

var _ref3 = _react.default.createElement(_ListSubheader.default, {
  className: "woofListSubheader"
});

var _ref4 = _react.default.createElement(_ListSubheader.default, {
  color: "primary"
});

var _ref5 = _react.default.createElement(_ListSubheader.default, {
  inset: true
});

var _ref6 = _react.default.createElement(_ListSubheader.default, null);

var _ref7 = _react.default.createElement(_ListSubheader.default, {
  disableSticky: true
});

describe('<ListSubheader />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a li', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'li');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass('woofListSubheader'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should display primary color', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should display inset class', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have the primary class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('prop: disableSticky', function () {
    it('should display sticky class', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass(classes.sticky), true);
    });
    it('should not display sticky class', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.hasClass(classes.sticky), false);
    });
  });
});