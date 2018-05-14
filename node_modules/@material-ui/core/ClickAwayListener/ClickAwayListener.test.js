"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _ClickAwayListener = _interopRequireDefault(require("./ClickAwayListener"));

var _ref = _react.default.createElement("span", null, "Hello");

var _ref2 = _react.default.createElement("span", null, "Hello");

var _ref3 = _react.default.createElement("span", null, "Hello");

var _ref4 = _react.default.createElement("span", null, "Hello");

var _ref5 = _react.default.createElement("span", null, "Hello");

var _ref6 = _react.default.createElement("span", null, "Hello");

var _ref7 = _react.default.createElement("span", null, "Hello");

var _ref8 = _react.default.createElement("span", null, "Hello");

var _ref9 = _react.default.createElement("span", null, "Hello");

describe('<ClickAwayListener />', function () {
  var mount;
  var wrapper;
  before(function () {
    mount = (0, _testUtils.createMount)();
  });
  afterEach(function () {
    wrapper.unmount();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render the children', function () {
    var children = _ref;
    wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
      onClickAway: function onClickAway() {}
    }, children));

    _chai.assert.strictEqual(wrapper.contains(children), true);
  });
  describe('prop: onClickAway', function () {
    it('should be call when clicking away', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway
      }, _ref2));
      var event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      _chai.assert.strictEqual(handleClickAway.callCount, 1);

      _chai.assert.deepEqual(handleClickAway.args[0], [event]);
    });
    it('should not be call when clicking inside', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway
      }, _ref3));
      var event = new window.Event('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
      });

      var el = _reactDom.default.findDOMNode(wrapper.instance());

      if (el) {
        el.dispatchEvent(event);
      }

      _chai.assert.strictEqual(handleClickAway.callCount, 0);
    });
    it('should not be call when defaultPrevented', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway
      }, _react.default.createElement(_ClickAwayListener.default, {
        onClickAway: function onClickAway(event) {
          return event.preventDefault();
        }
      }, _ref4)));
      var event = new window.Event('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      window.document.body.dispatchEvent(event);

      _chai.assert.strictEqual(handleClickAway.callCount, 0);
    });
  });
  describe('prop: mouseEvent', function () {
    it('should not call `props.onClickAway` when `props.mouseEvent` is `false`', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway,
        mouseEvent: false
      }, _ref5));
      var event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      _chai.assert.strictEqual(handleClickAway.callCount, 0);
    });
    it('should call `props.onClickAway` when the appropriate mouse event is triggered', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway,
        mouseEvent: "onMouseDown"
      }, _ref6));
      var mouseUpEvent = document.createEvent('MouseEvents');
      mouseUpEvent.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(mouseUpEvent);

      _chai.assert.strictEqual(handleClickAway.callCount, 0);

      var mouseDownEvent = document.createEvent('MouseEvents');
      mouseDownEvent.initEvent('mousedown', true, true);
      window.document.body.dispatchEvent(mouseDownEvent);

      _chai.assert.strictEqual(handleClickAway.callCount, 1);

      _chai.assert.deepEqual(handleClickAway.args[0], [mouseDownEvent]);
    });
  });
  describe('prop: touchEvent', function () {
    it('should not call `props.onClickAway` when `props.touchEvent` is `false`', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway,
        touchEvent: false
      }, _ref7));
      var event = document.createEvent('Events');
      event.initEvent('touchend', true, true);
      window.document.body.dispatchEvent(event);

      _chai.assert.strictEqual(handleClickAway.callCount, 0);
    });
    it('should call `props.onClickAway` when the appropriate touch event is triggered', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway,
        touchEvent: "onTouchStart"
      }, _ref8));
      var touchEndEvent = document.createEvent('Events');
      touchEndEvent.initEvent('touchend', true, true);
      window.document.body.dispatchEvent(touchEndEvent);

      _chai.assert.strictEqual(handleClickAway.callCount, 0);

      var touchStartEvent = document.createEvent('Events');
      touchStartEvent.initEvent('touchstart', true, true);
      window.document.body.dispatchEvent(touchStartEvent);

      _chai.assert.strictEqual(handleClickAway.callCount, 1);

      _chai.assert.deepEqual(handleClickAway.args[0], [touchStartEvent]);
    });
  });
  describe('IE11 issue', function () {
    it('should not call the hook if the event is triggered after being unmounted', function () {
      var handleClickAway = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_ClickAwayListener.default, {
        onClickAway: handleClickAway
      }, _ref9));
      wrapper.instance().mounted = false;
      var event = document.createEvent('MouseEvents');
      event.initEvent('mouseup', true, true);
      window.document.body.dispatchEvent(event);

      _chai.assert.strictEqual(handleClickAway.callCount, 0);
    });
  });
});