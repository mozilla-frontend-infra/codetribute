"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _Snackbar = _interopRequireDefault(require("./Snackbar"));

var _Slide = _interopRequireDefault(require("../transitions/Slide"));

var _ref = _react.default.createElement(_Snackbar.default, {
  open: true
});

var _ref2 = _react.default.createElement(_Snackbar.default, {
  open: true,
  message: "message"
});

var _ref3 = _react.default.createElement(_Snackbar.default, {
  open: false,
  message: ""
});

var _ref4 = _react.default.createElement(_Snackbar.default, {
  open: false,
  message: ""
});

var _ref5 = _react.default.createElement("div", null);

describe('<Snackbar />', function () {
  var shallow;
  var mount;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a ClickAwayListener with classes', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'ClickAwayListener');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.root), true, 'should have the root class');

    _chai.assert.strictEqual(wrapper.find(_Slide.default).length, 1, 'should use a Slide by default');
  });
  describe('prop: onClose', function () {
    it('should be call when clicking away', function () {
      var handleClose = (0, _sinon.spy)();
      mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message"
      }));
      var event = new window.Event('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      window.document.body.dispatchEvent(event);

      _chai.assert.strictEqual(handleClose.callCount, 1);

      _chai.assert.deepEqual(handleClose.args[0], [event, 'clickaway']);
    });
  });
  describe('Consecutive messages', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should support synchronous onExited callback', function () {
      var messageCount = 2;
      var wrapper;
      var handleCloseSpy = (0, _sinon.spy)();

      var handleClose = function handleClose() {
        wrapper.setProps({
          open: false
        });
        handleCloseSpy();
      };

      var handleExitedSpy = (0, _sinon.spy)();

      var handleExited = function handleExited() {
        handleExitedSpy();

        if (handleExitedSpy.callCount < messageCount) {
          wrapper.setProps({
            open: true
          });
        }
      };

      var duration = 250;
      wrapper = mount(_react.default.createElement(_Snackbar.default, {
        open: false,
        onClose: handleClose,
        onExited: handleExited,
        message: "message",
        autoHideDuration: duration,
        transitionDuration: duration / 2
      }));

      _chai.assert.strictEqual(handleCloseSpy.callCount, 0);

      _chai.assert.strictEqual(handleExitedSpy.callCount, 0);

      wrapper.setProps({
        open: true
      });
      clock.tick(duration);

      _chai.assert.strictEqual(handleCloseSpy.callCount, 1);

      _chai.assert.strictEqual(handleExitedSpy.callCount, 0);

      clock.tick(duration / 2);

      _chai.assert.strictEqual(handleCloseSpy.callCount, 1);

      _chai.assert.strictEqual(handleExitedSpy.callCount, 1);

      clock.tick(duration);

      _chai.assert.strictEqual(handleCloseSpy.callCount, messageCount);

      _chai.assert.strictEqual(handleExitedSpy.callCount, 1);

      clock.tick(duration / 2);

      _chai.assert.strictEqual(handleCloseSpy.callCount, messageCount);

      _chai.assert.strictEqual(handleExitedSpy.callCount, messageCount);
    });
  });
  describe('prop: autoHideDuration', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should call onClose when the timer is done', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      var wrapper = mount(_react.default.createElement(_Snackbar.default, {
        open: false,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration
      }));
      wrapper.setProps({
        open: true
      });

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration);

      _chai.assert.strictEqual(handleClose.callCount, 1);

      _chai.assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });
    it('should not call onClose when the autoHideDuration is reset', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      var wrapper = mount(_react.default.createElement(_Snackbar.default, {
        open: false,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration
      }));
      wrapper.setProps({
        open: true
      });

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration / 2);
      wrapper.setProps({
        autoHideDuration: undefined
      });
      clock.tick(autoHideDuration / 2);

      _chai.assert.strictEqual(handleClose.callCount, 0);
    });
    it('should be able to interrupt the timer', function () {
      var handleMouseEnter = (0, _sinon.spy)();
      var handleMouseLeave = (0, _sinon.spy)();
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      var wrapper = mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration
      }));

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');

      _chai.assert.strictEqual(handleMouseEnter.callCount, 1, 'should trigger mouse enter callback');

      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');

      _chai.assert.strictEqual(handleMouseLeave.callCount, 1, 'should trigger mouse leave callback');

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(2e3);

      _chai.assert.strictEqual(handleClose.callCount, 1);

      _chai.assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });
    it('should not call onClose if autoHideDuration is undefined', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message",
        autoHideDuration: undefined
      }));

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration);

      _chai.assert.strictEqual(handleClose.callCount, 0);
    });
    it('should not call onClose if autoHideDuration is null', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message",
        autoHideDuration: null
      }));

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration);

      _chai.assert.strictEqual(handleClose.callCount, 0);
    });
    it('should not call onClose when closed', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      var wrapper = mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration
      }));

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration / 2);
      wrapper.setProps({
        open: false
      });
      clock.tick(autoHideDuration / 2);

      _chai.assert.strictEqual(handleClose.callCount, 0);
    });
  });
  describe('prop: resumeHideDuration', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should not call onClose with not timeout after user interaction', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      var resumeHideDuration = 3e3;
      var wrapper = mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration,
        resumeHideDuration: resumeHideDuration
      }));

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(2e3);

      _chai.assert.strictEqual(handleClose.callCount, 0);
    });
    it('should call onClose when timer done after user interaction', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      var resumeHideDuration = 3e3;
      var wrapper = mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration,
        resumeHideDuration: resumeHideDuration
      }));

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseEnter');
      clock.tick(autoHideDuration / 2);
      wrapper.simulate('mouseLeave');

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(resumeHideDuration);

      _chai.assert.strictEqual(handleClose.callCount, 1);

      _chai.assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });
  });
  describe('prop: disableWindowBlurListener', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should pause auto hide when not disabled and window lost focus', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration,
        disableWindowBlurListener: false
      }));
      var bEvent = new window.Event('blur', {
        view: window,
        bubbles: false,
        cancelable: false
      });
      window.dispatchEvent(bEvent);

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration);

      _chai.assert.strictEqual(handleClose.callCount, 0);

      var fEvent = new window.Event('focus', {
        view: window,
        bubbles: false,
        cancelable: false
      });
      window.dispatchEvent(fEvent);

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration);

      _chai.assert.strictEqual(handleClose.callCount, 1);

      _chai.assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });
    it('should not pause auto hide when disabled and window lost focus', function () {
      var handleClose = (0, _sinon.spy)();
      var autoHideDuration = 2e3;
      mount(_react.default.createElement(_Snackbar.default, {
        open: true,
        onClose: handleClose,
        message: "message",
        autoHideDuration: autoHideDuration,
        disableWindowBlurListener: true
      }));
      var event = new window.Event('blur', {
        view: window,
        bubbles: false,
        cancelable: false
      });
      window.dispatchEvent(event);

      _chai.assert.strictEqual(handleClose.callCount, 0);

      clock.tick(autoHideDuration);

      _chai.assert.strictEqual(handleClose.callCount, 1);

      _chai.assert.deepEqual(handleClose.args[0], [null, 'timeout']);
    });
  });
  describe('prop: open', function () {
    it('should not render anything when closed', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.type(), null);
    });
    it('should be able show it after mounted', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.type(), null);

      wrapper.setProps({
        open: true
      });

      _chai.assert.strictEqual(wrapper.find(_Slide.default).length, 1, 'should use a Slide by default');
    });
  });
  describe('prop: children', function () {
    it('should render the children', function () {
      var children = _ref5;
      var wrapper = shallow(_react.default.createElement(_Snackbar.default, {
        open: true
      }, children));

      _chai.assert.strictEqual(wrapper.contains(children), true);
    });
  });
  describe('prop: TransitionComponent', function () {
    it('should render a Snackbar with TransitionComponent', function () {
      var Transition = function Transition(props) {
        return _react.default.createElement("div", (0, _extends2.default)({
          className: "cloned-element-class"
        }, props));
      };

      var wrapper = shallow(_react.default.createElement(_Snackbar.default, {
        open: true,
        TransitionComponent: Transition
      }));

      _chai.assert.strictEqual(wrapper.find(Transition).length, 1, 'should include element given in TransitionComponent');
    });
  });
});