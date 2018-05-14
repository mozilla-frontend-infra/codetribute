"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _StepButton = _interopRequireDefault(require("./StepButton"));

var _StepLabel = _interopRequireDefault(require("./StepLabel"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _ref = _react.default.createElement(_StepLabel.default, null, "Step One");

describe('<StepButton />', function () {
  var shallow;
  var mount;
  var defaultProps = {
    orientation: 'horizontal'
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
  it('merges user className into the root node', function () {
    var wrapper = shallow(_react.default.createElement(_StepButton.default, (0, _extends2.default)({
      className: "foo"
    }, defaultProps), "Hello"));

    _chai.assert.include(wrapper.props().className, 'foo');
  });
  it('should render an ButtonBase with a StepLabel', function () {
    var wrapper = shallow(_react.default.createElement(_StepButton.default, defaultProps, "Step One"));

    _chai.assert.ok(wrapper.is(_ButtonBase.default), 'should be an ButtonBase');

    var stepLabel = wrapper.find(_StepLabel.default);

    _chai.assert.strictEqual(stepLabel.length, 1, 'should have a stepLabel');

    _chai.assert.strictEqual(stepLabel.props().children, 'Step One');
  });
  it('should pass props to StepLabel', function () {
    var wrapper = shallow(_react.default.createElement(_StepButton.default, (0, _extends2.default)({
      active: true,
      completed: true,
      disabled: true,
      label: "Step One"
    }, defaultProps), "Step One"));
    var stepLabel = wrapper.find(_StepLabel.default);

    _chai.assert.strictEqual(stepLabel.props().active, true, 'should be active');

    _chai.assert.strictEqual(stepLabel.props().completed, true, 'should be completed');

    _chai.assert.strictEqual(stepLabel.props().disabled, true, 'should be disabled');
  });
  it('should pass props to a provided StepLabel', function () {
    var wrapper = shallow(_react.default.createElement(_StepButton.default, (0, _extends2.default)({
      active: true,
      completed: true,
      disabled: true,
      label: "Step One"
    }, defaultProps), _ref));
    var stepLabel = wrapper.find(_StepLabel.default);

    _chai.assert.strictEqual(stepLabel.props().active, true, 'should be active');

    _chai.assert.strictEqual(stepLabel.props().completed, true, 'should be completed');

    _chai.assert.strictEqual(stepLabel.props().disabled, true, 'should be disabled');
  });
  it("should pass disabled prop to a StepLabel's Button", function () {
    var wrapper = shallow(_react.default.createElement(_StepButton.default, (0, _extends2.default)({
      disabled: true
    }, defaultProps), "Step One"));
    var stepLabel = wrapper.find(_ButtonBase.default);

    _chai.assert.strictEqual(stepLabel.props().disabled, true);
  });
  describe('event handlers', function () {
    describe('handleMouseEnter/Leave', function () {
      var handleMouseEnter = (0, _sinon.spy)();
      var handleMouseLeave = (0, _sinon.spy)();
      it('should fire event callbacks', function () {
        var wrapper = shallow(_react.default.createElement(_StepButton.default, (0, _extends2.default)({
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave
        }, defaultProps), "Step One"));
        wrapper.simulate('mouseEnter');

        _chai.assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');

        wrapper.simulate('mouseLeave');

        _chai.assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');

        _chai.assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');
      });
    });
    it('should bubble callbacks used internally', function () {
      var handleMouseEnter = (0, _sinon.spy)();
      var handleMouseLeave = (0, _sinon.spy)();
      var handleTouchStart = (0, _sinon.spy)();
      var wrapper = shallow(_react.default.createElement(_StepButton.default, (0, _extends2.default)({
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart
      }, defaultProps), "Step One"));
      wrapper.simulate('mouseEnter');

      _chai.assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');

      wrapper.simulate('mouseLeave');

      _chai.assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');

      _chai.assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');

      wrapper.simulate('touchStart');

      _chai.assert.strictEqual(handleMouseEnter.callCount, 1, 'should call handleMouseEnter once');

      _chai.assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');

      _chai.assert.strictEqual(handleTouchStart.callCount, 1, 'should call handleTouchStart once');

      wrapper.simulate('mouseEnter');
      wrapper.simulate('touchStart');

      _chai.assert.strictEqual(handleMouseEnter.callCount, 2, 'should call handleMouseEnter twice');

      _chai.assert.strictEqual(handleMouseLeave.callCount, 1, 'should call handleMouseLeave once');

      _chai.assert.strictEqual(handleTouchStart.callCount, 2, 'should call handleTouchStart twice');
    });
  });
});