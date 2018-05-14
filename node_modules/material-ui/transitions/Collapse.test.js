"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Collapse = _interopRequireDefault(require("./Collapse"));

var _ref = _react.default.createElement("div", null);

var _ref2 = _react.default.createElement("h1", null, "Hello");

describe('<Collapse />', function () {
  var shallow;
  var classes;
  var props = {
    in: true,
    children: _ref
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_Collapse.default, props));
  });
  it('should render a Transition', function () {
    var wrapper = shallow(_react.default.createElement(_Collapse.default, props));

    _chai.assert.strictEqual(wrapper.name(), 'Transition');
  });
  it('should render a container around the wrapper', function () {
    var wrapper = shallow(_react.default.createElement(_Collapse.default, (0, _extends2.default)({}, props, {
      classes: {
        container: 'woofCollapse1'
      }
    })));
    var child = new _enzyme.ReactWrapper(wrapper.props().children('entered'));

    _chai.assert.strictEqual(child.name(), 'div');

    _chai.assert.strictEqual(child.hasClass(classes.container), true);

    _chai.assert.strictEqual(child.hasClass('woofCollapse1'), true);
  });
  it('should render a wrapper around the children', function () {
    var children = _ref2;
    var wrapper = shallow(_react.default.createElement(_Collapse.default, props, children));
    var child = new _enzyme.ReactWrapper(wrapper.props().children('entered'));

    _chai.assert.strictEqual(child.childAt(0).is('div'), true, 'should be a div');

    _chai.assert.strictEqual(child.childAt(0).childAt(0).children().type(), 'h1', 'should wrap the children');
  });
  describe('event callbacks', function () {
    it('should fire event callbacks', function () {
      var events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
      var handlers = events.reduce(function (result, n) {
        result[n] = (0, _sinon.spy)();
        return result;
      }, {});
      var wrapper = shallow(_react.default.createElement(_Collapse.default, (0, _extends2.default)({}, props, handlers)));
      events.forEach(function (n) {
        var event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          style: {}
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
      wrapper = shallow(_react.default.createElement(_Collapse.default, (0, _extends2.default)({}, props, {
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
    it('should create proper easeOut animation onEntering', function () {
      instance.handleEntering(element);

      _chai.assert.strictEqual(element.style.transitionDuration, "".concat(enterDuration, "ms"));
    });
    it('should create proper sharp animation onExiting', function () {
      instance.handleExiting(element);

      _chai.assert.strictEqual(element.style.transitionDuration, "".concat(leaveDuration, "ms"));
    });
  });
  describe('transition lifecycle', function () {
    var wrapper;
    var instance;
    before(function () {
      wrapper = shallow(_react.default.createElement(_Collapse.default, props));
      instance = wrapper.instance();
    });
    describe('handleEnter()', function () {
      var element;
      before(function () {
        element = {
          style: {
            height: 32
          }
        };
        instance.handleEnter(element);
      });
      it('should set element height to 0 initially', function () {
        _chai.assert.strictEqual(element.style.height, '0px', 'should set the height to 0');
      });
    });
    describe('handleEntering()', function () {
      var heightMock;
      var element;
      before(function () {
        heightMock = 666;
        element = {
          style: {
            height: heightMock,
            transitionDuration: undefined
          }
        };
        instance.handleEntering(element);
      });
      it('should set height to the 0', function () {
        _chai.assert.strictEqual(element.style.height, '0px', 'should have 0px height');
      });
      it('should call handleEntering', function () {
        var onEnteringStub = (0, _sinon.spy)();
        wrapper.setProps({
          onEntering: onEnteringStub
        });
        instance = wrapper.instance();
        instance.handleEntering(element);

        _chai.assert.strictEqual(onEnteringStub.callCount, 1);

        _chai.assert.strictEqual(onEnteringStub.calledWith(element), true);
      });
      describe('timeout', function () {
        var theme;
        var timeoutMock;
        var restore;
        before(function () {
          theme = instance.props.theme;
          restore = theme.transitions.getAutoHeightDuration;
          theme.transitions.getAutoHeightDuration = (0, _sinon.stub)().returns('woofCollapseStub');
          wrapper.setProps({
            timeout: 'auto'
          });
          instance = wrapper.instance();
        });
        after(function () {
          theme.transitions.getAutoHeightDuration = restore;
        });
        it('no wrapper', function () {
          instance.wrapper = false;
          instance.handleEntering(element);

          _chai.assert.strictEqual(element.style.transitionDuration, "".concat(theme.transitions.getAutoHeightDuration(0), "ms"));
        });
        it('has wrapper', function () {
          var clientHeightMock = 10;
          instance.wrapper = {
            clientHeight: clientHeightMock
          };
          instance.handleEntering(element);

          _chai.assert.strictEqual(element.style.transitionDuration, "".concat(theme.transitions.getAutoHeightDuration(clientHeightMock), "ms"));
        });
        it('number should set timeout to ms', function () {
          timeoutMock = 3;
          wrapper.setProps({
            timeout: timeoutMock
          });
          instance = wrapper.instance();
          instance.handleEntering(element);

          _chai.assert.strictEqual(element.style.transitionDuration, "".concat(timeoutMock, "ms"));
        });
        it('nothing should not set timeout', function () {
          var elementBackup = element;
          wrapper.setProps({
            timeout: undefined
          });
          instance = wrapper.instance();
          instance.handleEntering(element);

          _chai.assert.strictEqual(element.style.transitionDuration, elementBackup.style.transitionDuration);
        });
      });
    });
    describe('handleEntered()', function () {
      var element;
      var handleEnteredWrapper;
      var handleEnteredInstance;
      var onEnteredSpy;
      before(function () {
        handleEnteredWrapper = shallow(_react.default.createElement(_Collapse.default, props));
        onEnteredSpy = (0, _sinon.spy)();
        handleEnteredWrapper.setProps({
          onEntered: onEnteredSpy
        });
        handleEnteredInstance = handleEnteredWrapper.instance();
        element = {
          style: {
            height: 666,
            transitionDuration: '500ms'
          }
        };
        handleEnteredInstance.handleEntered(element);
      });
      it('should set height to auto', function () {
        _chai.assert.strictEqual(element.style.height, 'auto', 'should have auto height');
      });
      it('should have called onEntered', function () {
        _chai.assert.strictEqual(onEnteredSpy.callCount, 1, 'should have called props.onEntered');
      });
    });
    describe('handleExit()', function () {
      it('should set height to the wrapper height', function () {
        var element = {
          style: {
            height: 'auto'
          }
        };
        instance.wrapper = {
          clientHeight: 666
        };
        instance.handleExit(element);

        _chai.assert.strictEqual(element.style.height, '666px', 'should have 666px height');
      });
    });
    describe('handleExiting()', function () {
      var element;
      before(function () {
        element = {
          style: {
            height: 666,
            transitionDuration: undefined
          }
        };
        instance.handleExiting(element);
      });
      it('should set height to the 0', function () {
        _chai.assert.strictEqual(element.style.height, '0px', 'should have 0px height');
      });
      it('should call onExiting', function () {
        var onExitingStub = (0, _sinon.spy)();
        wrapper.setProps({
          onExiting: onExitingStub
        });
        instance = wrapper.instance();
        instance.handleExiting(element);

        _chai.assert.strictEqual(onExitingStub.callCount, 1);

        _chai.assert.strictEqual(onExitingStub.calledWith(element), true);
      });
      describe('timeout', function () {
        var theme;
        var timeoutMock;
        var restore;
        before(function () {
          theme = instance.props.theme;
          restore = theme.transitions.getAutoHeightDuration;
          theme.transitions.getAutoHeightDuration = (0, _sinon.stub)().returns('woofCollapseStub2');
          wrapper.setProps({
            timeout: 'auto'
          });
          instance = wrapper.instance();
        });
        after(function () {
          theme.transitions.getAutoHeightDuration = restore;
        });
        it('no wrapper', function () {
          instance.wrapper = false;
          instance.handleExiting(element);

          _chai.assert.strictEqual(element.style.transitionDuration, "".concat(theme.transitions.getAutoHeightDuration(0), "ms"));
        });
        it('has wrapper', function () {
          var clientHeightMock = 10;
          instance.wrapper = {
            clientHeight: clientHeightMock
          };
          instance.handleExiting(element);

          _chai.assert.strictEqual(element.style.transitionDuration, "".concat(theme.transitions.getAutoHeightDuration(clientHeightMock), "ms"));
        });
        it('number should set timeout to ms', function () {
          timeoutMock = 3;
          wrapper.setProps({
            timeout: timeoutMock
          });
          instance = wrapper.instance();
          instance.handleExiting(element);

          _chai.assert.strictEqual(element.style.transitionDuration, "".concat(timeoutMock, "ms"));
        });
        it('nothing should not set timeout', function () {
          var elementBackup = element;
          wrapper.setProps({
            timeout: undefined
          });
          instance = wrapper.instance();
          instance.handleExiting(element);

          _chai.assert.strictEqual(element.style.transitionDuration, elementBackup.style.transitionDuration);
        });
      });
    });
  });
  describe('handleRequestTimeout()', function () {
    var instance;
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should return autoTransitionDuration when timeout is auto', function () {
      var wrapper = shallow(_react.default.createElement(_Collapse.default, (0, _extends2.default)({}, props, {
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
      var wrapper = shallow(_react.default.createElement(_Collapse.default, (0, _extends2.default)({}, props, {
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
  describe('mount', function () {
    var mount;
    var mountInstance;
    before(function () {
      mount = (0, _testUtils.createMount)();
      var CollapseNaked = (0, _testUtils.unwrap)(_Collapse.default);
      mountInstance = mount(_react.default.createElement(CollapseNaked, {
        classes: {},
        theme: {}
      })).instance();
    });
    after(function () {
      mount.cleanUp();
    });
    it('instance should have a wrapper property', function () {
      _chai.assert.notStrictEqual(mountInstance.wrapper, undefined);
    });
  });
  describe('prop: collapsedHeight', function () {
    var collapsedHeight = '10px';
    it('should work when closed', function () {
      var wrapper = shallow(_react.default.createElement(_Collapse.default, (0, _extends2.default)({}, props, {
        collapsedHeight: collapsedHeight
      })));
      var child = new _enzyme.ReactWrapper(wrapper.props().children('entered'));

      _chai.assert.strictEqual(child.props().style.minHeight, collapsedHeight);
    });
    it('should be taken into account in handleExiting', function () {
      var wrapper = shallow(_react.default.createElement(_Collapse.default, (0, _extends2.default)({}, props, {
        collapsedHeight: collapsedHeight
      })));
      var instance = wrapper.instance();
      var element = {
        style: {
          height: 666,
          transitionDuration: undefined
        }
      };
      instance.handleExiting(element);

      _chai.assert.strictEqual(element.style.height, collapsedHeight, 'should have 0px height');
    });
  });
});