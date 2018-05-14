import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses } from '../test-utils';
import Icon from '../Icon';
import BottomNavigationAction from './BottomNavigationAction';

var _ref = React.createElement(Icon, null, "restore");

var _ref2 = React.createElement(BottomNavigationAction, null);

var _ref11 = React.createElement(BottomNavigationAction, null);

describe('<BottomNavigationAction />', () => {
  let shallow;
  let classes;
  const icon = _ref;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref2);
  });

  var _ref3 = React.createElement(BottomNavigationAction, {
    icon: icon
  });

  it('should render a ButtonBase', () => {
    shallow(_ref3);
  });

  var _ref4 = React.createElement(BottomNavigationAction, {
    icon: icon
  });

  it('should render with the root class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref5 = React.createElement(BottomNavigationAction, {
    className: "woofBottomNavigationAction",
    icon: icon
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass('woofBottomNavigationAction'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref6 = React.createElement(BottomNavigationAction, {
    icon: icon,
    selected: true
  });

  it('should render with the selected and root classes', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref7 = React.createElement(BottomNavigationAction, {
    icon: icon,
    showLabel: false
  });

  it('should render with the selectedIconOnly and root classes', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.hasClass(classes.iconOnly), true, 'should have the iconOnly class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref8 = React.createElement(BottomNavigationAction, {
    icon: icon
  });

  it('should render icon', () => {
    const wrapper = shallow(_ref8);
    assert.strictEqual(wrapper.contains(icon), true, 'should have the icon');
  });

  var _ref9 = React.createElement(BottomNavigationAction, {
    icon: icon,
    selected: true
  });

  it('should render label with the selected class', () => {
    const wrapper = shallow(_ref9);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(labelWrapper.hasClass(classes.selected), true);
    assert.strictEqual(labelWrapper.hasClass(classes.label), true);
  });

  var _ref10 = React.createElement(BottomNavigationAction, {
    icon: icon,
    showLabel: false
  });

  it('should render label with the iconOnly class', () => {
    const wrapper = shallow(_ref10);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(labelWrapper.hasClass(classes.iconOnly), true, 'should have the iconOnly class');
    assert.strictEqual(labelWrapper.hasClass(classes.label), true, 'should have the label class');
  });
  it('should not render an Icon if icon is not provided', () => {
    const wrapper = shallow(_ref11);
    assert.strictEqual(wrapper.find(Icon).exists(), false);
  });
  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(React.createElement(BottomNavigationAction, {
        icon: "book",
        onClick: handleClick,
        value: "foo"
      }));
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });
  describe('prop: onChange', () => {
    it('should be called when a click is triggered', () => {
      const handleChange = spy();
      const wrapper = shallow(React.createElement(BottomNavigationAction, {
        icon: "book",
        onChange: handleChange,
        value: "foo"
      }));
      wrapper.simulate('click', 'bar');
      assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
    });
  });
});