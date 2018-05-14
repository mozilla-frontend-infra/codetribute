import React from 'react';
import { assert } from 'chai';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import { createShallow, getClasses, createMount } from '../test-utils';
import SwitchBase from '../internal/SwitchBase';
import Checkbox from './Checkbox';

var _ref = React.createElement(Checkbox, null);

var _ref2 = React.createElement(Checkbox, null);

var _ref3 = React.createElement(Checkbox, {
  checked: true
});

var _ref4 = React.createElement(Checkbox, {
  indeterminate: true
});

describe('<Checkbox />', () => {
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
  it('should have the classes required for Checkbox', () => {
    assert.strictEqual(typeof classes.root, 'string');
    assert.strictEqual(typeof classes.checked, 'string');
    assert.strictEqual(typeof classes.disabled, 'string');
  });
  it('should render a div with a SwitchBase', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.type(), SwitchBase);
  });
  it('should mount without issue', () => {
    mount(_ref3);
  });
  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const wrapper = mount(_ref4);
      assert.strictEqual(wrapper.find(IndeterminateCheckBoxIcon).length, 1);
    });
  });
});