import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import { assert } from 'chai';
import PropTypes from 'prop-types';
import { spy, useFakeTimers } from 'sinon';
import rerender from 'test/utils/rerender';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import TouchRipple from './TouchRipple';
import ButtonBase from './ButtonBase';
const ButtonBaseNaked = unwrap(ButtonBase);

var _ref = React.createElement(ButtonBase, null);

var _ref2 = React.createElement(ButtonBase, null, "Hello");

var _ref3 = React.createElement(ButtonBase, {
  type: "submit"
}, "Hello");

var _ref4 = React.createElement(ButtonBase, {
  component: "span",
  role: "checkbox",
  "aria-checked": false
});

var _ref5 = React.createElement(ButtonBase, {
  "data-test": "hello"
}, "Hello");

var _ref6 = React.createElement(ButtonBase, {
  className: "test-class-name"
});

var _ref7 = React.createElement(ButtonBase, null, "Hello");

var _ref8 = React.createElement(ButtonBase, {
  component: "span"
}, "Hello");

var _ref9 = React.createElement(ButtonBase, {
  href: "http://google.com"
}, "Hello");

var _ref10 = React.createElement(ButtonBase, {
  component: "a"
}, "Hello");

var _ref11 = React.createElement(ButtonBase, {
  component: "span",
  href: "http://google.com"
}, "Hello");

var _ref12 = React.createElement(ButtonBase, null, "Hello");

var _ref13 = React.createElement(ButtonBase, {
  disabled: true
}, "Hello");

var _ref14 = React.createElement(ButtonBase, {
  disabled: true,
  component: "button"
}, "Hello");

var _ref15 = React.createElement(ButtonBase, null, "Hello");

var _ref16 = React.createElement(ButtonBase, {
  component: "span",
  disabled: true
}, "Hello");

var _ref17 = React.createElement(ButtonBase, null, "foo");

