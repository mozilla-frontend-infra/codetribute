"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Paper = _interopRequireDefault(require("../Paper"));

var _Dialog = _interopRequireDefault(require("./Dialog"));

var _withMobileDialog = _interopRequireDefault(require("./withMobileDialog"));

describe('withMobileDialog', function () {
  var shallow;
  var classes;
  var defaultProps = {
    open: false
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'Dialog'
    });
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_Dialog.default, defaultProps, "foo"));
  });

  function isFullScreen(breakpoints, width) {
    breakpoints.forEach(function (breakpoint) {
      it("is for width: ".concat(width, " <= ").concat(breakpoint), function () {
        var ResponsiveDialog = (0, _withMobileDialog.default)({
          breakpoint: breakpoint
        })(_Dialog.default);
        var wrapper = shallow(_react.default.createElement(ResponsiveDialog, (0, _extends2.default)({}, defaultProps, {
          width: width
        }), "foo"));

        _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(classes.paperFullScreen), true);
      });
    });
  }

  function isNotFullScreen(breakpoints, width) {
    breakpoints.forEach(function (breakpoint) {
      it("is not for width: ".concat(width, " > ").concat(breakpoint), function () {
        var ResponsiveDialog = (0, _withMobileDialog.default)({
          breakpoint: breakpoint
        })(_Dialog.default);
        var wrapper = shallow(_react.default.createElement(ResponsiveDialog, (0, _extends2.default)({}, defaultProps, {
          width: width
        }), "foo"));

        _chai.assert.strictEqual(wrapper.find(_Paper.default).hasClass(classes.paperFullScreen), false);
      });
    });
  }

  describe('screen width: xs', function () {
    isFullScreen(['xs', 'sm', 'md', 'lg', 'xl'], 'xs');
  });
  describe('screen width: sm (default)', function () {
    isFullScreen(['sm', 'md', 'lg', 'xl'], 'sm');
    isNotFullScreen(['xs'], 'sm');
  });
  describe('screen width: md', function () {
    isFullScreen(['md', 'lg', 'xl'], 'md');
    isNotFullScreen(['xs', 'sm'], 'md');
  });
  describe('screen width: lg', function () {
    isFullScreen(['lg', 'xl'], 'lg');
    isNotFullScreen(['xs', 'sm', 'md'], 'lg');
  });
  describe('screen width: xl', function () {
    isFullScreen(['xl'], 'xl');
    isNotFullScreen(['xs', 'sm', 'md', 'lg'], 'xl');
  });
});