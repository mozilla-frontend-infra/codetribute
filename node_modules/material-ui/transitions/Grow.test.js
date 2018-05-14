"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Grow = _interopRequireDefault(require("./Grow"));

var _ref = _react.default.createElement("div", null);

describe('<Grow />', function () {
  var shallow;
  var props = {
    in: true,
    children: _ref
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
  });
  it('should render a Transition', function () {
    var wrapper = shallow(_react.default.createElement(_Grow.default, props));

    _chai.assert.strictEqual(wrapper.name(), 'Transition');
  });
  describe('event callbacks', function () {
    it('should fire event callbacks', function () {
      var events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
      var handlers = events.reduce(function (result, n) {
        result[n] = (0, _sinon.spy)();
        return result;
      }, {});
      var wrapper = shallow(_react.default.createElement(_Grow.default, (0, _extends2.default)({}, props, handlers)));
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
  describe('prop: timeout', function () {
    var wrapper;
    var instance;
    var element;
    var enterDuration = 556;
    var leaveDuration = 446;
    beforeEach(function () {
      wrapper = shallow(_react.default.createElement(_Grow.default, (0, _extends2.default)({}, props, {
        timeout: {
          enter: enterDuration,
          exit: leaveDuration
        }
      })));
      instance = wrapper.instance();
      element = {
        getBoundingClientRect: function getBoundingClientRect() {
          return {};
        },
        style: {}
      };
    });
    it('should create proper easeOut animation onEnter', function () {
      instance.handleEnter(element);

      _chai.assert.match(element.style.transition, new RegExp("".concat(enterDuration, "ms")));
    });
    it('should create proper sharp animation onExit', function () {
      instance.handleExit(element);

      _chai.assert.match(element.style.transition, new RegExp("".concat(leaveDuration, "ms")));
    });
  });
  describe('transition lifecycle', function () {
    var element = {
      style: {
        top: 'auto',
        left: 'auto',
        opacity: 1,
        transform: undefined,
        transformOrigin: undefined,
        transition: undefined
      }
    };
    describe('handleEnter()', function () {
      var wrapper;
      before(function () {
        wrapper = shallow(_react.default.createElement(_Grow.default, props));
        wrapper.instance().handleEnter(element);
      });
      it('should set the inline styles for the entering phase', function () {
        _chai.assert.strictEqual(element.style.transition, 'opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' + 'transform 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms');
      });
    });
    describe('handleExit()', function () {
      var wrapper;
      before(function () {
        wrapper = shallow(_react.default.createElement(_Grow.default, props));
        wrapper.instance().handleExit(element);
      });
      it('should set the inline styles for the exit phase', function () {
        _chai.assert.strictEqual(element.style.opacity, '0', 'should be transparent');

        _chai.assert.strictEqual(element.style.transform, 'scale(0.75, 0.5625)', 'should have the exit scale');
      });
    });
  });
  describe('addEndListener()', function () {
    var instance;
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should return autoTransitionDuration when timeout is auto', function () {
      var wrapper = shallow(_react.default.createElement(_Grow.default, (0, _extends2.default)({}, props, {
        timeout: "auto"
      })));

      _chai.assert.strictEqual(wrapper.props().timeout, null);

      instance = wrapper.instance();
      var next = (0, _sinon.spy)();
      var autoTransitionDuration = 10;
      instance.autoTransitionDuration = autoTransitionDuration;
      instance.addEndListener(null, next);

      _chai.assert.strictEqual(next.callCount, 0);

      clock.tick(autoTransitionDuration);

      _chai.assert.strictEqual(next.callCount, 1);

      instance.autoTransitionDuration = undefined;
      instance.addEndListener(null, next);

      _chai.assert.strictEqual(next.callCount, 1);

      clock.tick(0);

      _chai.assert.strictEqual(next.callCount, 2);
    });
    it('should return props.timeout when timeout is number', function () {
      var timeout = 10;
      var wrapper = shallow(_react.default.createElement(_Grow.default, (0, _extends2.default)({}, props, {
        timeout: timeout
      })));

      _chai.assert.strictEqual(wrapper.props().timeout, timeout);

      instance = wrapper.instance();
      var next = (0, _sinon.spy)();
      instance.addEndListener(null, next);

      _chai.assert.strictEqual(next.callCount, 0);

      clock.tick(timeout);

      _chai.assert.strictEqual(next.callCount, 0);
    });
  });
});