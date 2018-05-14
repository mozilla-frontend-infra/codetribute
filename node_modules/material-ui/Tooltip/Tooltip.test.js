"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _reactPopper = require("react-popper");

var _enzyme = require("enzyme");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _testUtils = require("../test-utils");

var _createMuiTheme = _interopRequireDefault(require("../styles/createMuiTheme"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

/* eslint-disable no-underscore-dangle */
function persist() {} // Remove the style from the DOM element.
// eslint-disable-next-line react/prop-types


var Hack = function Hack(_ref) {
  var style = _ref.style,
      innerRef = _ref.innerRef,
      other = (0, _objectWithoutProperties2.default)(_ref, ["style", "innerRef"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    ref: innerRef
  }, other));
};

function getTargetChildren(wrapper) {
  return new _enzyme.ShallowWrapper(wrapper.find(_reactPopper.Target).props().children({}).props.children, wrapper);
}

function getPopperChildren(wrapper) {
  return new _enzyme.ShallowWrapper(wrapper.find(_reactPopper.Popper).props().children({
    popperProps: {
      style: {}
    },
    restProps: {}
  }), null);
}

var _ref2 = _react.default.createElement(_Tooltip.default, {
  title: "Hello World"
}, _react.default.createElement("span", null, "Hello World"));

var _ref3 = _react.default.createElement(_Tooltip.default, {
  title: "Hello World"
}, _react.default.createElement("span", null, "Hello World"));

var _ref4 = _react.default.createElement(_Tooltip.default, {
  className: "woofTooltip",
  title: "Hello World"
}, _react.default.createElement("span", null, "Hello World"));

var _ref5 = _react.default.createElement(_Tooltip.default, {
  open: true,
  title: ""
}, _react.default.createElement("span", null, "Hello World"));

var _ref6 = _react.default.createElement(_Tooltip.default, {
  placement: "top",
  title: "Hello World"
}, _react.default.createElement("span", null, "Hello World"));

var _ref7 = _react.default.createElement("span", null, "Hello World");

var _ref8 = _react.default.createElement(_Tooltip.default, {
  placement: "top",
  title: "Hello World"
}, _react.default.createElement("button", null, "Hello World"));

var _ref9 = _react.default.createElement("button", null, "Hello World");

var _ref10 = _react.default.createElement(_Tooltip.default, {
  title: "Hello World"
}, _react.default.createElement("button", null, "Hello World"));

var _ref11 = _react.default.createElement(_Tooltip.default, {
  title: "Hello World"
}, _react.default.createElement("button", null, "Hello World"));

var _ref12 = _react.default.createElement("button", null, "Hello World");

var _ref13 = _react.default.createElement(_Tooltip.default, {
  enterDelay: 111,
  title: "Hello World"
}, _react.default.createElement("button", null, "Hello World"));

var _ref14 = _react.default.createElement(_Tooltip.default, {
  leaveDelay: 111,
  title: "Hello World"
}, _react.default.createElement("button", null, "Hello World"));

var _ref16 = _react.default.createElement("div", null, "Foo");

var _ref17 = _react.default.createElement(_Tooltip.default, {
  title: "Hello World"
}, _react.default.createElement("button", {
  disabled: true
}, "Hello World"));

describe('<Tooltip />', function () {
  var shallow;
  var mount;
  var classes;
  var TooltipNaked = (0, _testUtils.unwrap)(_Tooltip.default);
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref2);
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a Manager', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'Manager');

    _chai.assert.strictEqual(wrapper.childAt(0).name(), 'EventListener');
  });
  it('should render with the user, root and tooltip classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofTooltip'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    var popperChildren = getPopperChildren(wrapper);

    _chai.assert.strictEqual(popperChildren.childAt(0).hasClass(classes.tooltip), true);
  });
  describe('prop: title', function () {
    it('should not display if the title is an empty string', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.find(_reactPopper.Popper).hasClass(classes.open), false);
    });
  });
  describe('prop: placement', function () {
    it('should have top placement', function () {
      var wrapper = shallow(_ref6);
      var popperChildren = getPopperChildren(wrapper);

      _chai.assert.strictEqual(popperChildren.childAt(0).hasClass(classes.tooltip), true);

      wrapper.childAt(0).simulate('click');

      _chai.assert.strictEqual(popperChildren.childAt(0).hasClass(classes.tooltipPlacementTop), true);
    });
    var theme = (0, _createMuiTheme.default)({
      direction: 'rtl'
    });
    [{
      in: 'bottom-end',
      out: 'bottom-start'
    }, {
      in: 'bottom-start',
      out: 'bottom-end'
    }, {
      in: 'top-end',
      out: 'top-start'
    }, {
      in: 'top-start',
      out: 'top-end'
    }, {
      in: 'top',
      out: 'top'
    }].forEach(function (test) {
      it("should flip ".concat(test.in, " when direction=rtl is used"), function () {
        var wrapper = shallow(_react.default.createElement(_Tooltip.default, {
          theme: theme,
          placement: test.in,
          title: "Hello World"
        }, _ref7));

        _chai.assert.strictEqual(wrapper.find(_reactPopper.Popper).props().placement, test.out);
      });
    });
  });
  it('should respond to external events', function () {
    var wrapper = shallow(_ref8);
    var children = getTargetChildren(wrapper);

    _chai.assert.strictEqual(wrapper.state().open, false);

    children.simulate('mouseOver', {});

    _chai.assert.strictEqual(wrapper.state().open, true);

    children.simulate('blur', {});

    _chai.assert.strictEqual(wrapper.state().open, false);
  });
  it('should be controllable', function () {
    var handleRequestOpen = (0, _sinon.spy)();
    var handleClose = (0, _sinon.spy)();
    var wrapper = shallow(_react.default.createElement(_Tooltip.default, {
      placement: "top",
      title: "Hello World",
      open: true,
      onOpen: handleRequestOpen,
      onClose: handleClose
    }, _ref9));
    var children = getTargetChildren(wrapper);

    _chai.assert.strictEqual(handleRequestOpen.callCount, 0);

    _chai.assert.strictEqual(handleClose.callCount, 0);

    children.simulate('mouseOver', {
      type: 'mouseover'
    });

    _chai.assert.strictEqual(handleRequestOpen.callCount, 1);

    _chai.assert.strictEqual(handleClose.callCount, 0);

    children.simulate('blur', {
      type: 'blur'
    });

    _chai.assert.strictEqual(handleRequestOpen.callCount, 1);

    _chai.assert.strictEqual(handleClose.callCount, 1);
  });
  describe('touch screen', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should not respond to quick events', function () {
      var wrapper = shallow(_ref10);
      var children = getTargetChildren(wrapper);
      children.simulate('touchStart', {
        type: 'touchstart',
        persist: persist
      });
      children.simulate('touchEnd', {
        type: 'touchend',
        persist: persist
      });
      children.simulate('focus', {
        type: 'focus'
      });
      children.simulate('mouseover', {
        type: 'mouseover'
      });

      _chai.assert.strictEqual(wrapper.state().open, false);
    });
    it('should open on long press', function () {
      var wrapper = shallow(_ref11);
      var children = getTargetChildren(wrapper);
      children.simulate('touchStart', {
        type: 'touchstart',
        persist: persist
      });
      children.simulate('focus', {
        type: 'focus'
      });
      children.simulate('mouseover', {
        type: 'mouseover'
      });
      clock.tick(1e3);

      _chai.assert.strictEqual(wrapper.state().open, true);

      children.simulate('touchEnd', {
        type: 'touchend',
        persist: persist
      });
      clock.tick(1500);

      _chai.assert.strictEqual(wrapper.state().open, false);
    });
  });
  describe('mount', function () {
    it('should mount without any issue', function () {
      mount(_react.default.createElement(_Tooltip.default, {
        title: "Hello World",
        PopperProps: {
          component: Hack
        }
      }, _ref12));
    });
  });
  describe('prop: delay', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('should take the enterDelay into account', function () {
      var wrapper = shallow(_ref13);
      var children = getTargetChildren(wrapper);
      children.simulate('focus', {
        type: 'focus',
        persist: persist
      });

      _chai.assert.strictEqual(wrapper.state().open, false);

      clock.tick(111);

      _chai.assert.strictEqual(wrapper.state().open, true);
    });
    it('should take the leaveDelay into account', function () {
      var wrapper = shallow(_ref14);
      var children = getTargetChildren(wrapper);
      children.simulate('focus', {
        type: 'focus'
      });

      _chai.assert.strictEqual(wrapper.state().open, true);

      children.simulate('blur', {
        type: 'blur',
        persist: persist
      });

      _chai.assert.strictEqual(wrapper.state().open, true);

      clock.tick(111);

      _chai.assert.strictEqual(wrapper.state().open, false);
    });
  });
  describe('prop: overrides', function () {
    ['onTouchStart', 'onTouchEnd', 'onMouseOver', 'onMouseLeave', 'onFocus', 'onBlur'].forEach(function (name) {
      it("should be transparent for the ".concat(name, " event"), function () {
        var handler = (0, _sinon.spy)();
        var wrapper = shallow(_react.default.createElement(_Tooltip.default, {
          title: "Hello World"
        }, _react.default.createElement("button", (0, _defineProperty2.default)({}, name, handler), "Hello World")));
        var children = getTargetChildren(wrapper);
        var type = name.slice(2).toLowerCase();
        children.simulate(type, {
          type: type,
          persist: persist
        });

        _chai.assert.strictEqual(handler.callCount, 1);
      });
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
      var handleUpdate = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement(TooltipNaked, {
        theme: {},
        classes: {},
        title: "foo",
        PopperProps: {
          component: Hack
        }
      }, _ref16));
      var instance = wrapper.instance();
      instance.handleResize();

      _chai.assert.strictEqual(handleUpdate.callCount, 0);

      clock.tick(1);
      instance.popper._popper.scheduleUpdate = handleUpdate;
      clock.tick(165);

      _chai.assert.strictEqual(handleUpdate.callCount, 1);
    });
  });
  describe('disabled button warning', function () {
    before(function () {
      _consoleErrorMock.default.spy();
    });
    after(function () {
      _consoleErrorMock.default.reset();
    });
    it('should raise a warning when we can listen to events', function () {
      mount(_ref17);

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1, 'should call console.error');

      _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Material-UI: you are providing a disabled `button` child to the Tooltip component/);
    });
  });
});