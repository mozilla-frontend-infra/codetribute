import React from 'react';
import { assert } from 'chai';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import { getClasses, createShallow, createMount } from '../test-utils';
import SwitchBase from '../internal/SwitchBase';
import Radio from './Radio';

var _ref = React.createElement(Radio, null);

var _ref2 = React.createElement(Radio, null);

var _ref3 = React.createElement(Radio, null);

var _ref4 = React.createElement(Radio, {
  checked: true
});

describe('<Radio />', () => {
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
  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.root, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });
  it('should be using SwitchBase', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.type(), SwitchBase);
  });
  describe('prop: unchecked', () => {
    it('should render an unchecked icon', () => {
      const wrapper = mount(_ref3);
      assert.strictEqual(wrapper.find(RadioButtonUncheckedIcon).length, 1);
    });
  });
  describe('prop: checked', () => {
    it('should render a checked icon', () => {
      const wrapper = mount(_ref4);
      assert.strictEqual(wrapper.find(RadioButtonCheckedIcon).length, 1);
    });
  });
});