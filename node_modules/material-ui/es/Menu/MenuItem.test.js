import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses, createMount } from '../test-utils';
import ListItem from '../List/ListItem';
import ListItemSecondaryAction from '../List/ListItemSecondaryAction';
import MenuItem from './MenuItem';

var _ref = React.createElement(MenuItem, null);

var _ref2 = React.createElement(MenuItem, null);

var _ref3 = React.createElement(MenuItem, {
  className: "woofMenuItem"
});

var _ref4 = React.createElement(MenuItem, {
  selected: true
});

var _ref5 = React.createElement(MenuItem, null);

var _ref6 = React.createElement(MenuItem, {
  role: "option",
  "aria-selected": false
});

var _ref7 = React.createElement(MenuItem, null);

var _ref8 = React.createElement(MenuItem, {
  component: "a"
});

var _ref9 = React.createElement(MenuItem, null, React.createElement(ListItemSecondaryAction, null, React.createElement("div", null)));

var _ref10 = React.createElement(MenuItem, {
  button: false
}, React.createElement(ListItemSecondaryAction, null, React.createElement("div", null)));

describe('<MenuItem />', () => {
  let shallow;
  let classes;
  let mount;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });
  it('should render a button ListItem with with ripple', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.type(), ListItem);
    assert.strictEqual(wrapper.props().button, true, 'should have the button prop');
    assert.strictEqual(wrapper.props().disableRipple, undefined, 'should have a ripple');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass('woofMenuItem'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the selected class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
  });
  it('should have a default role of menuitem', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.props().role, 'menuitem', 'should have the menuitem role');
  });
  it('should have a role of option', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.props().role, 'option', 'should have the option role');
  });
  it('should have a tabIndex of -1 by default', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.props().tabIndex, -1);
  });
  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onClick', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchStart'];
      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});
      const wrapper = shallow(React.createElement(MenuItem, handlers));
      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          persist: () => {}
        });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });
  describe('prop: component', () => {
    it('should be able to override the rendered component', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.props().component, 'a');
      assert.strictEqual(wrapper.props().disableRipple, undefined);
    });
  });
  describe('mount', () => {
    it('should not fail with a li > li error message', () => {
      const wrapper1 = mount(_ref9);
      assert.strictEqual(wrapper1.find('li').length, 1);
      const wrapper2 = mount(_ref10);
      assert.strictEqual(wrapper2.find('li').length, 1);
    });
  });
});