"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _DialogContentText = _interopRequireDefault(require("./DialogContentText"));

var _ref = _react.default.createElement(_DialogContentText.default, null);

var _ref2 = _react.default.createElement(_DialogContentText.default, {
  className: "woofDialogContentText"
});

var _ref3 = _react.default.createElement("p", null);

describe('<DialogContentText />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  describe('prop: className', function () {
    it('should render with the user and root classes', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.hasClass('woofDialogContentText'), true);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: children', function () {
    it('should render children', function () {
      var children = _ref3;
      var wrapper = shallow(_react.default.createElement(_DialogContentText.default, null, children));

      _chai.assert.strictEqual(wrapper.children().equals(children), true);
    });
  });
});