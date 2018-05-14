"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _keycode = _interopRequireDefault(require("keycode"));

var _chai = require("chai");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _sinon = require("sinon");

var _rerender = _interopRequireDefault(require("test/utils/rerender"));

var _testUtils = require("../test-utils");

var _TouchRipple = _interopRequireDefault(require("./TouchRipple"));

var _ButtonBase = _interopRequireDefault(require("./ButtonBase"));

var ButtonBaseNaked = (0, _testUtils.unwrap)(_ButtonBase.default);

var _ref = _react.default.createElement(_ButtonBase.default, null);

var _ref2 = _react.default.createElement(_ButtonBase.default, null, "Hello");

var _ref3 = _react.default.createElement(_ButtonBase.default, {
  type: "submit"
}, "Hello");

var _ref4 = _react.default.createElement(_ButtonBase.default, {
  component: "span",
  role: "checkbox",
  "aria-checked": false
});

var _ref5 = _react.default.createElement(_ButtonBase.default, {
  "data-test": "hello"
}, "Hello");

var _ref6 = _react.default.createElement(_ButtonBase.default, {
  className: "test-class-name"
});

var _ref7 = _react.default.createElement(_ButtonBase.default, null, "Hello");

var _ref8 = _react.default.createElement(_ButtonBase.default, {
  component: "span"
}, "Hello");

var _ref9 = _react.default.createElement(_ButtonBase.default, {
  href: "http://google.com"
}, "Hello");

var _ref10 = _react.default.createElement(_ButtonBase.default, {
  component: "a"
}, "Hello");

var _ref11 = _react.default.createElement(_ButtonBase.default, {
  component: "span",
  href: "http://google.com"
}, "Hello");

var _ref12 = _react.default.createElement(_ButtonBase.default, null, "Hello");

var _ref13 = _react.default.createElement(_ButtonBase.default, {
  disabled: true
}, "Hello");

var _ref14 = _react.default.createElement(_ButtonBase.default, {
  disabled: true,
  component: "button"
}, "Hello");

var _ref15 = _react.default.createElement(_ButtonBase.default, null, "Hello");

var _ref16 = _react.default.createElement(_ButtonBase.default, {
  component: "span",
  disabled: true
}, "Hello");

var _ref17 = _react.default.createElement(_ButtonBase.default, null, "foo");

