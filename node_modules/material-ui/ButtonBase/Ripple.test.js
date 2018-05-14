"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _TouchRipple = _interopRequireDefault(require("./TouchRipple"));

var _Ripple = _interopRequireDefault(require("./Ripple"));

var _ref = _react.default.createElement(_TouchRipple.default, null);

describe('<Ripple />', function () {
  var shallow;
  var classes;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)();
    classes = (0, _testUtils.getClasses)(_ref);
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a Transition', function () {
    var wrapper = shallow(_react.default.createElement(_Ripple.default, {
      classes: classes,
      timeout: {},
      rippleX: 0,
      rippleY: 0,
      rippleSize: 10
    }));

    _chai.assert.strictEqual(wrapper.name(), 'Transition');
  });
  it('should have the ripple className', function () {
    var wrapper = shallow(_react.default.createElement(_Ripple.default, {
      classes: classes,
      timeout: {},
      rippleX: 0,
      rippleY: 0,
      rippleSize: 11
    }));

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.ripple), true, 'should have the ripple class');

    _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.fast), false, 'should not have the fast (pulse) class');
  });
  describe('starting and stopping', function () {
    var wrapper;
    before(function () {
      wrapper = mount(_react.default.createElement(_Ripple.default, {
        classes: classes,
        timeout: {
          exit: 0,
          enter: 0
        },
        "in": false,
        rippleX: 0,
        rippleY: 0,
        rippleSize: 11
      }));
    });
    it('should start the ripple', function () {
      _chai.assert.strictEqual(wrapper.state().visible, false, 'should not be visible');

      wrapper.setProps({
        in: true
      });
      wrapper.update();

      _chai.assert.strictEqual(wrapper.state().visible, true, 'should be visible');

      var rippleWrapper = wrapper.find('span').first();

      _chai.assert.strictEqual(rippleWrapper.hasClass(classes.rippleVisible), true, 'should have the visible class');
    });
    it('should stop the ripple', function () {
      wrapper.setProps({
        in: true
      });
      wrapper.setProps({
        in: false
      });
      wrapper.update();

      _chai.assert.strictEqual(wrapper.state().leaving, true, 'should be leaving');

      var childWrapper = wrapper.find('span').last();

      _chai.assert.strictEqual(childWrapper.hasClass(classes.childLeaving), true, 'should have the leaving class');
    });
  });
  describe('pulsating and stopping', function () {
    var wrapper;
    before(function () {
      wrapper = mount(_react.default.createElement(_Ripple.default, {
        classes: classes,
        timeout: {
          enter: 0,
          exit: 0
        },
        "in": false,
        rippleX: 0,
        rippleY: 0,
        rippleSize: 11,
        pulsate: true
      }));
    });
    it('should render the ripple inside a pulsating Ripple', function () {
      _chai.assert.strictEqual(wrapper.name(), 'Ripple');

      var rippleWrapper = wrapper.find('span').first();

      _chai.assert.strictEqual(rippleWrapper.hasClass(classes.ripple), true, 'should have the ripple class');

      _chai.assert.strictEqual(rippleWrapper.hasClass(classes.ripplePulsate), true, 'should have the fast class');

      var childWrapper = wrapper.find('span').last();

      _chai.assert.strictEqual(childWrapper.hasClass(classes.childPulsate), true, 'should have the pulsating class');
    });
    it('should start the ripple', function () {
      _chai.assert.strictEqual(wrapper.state().visible, false, 'should not be visible');

      wrapper.setProps({
        in: true
      });
      wrapper.update();

      _chai.assert.strictEqual(wrapper.state().visible, true, 'should be visible');

      var rippleWrapper = wrapper.find('span').first();

      _chai.assert.strictEqual(rippleWrapper.hasClass(classes.rippleVisible), true, 'should have the visible class');

      var childWrapper = wrapper.find('span').last();

      _chai.assert.strictEqual(childWrapper.hasClass(classes.childPulsate), true, 'should have the pulsating class');
    });
    it('should stop the ripple', function () {
      wrapper.setProps({
        in: false
      });
      wrapper.update();

      _chai.assert.strictEqual(wrapper.state().leaving, true, 'should be leaving');

      var childWrapper = wrapper.find('span').last();

      _chai.assert.strictEqual(childWrapper.hasClass(classes.childLeaving), true, 'should have the leaving class');
    });
  });
  describe('pulsating and stopping', function () {
    var wrapper;
    var clock;
    var callbackSpy;
    beforeEach(function () {
      callbackSpy = (0, _sinon.spy)();
      wrapper = mount(_react.default.createElement(_Ripple.default, {
        classes: classes,
        timeout: {
          exit: 550
        },
        "in": true,
        onExited: callbackSpy,
        rippleX: 0,
        rippleY: 0,
        rippleSize: 11,
        pulsate: true
      }));
      clock = (0, _sinon.useFakeTimers)();
    });
    afterEach(function () {
      clock.restore();
    });
    it('handleExit should trigger a timer', function () {
      wrapper.setProps({
        in: false
      });
      clock.tick(549);

      _chai.assert.strictEqual(callbackSpy.callCount, 0, 'The timer is not finished yet');

      clock.tick(1);

      _chai.assert.strictEqual(callbackSpy.callCount, 1, 'handleExit callback should have been called');
    });
    it('unmount should defuse the handleExit timer', function () {
      wrapper.setProps({
        in: false
      });
      wrapper.unmount();
      clock.tick(550);

      _chai.assert.strictEqual(callbackSpy.callCount, 0, 'handleExit callback should not be called');
    });
  });
});