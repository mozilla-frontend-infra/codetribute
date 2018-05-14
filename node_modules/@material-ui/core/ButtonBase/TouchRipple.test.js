"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _sinon = require("sinon");

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _TouchRipple = _interopRequireWildcard(require("./TouchRipple"));

var _ref = _react.default.createElement(_TouchRipple.default, null);

var _ref2 = _react.default.createElement(_TouchRipple.default, null);

var _ref3 = _react.default.createElement(_TouchRipple.default, {
  className: "test-class-name"
});

var _ref4 = _react.default.createElement(_TouchRipple.default, {
  center: true
});

var _ref5 = _react.default.createElement(_TouchRipple.default, null);

var _ref6 = _react.default.createElement(_TouchRipple.default, null);

var _ref7 = _react.default.createElement(_TouchRipple.default, null);

var _ref8 = _react.default.createElement(_TouchRipple.default, null);

var _ref9 = _react.default.createElement(_TouchRipple.default, null);

var _ref10 = _react.default.createElement(_TouchRipple.default, null);

var _ref11 = _react.default.createElement(_TouchRipple.default, null);

describe('<TouchRipple />', function () {
  var shallow;
  var mount;
  var classes;
  var TouchRippleNaked = (0, _testUtils.unwrap)(_TouchRipple.default);
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref);
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a <ReactTransitionGroup> component', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'TransitionGroup');

    _chai.assert.strictEqual(wrapper.props().component, 'span', 'should be pass a span as the component');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });
  it('should render the custom className', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.is('.test-class-name'), true, 'should contain the test className');
  });
  describe('prop: center', function () {
    it('should should compute the right ripple dimensions', function () {
      var wrapper = shallow(_ref4);
      var instance = wrapper.instance();
      instance.start({}, {
        fakeElement: true
      });
      wrapper.update();

      _chai.assert.strictEqual(wrapper.childAt(0).props().rippleSize, 1, 'should be odd');
    });
  });
  it('should create individual ripples', function () {
    var wrapper = mount(_react.default.createElement(TouchRippleNaked, {
      classes: {}
    }));
    var instance = wrapper.instance();

    _chai.assert.strictEqual(wrapper.state().ripples.length, 0, 'should start with no ripples');

    instance.start({
      clientX: 0,
      clientY: 0
    });

    _chai.assert.strictEqual(wrapper.state().ripples.length, 1, 'should create a ripple');

    instance.start({
      clientX: 0,
      clientY: 0
    });

    _chai.assert.strictEqual(wrapper.state().ripples.length, 2, 'should create another ripple');

    instance.start({
      clientX: 0,
      clientY: 0
    });

    _chai.assert.strictEqual(wrapper.state().ripples.length, 3, 'should create another ripple');

    instance.stop({
      type: 'mouseup'
    });

    _chai.assert.strictEqual(wrapper.state().ripples.length, 2, 'should remove a ripple');

    instance.stop({
      type: 'mouseup'
    });

    _chai.assert.strictEqual(wrapper.state().ripples.length, 1, 'should remove a ripple');

    instance.stop({
      type: 'mouseup'
    });

    _chai.assert.strictEqual(wrapper.state().ripples.length, 0, 'should remove all the ripples');
  });
  describe('creating unique ripples', function () {
    it('should create a ripple', function () {
      var wrapper = shallow(_ref5);
      var instance = wrapper.instance();
      instance.start({}, {
        pulsate: true,
        fakeElement: true
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 1);
    });
    it('should ignore a mousedown event', function () {
      var wrapper = shallow(_ref6);
      var instance = wrapper.instance();
      instance.ignoringMouseDown = true;
      instance.start({
        type: 'mousedown'
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);
    });
    it('should set ignoringMouseDown to true', function () {
      var wrapper = shallow(_ref7);
      var instance = wrapper.instance();

      _chai.assert.strictEqual(instance.ignoringMouseDown, false);

      instance.start({
        type: 'touchstart'
      }, {
        fakeElement: true
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 1);

      _chai.assert.strictEqual(instance.ignoringMouseDown, true);
    });
    it('should create a specific ripple', function () {
      var wrapper = shallow(_ref8);
      var instance = wrapper.instance();
      var clientX = 1;
      var clientY = 1;
      instance.start({
        clientX: clientX,
        clientY: clientY
      }, {
        fakeElement: true
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 1);

      _chai.assert.strictEqual(wrapper.state().ripples[0].props.rippleX, clientX);

      _chai.assert.strictEqual(wrapper.state().ripples[0].props.rippleY, clientY);
    });
  });
  describe('mobile', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should delay the display of the ripples', function () {
      var wrapper = shallow(_ref9);
      var instance = wrapper.instance();

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      instance.start({
        touches: [],
        clientX: 0,
        clientY: 0
      }, {
        fakeElement: true
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      clock.tick(_TouchRipple.DELAY_RIPPLE);

      _chai.assert.strictEqual(wrapper.state().ripples.length, 1);

      clock.tick(_TouchRipple.DELAY_RIPPLE);
      instance.stop({
        type: 'touchend'
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);
    });
    it('should trigger the ripple for short touch interactions', function () {
      var wrapper = shallow(_ref10);
      var instance = wrapper.instance();

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      instance.start({
        touches: [],
        clientX: 0,
        clientY: 0
      }, {
        fakeElement: true
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      clock.tick(_TouchRipple.DELAY_RIPPLE / 2);

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      instance.stop({
        type: 'touchend',
        persist: function persist() {}
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 1);

      clock.tick(1);

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);
    });
    it('should interupt the ripple schedule', function () {
      var wrapper = shallow(_ref11);
      var instance = wrapper.instance();

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      instance.start({
        touches: [],
        clientX: 0,
        clientY: 0
      }, {
        fakeElement: true
      });

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      clock.tick(_TouchRipple.DELAY_RIPPLE / 2);

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);

      instance.stop({
        type: 'touchmove'
      });
      clock.tick(_TouchRipple.DELAY_RIPPLE);

      _chai.assert.strictEqual(wrapper.state().ripples.length, 0);
    });
  });
});