describe('<ButtonBase />', () => {
  let mount;
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true,
      disableLifecycleMethods: true
    });
    mount = createMount();
    classes = getClasses(_ref);
  });
  after(() => {
    mount.cleanUp();
  });
  describe('root node', () => {
    it('should render a button with type="button" by default', () => {
      const wrapper = shallow(_ref2);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.childAt(0).equals('Hello'), true, 'should say Hello');
      assert.strictEqual(wrapper.props().type, 'button');
    });
    it('should change the button type', () => {
      const wrapper = shallow(_ref3);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.props().type, 'submit');
    });
    it('should change the button component and add accessibility requirements', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().role, 'checkbox');
      assert.strictEqual(wrapper.props().tabIndex, '0');
    });
    it('should spread props on button', () => {
      const wrapper = shallow(_ref5);
      assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the button');
    });
    it('should render the custom className and the root class', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.hasClass('test-class-name'), true, 'should pass the test className');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
    it('should not apply role="button" if type="button"', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.props().type, 'button');
      assert.strictEqual(wrapper.props().role, undefined);
    });
    it('should change the button type to span and set role="button"', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().type, undefined);
      assert.strictEqual(wrapper.props().role, 'button');
    });
    it('should automatically change the button to an a element when href is provided', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.name(), 'a');
      assert.strictEqual(wrapper.props().href, 'http://google.com');
    });
    it('should change the button type to a and set role="button"', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.name(), 'a');
      assert.strictEqual(wrapper.props().type, undefined);
      assert.strictEqual(wrapper.props().role, 'button');
    });
    it('should not change the button to an a element', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().href, 'http://google.com');
    });
  });
  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onClick', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchStart'];
      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});
      const wrapper = shallow(React.createElement(ButtonBase, handlers));
      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          persist: () => {}
        });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });
  describe('ripple', () => {
    let wrapper;
    before(() => {
      wrapper = shallow(_ref12);
    });
    it('should be enabled by default', () => {
      const ripple = wrapper.find(TouchRipple);
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });
    it('should not have a focus ripple by default', () => {
      wrapper.instance().ripple = {
        pulsate: spy()
      };
      wrapper.setState({
        focusVisible: true
      });
      assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 0, 'should not call pulsate on the ripple');
    });
    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = {
        start: spy()
      };
      wrapper.simulate('mouseDown', {});
      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop the ripple when the mouse is released', () => {
      wrapper.instance().ripple = {
        stop: spy()
      };
      wrapper.simulate('mouseUp', {});
      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
    });
    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = {
        start: spy()
      };
      wrapper.simulate('mouseDown', {});
      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop the ripple when the button blurs', () => {
      wrapper.instance().ripple = {
        stop: spy()
      };
      wrapper.simulate('blur', {});
      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
    });
    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = {
        start: spy()
      };
      wrapper.simulate('mouseDown', {});
      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = {
        stop: spy()
      };
      wrapper.simulate('mouseLeave', {});
      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
    });
    it('should center the ripple', () => {
      assert.strictEqual(wrapper.find(TouchRipple).prop('center'), false, 'should not be centered by default');
      wrapper.setProps({
        centerRipple: true
      });
      assert.strictEqual(wrapper.find(TouchRipple).prop('center'), true, 'should be centered');
    });
  });
  describe('focusRipple', () => {
    let wrapper;
    before(() => {
      wrapper = mount(React.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        focusRipple: true
      }, "Hello"));
    });
    it('should be enabled by default', () => {
      const ripple = wrapper.find(TouchRipple);
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });
    it('should pulsate the ripple when focusVisible', () => {
      wrapper.instance().ripple = {
        pulsate: spy()
      };
      wrapper.setState({
        focusVisible: true
      });
      assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 1, 'should call pulsate on the ripple');
    });
    it('should not stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = {
        stop: spy()
      };
      wrapper.simulate('mouseLeave', {
        defaultPrevented: false,

        preventDefault() {
          this.defaultPrevented = true;
        }

      });
      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 0, 'should not call stop on the ripple');
    });
    it('should stop pulsate and start a ripple when the space button is pressed', () => {
      wrapper.instance().ripple = {
        stop: spy((event, cb) => cb()),
        start: spy()
      };
      wrapper.simulate('keyDown', {
        which: 32,
        keyCode: 32,
        key: ' ',
        persist: () => {}
      });
      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
      assert.strictEqual(wrapper.instance().ripple.start.callCount, 1, 'should call start on the ripple');
    });
    it('should stop and re-pulsate when space bar is released', () => {
      wrapper.instance().ripple = {
        stop: spy((event, cb) => cb()),
        pulsate: spy()
      };
      wrapper.simulate('keyUp', {
        which: 32,
        keyCode: 32,
        key: ' ',
        persist: () => {}
      });
      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
      assert.strictEqual(wrapper.instance().ripple.pulsate.callCount, 1, 'should call pulsate on the ripple');
    });
    it('should stop on blur and set focusVisible to false', () => {
      wrapper.instance().ripple = {
        stop: spy()
      };
      wrapper.simulate('blur', {});
      assert.strictEqual(wrapper.instance().ripple.stop.callCount, 1, 'should call stop on the ripple');
      assert.strictEqual(wrapper.state().focusVisible, false, 'should not be focusVisible');
    });
  });
  describe('mounted tab press listener', () => {
    let wrapper;
    let instance;
    let button;
    let clock;
    beforeEach(() => {
      clock = useFakeTimers();
      wrapper = mount(React.createElement(ButtonBaseNaked, {
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
      const event = new window.Event('keyup');
      event.which = keycode('tab');
      window.dispatchEvent(event);
    });
    afterEach(() => {
      clock.restore();
    });
    it('should detect the keyboard', () => {
      assert.strictEqual(wrapper.state().focusVisible, false, 'should not set keyboard focus before time has passed');
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, true, 'should listen for tab presses and set keyboard focus');
    });
    it('should ignore the keyboard after 1s', () => {
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, true, 'should think it is keyboard based');
      button.blur();
      assert.strictEqual(wrapper.state().focusVisible, false, 'should has lost the focus');
      button.focus();
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, true, 'should still think it is keyboard based');
      clock.tick(1e3);
      button.blur();
      assert.strictEqual(wrapper.state().focusVisible, false, 'should has lost the focus');
      button.focus();
      clock.tick(instance.focusVisibleCheckTime * instance.focusVisibleMaxCheckTimes);
      assert.strictEqual(wrapper.state().focusVisible, false, 'should stop think it is keyboard based');
    });
  });
  describe('prop: disabled', () => {
    it('should apply the right tabIndex', () => {
      const wrapper = shallow(_ref13);
      assert.strictEqual(wrapper.props().tabIndex, '-1', 'should not receive the focus');
    });
    it('should also apply it when using component', () => {
      const wrapper = shallow(_ref14);
      assert.strictEqual(wrapper.find('button').props().disabled, true);
    });
    it('should reset the focused state', () => {
      const wrapper = shallow(_ref15); // We simulate a focusVisible button that is getting disabled.

      wrapper.setState({
        focusVisible: true
      });
      wrapper.setProps({
        disabled: true
      });
      assert.strictEqual(wrapper.state().focusVisible, false);
    });
    it('should not apply disabled on a span', () => {
      const wrapper = shallow(_ref16);
      assert.strictEqual(wrapper.props().disabled, undefined);
    });
  });
  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      const Link = props => React.createElement("div", props);

      const wrapper = shallow(React.createElement(ButtonBase, {
        component: Link
      }, "Hello"));
      assert.strictEqual(wrapper.is(Link), true);
    });
  });
  describe('handleFocus()', () => {
    let clock;
    before(() => {
      clock = useFakeTimers();
    });
    after(() => {
      clock.restore();
    });
    it('when disabled should not persist event', () => {
      const wrapper = mount(React.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        disabled: true
      }, "Hello"));
      const instance = wrapper.instance();
      const eventMock = {
        persist: spy()
      };
      instance.handleFocus(eventMock);
      assert.strictEqual(eventMock.persist.callCount, 0);
    });
    it('onFocusVisibleHandler() should propogate call to onFocusVisible prop', () => {
      const eventMock = 'woofButtonBase';
      const onFocusVisibleSpy = spy();
      const wrapper = mount(React.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        component: "span",
        onFocusVisible: onFocusVisibleSpy
      }, "Hello"));
      const instance = wrapper.instance();
      instance.onFocusVisibleHandler(eventMock);
      assert.strictEqual(onFocusVisibleSpy.callCount, 1);
      assert.strictEqual(onFocusVisibleSpy.calledWith(eventMock), true);
    });
    it('should work with a functionnal component', () => {
      const MyLink = props => React.createElement("a", _extends({
        href: "/foo"
      }, props), "bar");

      const wrapper = mount(React.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        component: MyLink
      }, "Hello"));
      const instance = wrapper.instance();
      wrapper.simulate('focus');
      clock.tick(instance.focusVisibleCheckTime);
    });
  });
  describe('handleKeyDown()', () => {
    let wrapper;
    let instance;
    let event;
    describe('avoids multiple keydown presses', () => {
      it('should work', () => {
        wrapper = mount(React.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));
        wrapper.setProps({
          focusRipple: true
        });
        wrapper.setState({
          focusVisible: true
        });
        const eventPersistSpy = spy();
        event = {
          persist: eventPersistSpy,
          keyCode: keycode('space')
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.ripple = {
          stop: spy()
        };
        instance.handleKeyDown(event);
        assert.strictEqual(instance.keyDown, true, 'should mark keydown as true');
        assert.strictEqual(event.persist.callCount, 1, 'should call event.persist exactly once');
        assert.strictEqual(instance.ripple.stop.callCount, 1, 'should call stop exactly once');
        assert.strictEqual(instance.ripple.stop.calledWith(event), true, 'should call stop with event');
      });
    });
    describe('prop: onKeyDown', () => {
      it('should work', () => {
        wrapper = mount(React.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));
        const onKeyDownSpy = spy();
        wrapper.setProps({
          onKeyDown: onKeyDownSpy
        });
        const eventPersistSpy = spy();
        event = {
          persist: eventPersistSpy,
          keyCode: undefined
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);
        assert.strictEqual(instance.keyDown, false, 'should not change keydown');
        assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');
        assert.strictEqual(onKeyDownSpy.callCount, 1, 'should call onKeyDown');
        assert.strictEqual(onKeyDownSpy.calledWith(event), true, 'should call onKeyDown with event');
      });
    });
    describe('Keyboard accessibility for non interactive elements', () => {
      it('should work', () => {
        wrapper = mount(React.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));
        const onClickSpy = spy();
        wrapper.setProps({
          onClick: onClickSpy,
          component: 'div'
        });
        const eventTargetMock = 'woofButtonBase';
        event = {
          persist: spy(),
          preventDefault: spy(),
          keyCode: keycode('space'),
          target: eventTargetMock,
          currentTarget: eventTargetMock
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);
        assert.strictEqual(instance.keyDown, false, 'should not change keydown');
        assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');
        assert.strictEqual(event.preventDefault.callCount, 1, 'should call event.preventDefault');
        assert.strictEqual(onClickSpy.callCount, 1, 'should call onClick');
        assert.strictEqual(onClickSpy.calledWith(event), true, 'should call onClick with event');
      });
    });
    describe('prop: disableRipple', () => {
      it('should work', () => {
        wrapper = mount(React.createElement(ButtonBaseNaked, {
          theme: {},
          classes: {}
        }, "Hello"));
        assert.strictEqual(wrapper.find(TouchRipple).length, 1);
        const onKeyDownSpy = spy();
        wrapper.setProps({
          onKeyDown: onKeyDownSpy,
          disableRipple: true,
          focusRipple: true
        });
        wrapper.setState({
          focusVisible: true
        });
        assert.strictEqual(wrapper.find(TouchRipple).length, 0);
        const eventPersistSpy = spy();
        event = {
          persist: eventPersistSpy,
          keyCode: keycode('space')
        };
        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);
        assert.strictEqual(instance.keyDown, false, 'should not change keydown');
        assert.strictEqual(event.persist.callCount, 0, 'should not call event.persist');
        assert.strictEqual(onKeyDownSpy.callCount, 1, 'should call onKeyDown');
        assert.strictEqual(onKeyDownSpy.calledWith(event), true, 'should call onKeyDown with event');
      });
    });
  });
  describe('prop: ref', () => {
    it('should be able to get a ref of the root element', () => {
      function ButtonBaseRef(props) {
        return React.createElement(ButtonBase, {
          ref: props.rootRef
        });
      }

      ButtonBaseRef.propTypes = process.env.NODE_ENV !== "production" ? {
        rootRef: PropTypes.func.isRequired
      } : {};
      const ref = spy();
      mount(React.createElement(ButtonBaseRef, {
        rootRef: ref
      }, "Hello"));
      assert.strictEqual(ref.callCount, 1, 'should call the ref function');
      assert.strictEqual(ReactDOM.findDOMNode(ref.args[0][0]).type, 'button');
    });
  });
  describe('prop: action', () => {
    it('should be able to focus visible the button', () => {
      let buttonActions = {};
      const wrapper = mount(React.createElement(ButtonBaseNaked, {
        theme: {},
        classes: {},
        action: actions => {
          buttonActions = actions;
        },
        focusVisibleClassName: "focusVisible"
      }, "Hello"));
      assert.strictEqual(typeof buttonActions.focusVisible === 'function', true, 'Should be a function.');
      buttonActions.focusVisible();
      wrapper.update();
      assert.strictEqual(wrapper.instance().button, document.activeElement);
      assert.strictEqual(wrapper.find('.focusVisible').length, 1);
    });
  });
  describe('rerender', () => {
    beforeEach(() => {
      rerender.spy();
    });
    afterEach(() => {
      rerender.reset();
    });
    it('should not rerender the TouchRipple', () => {
      const wrapper = mount(_ref17);
      wrapper.setProps({
        children: 'bar'
      });
      assert.strictEqual(rerender.updates.length, 1);
    });
  });
});