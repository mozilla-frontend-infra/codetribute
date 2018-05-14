"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Fade = _interopRequireDefault(require("./Fade"));

var _ref = _react.default.createElement("div", null);

var _ref2 = _react.default.createElement(_Fade.default, {
  "in": false,
  appear: true
}, _react.default.createElement("div", null, "Foo"));

var _ref3 = _react.default.createElement(_Fade.default, {
  "in": false,
  appear: false
}, _react.default.createElement("div", null, "Foo"));

describe('<Fade />', function () {
  var shallow;
  var mount;
  var defaultProps = {
    in: true,
    children: _ref
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a Transition', function () {
    var wrapper = shallow(_react.default.createElement(_Fade.default, defaultProps));

    _chai.assert.strictEqual(wrapper.name(), 'Transition');
  });
  describe('event callbacks', function () {
    it('should fire event callbacks', function () {
      var events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
      var handlers = events.reduce(function (result, n) {
        result[n] = (0, _sinon.spy)();
        return result;
      }, {});
      var wrapper = shallow(_react.default.createElement(_Fade.default, (0, _extends2.default)({}, defaultProps, handlers)));
      events.forEach(function (n) {
        var event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          style: {}
        });

        _chai.assert.strictEqual(handlers[n].callCount, 1, "should have called the ".concat(n, " handler"));

        _chai.assert.strictEqual(handlers[n].args[0].length, 1, 'should forward the element');
      });
    });
  });
  describe('transition lifecycle', function () {
    var wrapper;
    var instance;
    before(function () {
      wrapper = shallow(_react.default.createElement(_Fade.default, defaultProps));
      instance = wrapper.instance();
    });
    describe('handleEnter()', function () {
      it('should set style properties', function () {
        var element = {
          style: {}
        };
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transition, 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms');
      });
    });
    describe('handleExit()', function () {
      it('should set style properties', function () {
        var element = {
          style: {}
        };
        instance.handleExit(element);

        _chai.assert.strictEqual(element.style.transition, 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms');
      });
    });
  });
  describe('prop: appear', function () {
    it('should work when initially hidden', function () {
      var wrapper = mount(_ref2);

      _chai.assert.deepEqual(wrapper.find('div').props().style, {
        opacity: 0,
        willChange: 'opacity'
      });
    });
    it('should work when initially hidden', function () {
      var wrapper = mount(_ref3);

      _chai.assert.deepEqual(wrapper.find('div').props().style, {
        opacity: 0,
        willChange: 'opacity'
      });
    });
  });
});