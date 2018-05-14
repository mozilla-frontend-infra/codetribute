import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListSubheader from './ListSubheader';

var _ref = React.createElement(ListSubheader, null);

var _ref2 = React.createElement(ListSubheader, null);

var _ref3 = React.createElement(ListSubheader, {
  className: "woofListSubheader"
});

var _ref4 = React.createElement(ListSubheader, {
  color: "primary"
});

var _ref5 = React.createElement(ListSubheader, {
  inset: true
});

var _ref6 = React.createElement(ListSubheader, null);

var _ref7 = React.createElement(ListSubheader, {
  disableSticky: true
});

describe('<ListSubheader />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a li', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'li');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass('woofListSubheader'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should display primary color', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should display inset class', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('prop: disableSticky', () => {
    it('should display sticky class', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.hasClass(classes.sticky), true);
    });
    it('should not display sticky class', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.hasClass(classes.sticky), false);
    });
  });
});