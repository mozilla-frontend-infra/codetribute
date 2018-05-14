"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _withWidth = _interopRequireWildcard(require("./withWidth"));

var _createBreakpoints = _interopRequireDefault(require("../styles/createBreakpoints"));

var _createMuiTheme = _interopRequireDefault(require("../styles/createMuiTheme"));

var _ref = _react.default.createElement("div", null);

var Empty = function Empty() {
  return _ref;
};

var EmptyWithWidth = (0, _withWidth.default)()(Empty);
var breakpoints = (0, _createBreakpoints.default)({});
var TEST_ENV_WIDTH = window.innerWidth > breakpoints.values.md ? 'md' : 'sm';

var _ref2 = _react.default.createElement(EmptyWithWidth, null);

var _ref3 = _react.default.createElement(EmptyWithWidth, {
  width: "xl"
});

var _ref4 = _react.default.createElement(EmptyWithWidth, null);

var _ref5 = _react.default.createElement(EmptyWithWidth, null);

var _ref6 = _react.default.createElement(EmptyWithWidth, {
  width: "sm"
});

var _ref7 = _react.default.createElement(EmptyWithWidth, {
  initialWidth: "lg"
});

describe('withWidth', function () {
  var shallow;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true,
      disableLifecycleMethods: true
    });
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  describe('server side rendering', function () {
    it('should not render the children as the width is unknown', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.type(), null, 'should render nothing');
    });
  });
  describe('prop: width', function () {
    it('should be able to override it', function () {
      var wrapper = mount(_ref3);

      _chai.assert.strictEqual(wrapper.find(Empty).props().width, 'xl');
    });
  });
  describe('browser', function () {
    it('should provide the right width to the child element', function () {
      var wrapper = mount(_ref4);

      _chai.assert.strictEqual(wrapper.find(Empty).props().width, TEST_ENV_WIDTH);
    });
  });
  describe('isWidthUp', function () {
    it('should work as default inclusive', function () {
      _chai.assert.strictEqual((0, _withWidth.isWidthUp)('md', 'lg'), true, 'should accept larger size');

      _chai.assert.strictEqual((0, _withWidth.isWidthUp)('md', 'md'), true, 'should be inclusive');

      _chai.assert.strictEqual((0, _withWidth.isWidthUp)('md', 'sm'), false, 'should reject smaller size');
    });
    it('should work as exclusive', function () {
      _chai.assert.strictEqual((0, _withWidth.isWidthUp)('md', 'lg', false), true, 'should accept larger size');

      _chai.assert.strictEqual((0, _withWidth.isWidthUp)('md', 'md', false), false, 'should be exclusive');

      _chai.assert.strictEqual((0, _withWidth.isWidthUp)('md', 'sm', false), false, 'should reject smaller size');
    });
  });
  describe('isWidthDown', function () {
    it('should work as default inclusive', function () {
      _chai.assert.strictEqual((0, _withWidth.isWidthDown)('md', 'lg', true), false, 'should reject larger size');

      _chai.assert.strictEqual((0, _withWidth.isWidthDown)('md', 'md', true), true, 'should be inclusive');

      _chai.assert.strictEqual((0, _withWidth.isWidthDown)('md', 'sm', true), true, 'should accept smaller size');
    });
    it('should work as exclusive', function () {
      _chai.assert.strictEqual((0, _withWidth.isWidthDown)('md', 'lg', false), false, 'should reject larger size');

      _chai.assert.strictEqual((0, _withWidth.isWidthDown)('md', 'md', false), false, 'should be exclusive');

      _chai.assert.strictEqual((0, _withWidth.isWidthDown)('md', 'sm', false), true, 'should accept smaller size');
    });
  });
  describe('width computation', function () {
    it('should work as expected', function () {
      var wrapper = shallow(_ref5);
      var instance = wrapper.instance();
      var updateWidth = instance.updateWidth.bind(instance);
      breakpoints.keys.forEach(function (key) {
        updateWidth(breakpoints.values[key]);

        _chai.assert.strictEqual(wrapper.state().width, key, 'should return the matching width');
      });
    });
  });
  describe('handle resize', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should handle resize event', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.state().width, undefined);

      wrapper.simulate('resize');
      clock.tick(166);

      _chai.assert.strictEqual(wrapper.state().width, TEST_ENV_WIDTH);
    });
  });
  describe('prop: initialWidth', function () {
    it('should work as expected', function () {
      var element = _ref7; // First mount on the server

      var wrapper1 = shallow(element);

      _chai.assert.strictEqual(wrapper1.find(Empty).props().width, 'lg');

      var wrapper2 = mount(element); // Second mount on the client

      _chai.assert.strictEqual(wrapper2.find(Empty).props().width, TEST_ENV_WIDTH);

      _chai.assert.strictEqual(TEST_ENV_WIDTH !== 'lg', true);
    });
  });
  describe('option: withTheme', function () {
    it('should inject the theme', function () {
      var EmptyWithWidth2 = (0, _withWidth.default)({
        withTheme: true
      })(Empty);
      var wrapper = mount(_react.default.createElement(EmptyWithWidth2, null));

      _chai.assert.strictEqual((0, _typeof2.default)(wrapper.find(Empty).props().theme), 'object');
    });
    it('should forward the theme', function () {
      var EmptyWithWidth2 = (0, _withWidth.default)({
        withTheme: true
      })(Empty);
      var theme = (0, _createMuiTheme.default)();
      var wrapper = mount(_react.default.createElement(EmptyWithWidth2, {
        theme: theme
      }));

      _chai.assert.strictEqual(wrapper.find(Empty).props().theme, theme);
    });
  });
});