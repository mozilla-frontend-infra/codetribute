import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import AppBar from './AppBar';

var _ref = React.createElement(AppBar, null, "Hello World");

var _ref2 = React.createElement(AppBar, null, "Hello World");

var _ref3 = React.createElement(AppBar, null, "Hello World");

var _ref4 = React.createElement(AppBar, {
  className: "test-class-name"
}, "Hello World");

var _ref5 = React.createElement(AppBar, {
  color: "primary"
}, "Hello World");

var _ref6 = React.createElement(AppBar, {
  color: "secondary"
}, "Hello World");

var _ref7 = React.createElement(AppBar, {
  position: "fixed"
}, "Hello World");

describe('<AppBar />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a Paper component', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.props().elevation, 4, 'should render with a 4dp shadow');
  });
  it('should render with the root class and primary', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), false);
  });
  it('should render the custom className and the appBar class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');
  });
  it('should render a primary app bar', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), false);
  });
  it('should render an secondary app bar', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
  });
  describe('Dialog', () => {
    it('should add a .mui-fixed class', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.hasClass('mui-fixed'), true);
    });
  });
});