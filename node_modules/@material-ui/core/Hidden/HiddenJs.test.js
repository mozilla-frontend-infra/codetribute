"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _HiddenJs = _interopRequireDefault(require("./HiddenJs"));

var _ref = _react.default.createElement("div", null, "foo");

var _ref2 = _react.default.createElement("div", null, "foo");

describe('<HiddenJs />', function () {
  var shallow;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'HiddenJs'
    });
  });

  function resolvePropName(upDownOnly, breakpoint) {
    if (upDownOnly === 'only') {
      return 'only';
    }

    return "".concat(breakpoint).concat(upDownOnly);
  }

  function isHidden(hiddenBreakpoints, upDownOnly, width) {
    hiddenBreakpoints.forEach(function (breakpoint) {
      var prop = resolvePropName(upDownOnly, breakpoint);
      var descriptions = {
        Up: "".concat(prop, " is hidden for width: ").concat(width, " >= ").concat(breakpoint),
        Down: "".concat(prop, " is hidden for width: ").concat(width, " < ").concat(breakpoint),
        only: "".concat(prop, " is hidden for width: ").concat(width, " === ").concat(breakpoint)
      };
      var props = (0, _defineProperty2.default)({}, prop, upDownOnly === 'only' ? breakpoint : true);
      it(descriptions[upDownOnly], function () {
        var wrapper = shallow(_react.default.createElement(_HiddenJs.default, (0, _extends2.default)({
          width: width
        }, props), _ref));

        _chai.assert.strictEqual(wrapper.type(), null, 'should render null');
      });
    });
  }

  function isVisible(visibleBreakpoints, upDownOnly, width) {
    visibleBreakpoints.forEach(function (breakpoint) {
      var prop = resolvePropName(upDownOnly, breakpoint);
      var descriptions = {
        Up: "".concat(prop, " is visible for width: ").concat(width, " < ").concat(breakpoint),
        Down: "".concat(prop, " is visible for width: ").concat(width, " >= ").concat(breakpoint),
        only: "".concat(prop, " is visible for width: ").concat(width, " !== ").concat(breakpoint)
      };
      var props = (0, _defineProperty2.default)({}, prop, upDownOnly === 'only' ? breakpoint : true);
      it(descriptions[upDownOnly], function () {
        var wrapper = shallow(_react.default.createElement(_HiddenJs.default, (0, _extends2.default)({
          width: width
        }, props), _ref2));

        _chai.assert.isNotNull(wrapper.type(), 'should render');

        _chai.assert.strictEqual(wrapper.name(), 'div');

        _chai.assert.strictEqual(wrapper.first().text(), 'foo', 'should render children');
      });
    });
  }

  describe('screen width: xs', function () {
    describe('up', function () {
      isHidden(['xs'], 'Up', 'xs');
      isVisible(['sm', 'md', 'lg', 'xl'], 'Up', 'xs');
    });
    describe('down', function () {
      isHidden(['xs', 'sm', 'md', 'lg', 'xl'], 'Down', 'xs');
    });
    describe('only', function () {
      isHidden(['xs', ['xs', 'xl']], 'only', 'xs');
      isVisible(['sm', 'md', 'lg', 'xl', ['sm', 'md', 'lg', 'xl']], 'only', 'xs');
    });
  });
  describe('screen width: sm', function () {
    describe('up', function () {
      isHidden(['xs', 'sm'], 'Up', 'sm');
      isVisible(['md', 'lg', 'xl'], 'Up', 'sm');
    });
    describe('down', function () {
      isHidden(['sm', 'md', 'lg', 'xl'], 'Down', 'sm');
      isVisible(['xs'], 'Down', 'sm');
    });
    describe('only', function () {
      isHidden(['sm', ['sm', 'md']], 'only', 'sm');
      isVisible(['xs', 'md', 'lg', 'xl', ['xs', 'md', 'lg', 'xl']], 'only', 'sm');
    });
  });
  describe('screen width: md', function () {
    describe('up', function () {
      isHidden(['xs', 'sm', 'md'], 'Up', 'md');
      isVisible(['lg', 'xl'], 'Up', 'md');
    });
    describe('down', function () {
      isHidden(['md', 'lg', 'xl'], 'Down', 'md');
      isVisible(['xs', 'sm'], 'Down', 'md');
    });
    describe('only', function () {
      isHidden(['md', ['md', 'lg']], 'only', 'md');
      isVisible(['xs', 'sm', 'lg', 'xl', ['xs', 'sm', 'lg', 'xl']], 'only', 'md');
    });
  });
  describe('screen width: lg', function () {
    describe('up', function () {
      isHidden(['xs', 'sm', 'md', 'lg'], 'Up', 'lg');
      isVisible(['xl'], 'Up', 'lg');
    });
    describe('down', function () {
      isHidden(['lg', 'xl'], 'Down', 'lg');
      isVisible(['xs', 'sm', 'md'], 'Down', 'lg');
    });
    describe('only', function () {
      isHidden(['lg', ['lg', 'xl']], 'only', 'lg');
      isVisible(['xs', 'sm', 'md', 'xl', ['xs', 'sm', 'md', 'xl']], 'only', 'lg');
    });
  });
  describe('screen width: xl', function () {
    describe('up', function () {
      isHidden(['xs', 'sm', 'md', 'lg', 'xl'], 'Up', 'xl');
    });
    describe('down', function () {
      isHidden(['xl'], 'Down', 'xl');
      isVisible(['xs', 'sm', 'md', 'lg'], 'Down', 'xl');
    });
    describe('only', function () {
      isHidden(['xl', ['xl', 'xs']], 'only', 'xl');
      isVisible(['xs', 'sm', 'md', 'lg', ['xs', 'sm', 'md', 'lg']], 'only', 'xl');
    });
  });
});