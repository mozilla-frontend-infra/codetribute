import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Toolbar from './Toolbar';

var _ref = React.createElement(Toolbar, null, "foo");

var _ref2 = React.createElement(Toolbar, null, "foo");

var _ref3 = React.createElement(Toolbar, {
  className: "woofToolbar"
}, "foo");

var _ref4 = React.createElement(Toolbar, {
  disableGutters: true
}, "foo");

describe('<Toolbar />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a div', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the user, root and gutters classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass('woofToolbar'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.gutters), true);
  });
  it('should disable the gutters', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.gutters), false, 'should not have the gutters class');
  });
});