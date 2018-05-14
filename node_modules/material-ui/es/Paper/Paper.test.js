import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Paper from './Paper';

var _ref = React.createElement(Paper, null);

var _ref2 = React.createElement(Paper, null, "Hello World");

var _ref3 = React.createElement(Paper, null, "Hello World");

var _ref4 = React.createElement(Paper, {
  square: true
}, "Hello World");

var _ref5 = React.createElement(Paper, {
  elevation: 16
}, "Hello World");

var _ref6 = React.createElement(Paper, {
  component: "header"
}, "Hello World");

describe('<Paper />', () => {
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
  it('should render with the root class, default depth class', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.rounded), true);
  });
  it('should disable the rounded class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.rounded), false);
  });
  it('should set the elevation elevation class', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.elevation16), true, 'should have the 16 elevation class');
    wrapper.setProps({
      elevation: 24
    });
    assert.strictEqual(wrapper.hasClass(classes.elevation24), true, 'should have the 24 elevation class');
    wrapper.setProps({
      elevation: 2
    });
    assert.strictEqual(wrapper.hasClass(classes.elevation2), true, 'should have the 2 elevation class');
  });
  describe('prop: component', () => {
    it('should render a header', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.name(), 'header');
    });
  });
});