describe('<ButtonBase />', function () {
  var mount;
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true,
      disableLifecycleMethods: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref);
  });
  after(function () {
    mount.cleanUp();
  });
  describe('root node', function () {
    it('should render a button with type="button" by default', function () {
      var wrapper = shallow(_ref2);

      _chai.assert.strictEqual(wrapper.name(), 'button');

      _chai.assert.strictEqual(wrapper.childAt(0).equals('Hello'), true, 'should say Hello');

      _chai.assert.strictEqual(wrapper.props().type, 'button');
    });
    it('should change the button type', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.name(), 'button');

      _chai.assert.strictEqual(wrapper.props().type, 'submit');
    });
    it('should change the button component and add accessibility requirements', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.name(), 'span');

      _chai.assert.strictEqual(wrapper.props().role, 'checkbox');

      _chai.assert.strictEqual(wrapper.props().tabIndex, '0');
    });
    it('should spread props on button', function () {
      var wrapper = shallow(_ref5);

      _chai.assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the button');
    });
    it('should render the custom className and the root class', function () {
      var wrapper = shallow(_ref6);

      _chai.assert.strictEqual(wrapper.hasClass('test-class-name'), true, 'should pass the test className');

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
    it('should not apply role="button" if type="button"', function () {
      var wrapper = shallow(_ref7);

      _chai.assert.strictEqual(wrapper.name(), 'button');

      _chai.assert.strictEqual(wrapper.props().type, 'button');

      _chai.assert.strictEqual(wrapper.props().role, undefined);
    });
    it('should change the button type to span and set role="button"', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.name(), 'span');

      _chai.assert.strictEqual(wrapper.props().type, undefined);

      _chai.assert.strictEqual(wrapper.props().role, 'button');
    });
    it('should automatically change the button to an a element when href is provided', function () {
      var wrapper = shallow(_ref9);

      _chai.assert.strictEqual(wrapper.name(), 'a');

      _chai.assert.strictEqual(wrapper.props().href, 'http://google.com');
    });
    it('should change the button type to a and set role="button"', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.name(), 'a');

      _chai.assert.strictEqual(wrapper.props().type, undefined);

      _chai.assert.strictEqual(wrapper.props().role, 'button');
    });
    it('should not change the button to an a element', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.name(), 'span');

      _chai.assert.strictEqual(wrapper.props().href, 'http://google.com');
    });
  });
  describe('event callbacks', function () {
    it('should fire event callbacks', function () {
      var events = ['onClick', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchStart'];
      var handlers = events.reduce(function (result, n) {
        result[n] = (0, _sinon.spy)();
        return result;
      }, {});
      var wrapper = shallow(_react.default.createElement(_ButtonBase.default, handlers));
      events.forEach(function (n) {
        var event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          persist: function persist() {}
        });

        _chai.assert.strictEqual(handlers[n].callCount, 1, "should have called the ".concat(n, " handler"));
      });
    });
  });
  describe('ripple', function () {
    var wrapper;
    before(function () {
      wrapper = shallow(_ref12);
    });
    it('should be enabled by default', function () {
      var ripple = wrapper.find(_TouchRipple.default);

      _chai.assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });
    it('should not have a focus ripple by default', function () {
      wrapper.instance().ripple = {
        pulsate: (0, _sinon.spy)()
      };
      wrapper.setState({
        focusVisible: true
      });

      _chai.assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 0, 'should not call pulsate on the ripple');
    });
    it('should start the ripple when the mouse is pressed', function () {
      wrapper.instance().ripple = {
        start: (0, _sinon.spy)()
      };
      wrapper.simulate('mouseDown', {});

      _chai.assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop the ripple when the mouse is released', function () {
      wrapper.instance().ripple = {
        stop: (0, _sinon.spy)()
      };
      wrapper.simulate('mouseUp', {});

      _chai.assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
    });
    it('should start the ripple when the mouse is pressed', function () {
      wrapper.instance().ripple = {
        start: (0, _sinon.spy)()
      };
      wrapper.simulate('mouseDown', {});

      _chai.assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop the ripple when the button blurs', function () {
      wrapper.instance().ripple = {
        stop: (0, _sinon.spy)()
      };
      wrapper.simulate('blur', {});

      _chai.assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
    });
    it('should start the ripple when the mouse is pressed', function () {
      wrapper.instance().ripple = {
        start: (0, _sinon.spy)()
      };
      wrapper.simulate('mouseDown', {});

      _chai.assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop the ripple when the mouse leaves', function () {
      wrapper.instance().ripple = {
        stop: (0, _sinon.spy)()
      };
      wrapper.simulate('mouseLeave', {});

      _chai.assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
    });
    it('should center the ripple', function () {
      _chai.assert.strictEqual(wrapper.find(_TouchRipple.default).prop('center'), false, 'should not be centered by default');

      wrapper.setProps({
        centerRipple: true
      });

      _chai.assert.strictEqual(wrapper.find(_TouchRipple.default).prop('center'), true, 'should be centered');
    });
  });
  describe('focusRipple', function () {
    var wrapper;
    before(function () {
      wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        focusRipple: true
      }, "Hello"));
    });
    it('should be enabled by default', function () {
      var ripple = wrapper.find(_TouchRipple.default);

      _chai.assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });
    it('should pulsate the ripple when focusVisible', function () {
      wrapper.instance().ripple = {
        pulsate: (0, _sinon.spy)()
      };
      wrapper.setState({
        focusVisible: true
      });

      _chai.assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 1, 'should call pulsate on the ripple');
    });
    it('should not stop the ripple when the mouse leaves', function () {
      wrapper.instance().ripple = {
        stop: (0, _sinon.spy)()
      };
      wrapper.simulate('mouseLeave', {
        defaultPrevented: false,
        preventDefault: function preventDefault() {
          this.defaultPrevented = true;
        }
      });

      _chai.assert.strictEqual(wrapper.instance().ripple.stop.callCount, 0, 'should not call stop on the ripple');
    });
    it('should stop pulsate and start a ripple when the space button is pressed', function () {
      wrapper.instance().ripple = {
        stop: (0, _sinon.spy)(function (event, cb) {
          return cb();
        }),
        start: (0, _sinon.spy)()
      };
      wrapper.simulate('keyDown', {
        which: 32,
        keyCode: 32,
        key: ' ',
        persist: function persist() {}
      });

      _chai.assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');

      _chai.assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop and re-pulsate when space bar is released', function () {
      wrapper.instance().ripple = {
        stop: (0, _sinon.spy)(function (event, cb) {
          return cb();
        }),
        pulsate: (0, _sinon.spy)()
      };
      wrapper.simulate('keyUp', {
        which: 32,
        keyCode: 32,
        key: ' ',
        persist: function persist() {}
      });

      _chai.assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');

      _chai.assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 1, 'should call pulsate on the ripple');
    });
    it('should stop on blur and set focusVisible to false', function () {
      wrapper.instance().ripple = {
        stop: (0, _sinon.spy)()
      };
      wrapper.simulate('blur', {});

      _chai.assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');

      _chai.assert.strictEqual(wrapper.state().focusVisible, false, 'should not be focusVisible');
    });
  });
  describe('mounted tab press listener', function () {
    var wrapper;
    var instance;
    var button;
    var clock;
    beforeEach(function () {
      clock = (0, _sinon.useFakeTimers)();
      wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        id: "test-button"
      }, "Hello"));
      instance = wrapper.instance();
      button = document.getElementById('test-button');

      if (!button) {
        throw new Error('missing button');
      }

      button.focus();
      var event = new window.Event('keyup');
      event.which = (0, _keycode.default)('tab');
      window.dispatchEvent(event);
    });
    afterEach(function () {
      clock.restore();
    });
    it('should detect the keyboard', function () {
      _chai.assert.strictEqual(wrapper.state().focusVisible, false, 'should not set keyboard focus before time has passed');

      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);

      _chai.assert.strictEqual(wrapper.state().focusVisible, true, 'should listen for tab presses and set keyboard focus');
    });
    it('should ignore the keyboard after 1s', function () {
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);

      _chai.assert.strictEqual(wrapper.state().focusVisible, true, 'should think it is keyboard based');

      button.blur();

      _chai.assert.strictEqual(wrapper.state().focusVisible, false, 'should has lost the focus');

      button.focus();
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);

      _chai.assert.strictEqual(wrapper.state().focusVisible, true, 'should still think it is keyboard based');

      clock.tick(1e3);
      button.blur();

      _chai.assert.strictEqual(wrapper.state().focusVisible, false, 'should has lost the focus');

      button.focus();
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);

      _chai.assert.strictEqual(wrapper.state().focusVisible, false, 'should stop think it is keyboard based');
    });
  });
  describe('prop: disabled', function () {
    it('should apply the right tabIndex', function () {
      var wrapper = shallow(_ref13);

      _chai.assert.strictEqual(wrapper.props().tabIndex, '-1', 'should not receive the focus');
    });
    it('should also apply it when using component', function () {
      var wrapper = shallow(_ref14);

      _chai.assert.strictEqual(wrapper.find('button').props().disabled, true);
    });
    it('should reset the focused state', function () {
      var wrapper = shallow(_ref15); // We simulate a focusVisible button that is getting disabled.

      wrapper.setState({
        focusVisible: true
      });
      wrapper.setProps({
        disabled: true
      });

      _chai.assert.strictEqual(wrapper.state().focusVisible, false);
    });
    it('should not apply disabled on a span', function () {
      var wrapper = shallow(_ref16);

      _chai.assert.strictEqual(wrapper.props().disabled, undefined);
    });
  });
  describe('prop: component', function () {
    it('should allow to use a link component', function () {
      var Link = function Link(props) {
        return _react.default.createElement("div", props);
      };

      var wrapper = shallow(_react.default.createElement(_ButtonBase.default, {
        component: Link
      }, "Hello"));

      _chai.assert.strictEqual(wrapper.is(Link), true);
    });
  });
  describe('handleFocus()', function () {
    var clock;
    before(function () {
      clock = (0, _sinon.useFakeTimers)();
    });
    after(function () {
      clock.restore();
    });
    it('when disabled should not persist event', function () {
      var wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        disabled: true
      }, "Hello"));
      var instance = wrapper.instance();
      var eventMock = {
        persist: (0, _sinon.spy)()
      };
      instance.handleFocus(eventMock);

      _chai.assert.strictEqual(eventMock.persist.callCount, 0);
    });
    it('onFocusVisibleHandler() should propogate call to onFocusVisible prop', function () {
      var eventMock = 'woofButtonBase';
      var onFocusVisibleSpy = (0, _sinon.spy)();
      var wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        component: "span",
        onFocusVisible: onFocusVisibleSpy
      }, "Hello"));
      var instance = wrapper.instance();
      instance.onFocusVisibleHandler(eventMock);

      _chai.assert.strictEqual(onFocusVisibleSpy.callCount, 1);

      _chai.assert.strictEqual(onFocusVisibleSpy.calledWith(eventMock), true);
    });
    it('should work with a functionnal component', function () {
      var MyLink = function MyLink(props) {
        return _react.default.createElement("a", (0, _extends2.default)({
          href: "/foo"
        }, props), "bar");
      };

      var wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        component: MyLink
      }, "Hello"));
      var instance = wrapper.instance();
      wrapper.simulate('focus');
      clock.tick(instance.focusVisibleCheckTime);
    });
  });
  describe('handleKeyDown()', function () {
    var wrapper;
    var instance;
    var event;
    describe('avoids multiple keydown presses', function () {
      it('should work', function () {
        wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));
        wrapper.setProps({
          focusRipple: true
        });
        wrapper.setState({
          focusVisible: true
        });
        var eventPersistSpy = (0, _sinon.spy)();
        event = {
          persist: eventPersistSpy,
          keyCode: (0, _keycode.default)('space')
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.ripple = {
          stop: (0, _sinon.spy)()
        };
        instance.handleKeyDown(event);

        _chai.assert.strictEqual(instance.keyDown, true, 'should mark keydown as true');

        _chai.assert.strictEqual(event.persist.callCount, 1, 'should call event.persist exactly once');

        _chai.assert.strictEqual(instance.ripple.stop.callCount, 1, 'should call stop exactly once');

        _chai.assert.strictEqual(instance.ripple.stop.calledWith(event), true, 'should call stop with event');
      });
    });
    describe('prop: onKeyDown', function () {
      it('should work', function () {
        wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));
        var onKeyDownSpy = (0, _sinon.spy)();
        wrapper.setProps({
          onKeyDown: onKeyDownSpy
        });
        var eventPersistSpy = (0, _sinon.spy)();
        event = {
          persist: eventPersistSpy,
          keyCode: undefined
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        _chai.assert.strictEqual(instance.keyDown, false, 'should not change keydown');

        _chai.assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');

        _chai.assert.strictEqual(onKeyDownSpy.callCount, 1, 'should call onKeyDown');

        _chai.assert.strictEqual(onKeyDownSpy.calledWith(event), true, 'should call onKeyDown with event');
      });
    });
    describe('Keyboard accessibility for non interactive elements', function () {
      it('should work', function () {
        wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));
        var onClickSpy = (0, _sinon.spy)();
        wrapper.setProps({
          onClick: onClickSpy,
          component: 'div'
        });
        var eventTargetMock = 'woofButtonBase';
        event = {
          persist: (0, _sinon.spy)(),
          preventDefault: (0, _sinon.spy)(),
          keyCode: (0, _keycode.default)('space'),
          target: eventTargetMock,
          currentTarget: eventTargetMock
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        _chai.assert.strictEqual(instance.keyDown, false, 'should not change keydown');

        _chai.assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');

        _chai.assert.strictEqual(event.preventDefault.callCount, 1, 'should call event.preventDefault');

        _chai.assert.strictEqual(onClickSpy.callCount, 1, 'should call onClick');

        _chai.assert.strictEqual(onClickSpy.calledWith(event), true, 'should call onClick with event');
      });
    });
    describe('prop: disableRipple', function () {
      it('should work', function () {
        wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));

        _chai.assert.strictEqual(wrapper.find(_TouchRipple.default).length, 1);

        var onKeyDownSpy = (0, _sinon.spy)();
        wrapper.setProps({
          onKeyDown: onKeyDownSpy,
          disableRipple: true,
          focusRipple: true
        });
        wrapper.setState({
          focusVisible: true
        });

        _chai.assert.strictEqual(wrapper.find(_TouchRipple.default).length, 0);

        var eventPersistSpy = (0, _sinon.spy)();
        event = {
          persist: eventPersistSpy,
          keyCode: (0, _keycode.default)('space')
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);

        _chai.assert.strictEqual(instance.keyDown, false, 'should not change keydown');

        _chai.assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');

        _chai.assert.strictEqual(onKeyDownSpy.callCount, 1, 'should call onKeyDown');

        _chai.assert.strictEqual(onKeyDownSpy.calledWith(event), true, 'should call onKeyDown with event');
      });
    });
  });
  describe('prop: ref', function () {
    it('should be able to get a ref of the root element', function () {
      function ButtonBaseRef(props) {
        return _react.default.createElement(_ButtonBase.default, {
          ref: props.rootRef
        });
      }

      ButtonBaseRef.propTypes = process.env.NODE_ENV !== "production" ? {
        rootRef: _propTypes.default.func.isRequired
      } : {};
      var ref = (0, _sinon.spy)();
      mount(_react.default.createElement(ButtonBaseRef, {
        rootRef: ref
      }, "Hello"));

      _chai.assert.strictEqual(ref.callCount, 1, 'should call the ref function');

      _chai.assert.strictEqual(_reactDom.default.findDOMNode(ref.args[0][0]).type, 'button');
    });
  });
  describe('prop: action', function () {
    it('should be able to focus visible the button', function () {
      var buttonActions = {};
      var wrapper = mount(_react.default.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        action: function action(actions) {
          buttonActions = actions;
        },
        focusVisibleClassName: "focusVisible"
      }, "Hello"));

      _chai.assert.strictEqual(typeof buttonActions.focusVisible === 'function', true, 'Should be a function.');

      buttonActions.focusVisible();
      wrapper.update();

      _chai.assert.strictEqual(wrapper.instance().button, document.activeElement);

      _chai.assert.strictEqual(wrapper.find('.focusVisible').length, 1);
    });
  });
  describe('rerender', function () {
    beforeEach(function () {
      _rerender.default.spy();
    });
    afterEach(function () {
      _rerender.default.reset();
    });
    it('should not rerender the TouchRipple', function () {
      var wrapper = mount(_ref17);
      wrapper.setProps({
        children: 'bar'
      });

      _chai.assert.strictEqual(_rerender.default.updates.length, 1);
    });
  });
});