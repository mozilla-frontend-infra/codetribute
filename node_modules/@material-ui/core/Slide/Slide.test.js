"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _testUtils = require("../test-utils");

var _Slide = _interopRequireWildcard(require("./Slide"));

var _transitions = _interopRequireWildcard(require("../styles/transitions"));

var _createMuiTheme = _interopRequireDefault(require("../styles/createMuiTheme"));

var _ref = _react.default.createElement("div", null);

var _ref2 = _react.default.createElement("div", null, "Foo");

var _ref3 = _react.default.createElement("div", null, "Foo");

describe('<Slide />', function () {
  var shallow;
  var mount;
  var SlideNaked = (0, _testUtils.unwrap)(_Slide.default);
  var defaultProps = {
    in: true,
    children: _ref,
    direction: 'down'
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
    var wrapper = shallow(_react.default.createElement(_Slide.default, defaultProps));

    _chai.assert.strictEqual(wrapper.name(), 'EventListener');

    _chai.assert.strictEqual(wrapper.childAt(0).name(), 'Transition');
  });
  it('should not override children styles', function () {
    var wrapper = mount(_react.default.createElement(SlideNaked, (0, _extends2.default)({}, defaultProps, {
      style: {
        color: 'red',
        backgroundColor: 'yellow'
      },
      theme: (0, _createMuiTheme.default)()
    }), _react.default.createElement("div", {
      style: {
        color: 'blue'
      }
    })));

    _chai.assert.deepEqual(wrapper.childAt(0).childAt(0).props().style, {
      backgroundColor: 'yellow',
      color: 'blue'
    });
  });
  describe('event callbacks', function () {
    it('should fire event callbacks', function () {
      var events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
      var handlers = events.reduce(function (result, n) {
        result[n] = (0, _sinon.spy)();
        return result;
      }, {});
      var wrapper = shallow(_react.default.createElement(_Slide.default, (0, _extends2.default)({}, defaultProps, handlers))).childAt(0);
      events.forEach(function (n) {
        var event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          fakeTransform: 'none',
          style: {},
          getBoundingClientRect: function getBoundingClientRect() {
            return {};
          }
        });

        _chai.assert.strictEqual(handlers[n].callCount, 1, "should have called the ".concat(n, " handler"));
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
      wrapper = shallow(_react.default.createElement(_Slide.default, (0, _extends2.default)({}, defaultProps, {
        timeout: {
          enter: enterDuration,
          exit: leaveDuration
        }
      })));
      instance = wrapper.instance();
      element = {
        fakeTransform: 'none',
        getBoundingClientRect: function getBoundingClientRect() {
          return {};
        },
        style: {}
      };
    });
    it('should create proper easeOut animation onEntering', function () {
      instance.handleEntering(element);

      var animation = _transitions.default.create('transform', {
        duration: enterDuration,
        easing: _transitions.easing.easeOut
      });

      _chai.assert.strictEqual(element.style.transition, animation);
    });
    it('should create proper sharp animation onExit', function () {
      instance.handleExit(element);

      var animation = _transitions.default.create('transform', {
        duration: leaveDuration,
        easing: _transitions.easing.sharp
      });

      _chai.assert.strictEqual(element.style.transition, animation);
    });
  });
  describe('prop: direction', function () {
    it('should update the position', function () {
      var wrapper = mount(_react.default.createElement(SlideNaked, (0, _extends2.default)({}, defaultProps, {
        theme: (0, _createMuiTheme.default)(),
        "in": false,
        direction: "left"
      })));

      var transition = _reactDom.default.findDOMNode(wrapper.instance().transition);

      var transition1 = transition.style.transform;
      wrapper.setProps({
        direction: 'right'
      });
      var transition2 = transition.style.transform;

      _chai.assert.notStrictEqual(transition1, transition2);
    });
  });
  describe('transition lifecycle', function () {
    var wrapper;
    var instance;
    before(function () {
      wrapper = shallow(_react.default.createElement(_Slide.default, defaultProps));
      instance = wrapper.instance();
    });
    describe('handleEnter()', function () {
      var element;
      beforeEach(function () {
        element = {
          fakeTransform: 'none',
          getBoundingClientRect: function getBoundingClientRect() {
            return {
              width: 500,
              height: 300,
              left: 300,
              right: 800,
              top: 200,
              bottom: 500
            };
          },
          style: {}
        };
      });
      it('should set element transform and transition according to the direction', function () {
        wrapper.setProps({
          direction: 'left'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateX(100vw) translateX(-300px)');

        wrapper.setProps({
          direction: 'right'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateX(-824px)');

        wrapper.setProps({
          direction: 'up'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-200px)');

        wrapper.setProps({
          direction: 'down'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateY(-524px)');
      });
      it('should reset the previous transition if needed', function () {
        element.style.transform = 'translateX(-824px)';
        wrapper.setProps({
          direction: 'right'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateX(-824px)');
      });
    });
    describe('handleEntering()', function () {
      var element;
      before(function () {
        element = {
          style: {}
        };
        instance.handleEntering(element);
      });
      it('should reset the translate3d', function () {
        _chai.assert.strictEqual(element.style.transform, 'translate(0, 0)');
      });
    });
    describe('handleExiting()', function () {
      var element;
      before(function () {
        element = {
          fakeTransform: 'none',
          getBoundingClientRect: function getBoundingClientRect() {
            return {
              width: 500,
              height: 300,
              left: 300,
              right: 800,
              top: 200,
              bottom: 500
            };
          },
          style: {}
        };
      });
      it('should set element transform and transition according to the direction', function () {
        wrapper.setProps({
          direction: 'left'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateX(100vw) translateX(-300px)');

        wrapper.setProps({
          direction: 'right'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateX(-824px)');

        wrapper.setProps({
          direction: 'up'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-200px)');

        wrapper.setProps({
          direction: 'down'
        });
        instance.handleEnter(element);

        _chai.assert.strictEqual(element.style.transform, 'translateY(-524px)');
      });
    });
  });
  describe('mount', function () {
    it('should work when initially hidden', function () {
      var wrapper = mount(_react.default.createElement(SlideNaked, {
        theme: (0, _createMuiTheme.default)(),
        "in": false
      }, _ref2));

      var transition = _reactDom.default.findDOMNode(wrapper.instance().transition);

      _chai.assert.strictEqual(transition.style.visibility, 'inherit');

      _chai.assert.notStrictEqual(transition.style.transform, undefined);
    });
  });
  describe('resize', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should recompute the correct position', function () {
      var wrapper = mount(_react.default.createElement(SlideNaked, {
        theme: (0, _createMuiTheme.default)(),
        direction: "up",
        "in": false
      }, _ref3));
      var instance = wrapper.instance();
      instance.handleResize();
      clock.tick(166);

      var transition = _reactDom.default.findDOMNode(instance.transition);

      _chai.assert.notStrictEqual(transition.style.transform, undefined);
    });
    it('should take existing transform into account', function () {
      var element = {
        fakeTransform: 'transform matrix(1, 0, 0, 1, 0, 420)',
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 1200,
            bottom: 1500
          };
        },
        style: {}
      };
      (0, _Slide.setTranslateValue)({
        direction: 'up'
      }, element);

      _chai.assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-780px)');
    });
    it('should do nothing when visible', function () {
      var wrapper = shallow(_react.default.createElement(_Slide.default, defaultProps));
      var instance = wrapper.instance();
      instance.handleResize();
      clock.tick(166);
    });
  });
  describe('server side', function () {
    it('should be initially hidden', function () {
      var wrapper = shallow(_react.default.createElement(_Slide.default, (0, _extends2.default)({}, defaultProps, {
        "in": false
      })));

      _chai.assert.strictEqual(wrapper.find(_Transition.default).props().style.visibility, 'hidden');
    });
  });
});