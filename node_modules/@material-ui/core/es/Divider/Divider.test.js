import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Divider from './Divider';

var _ref = React.createElement(Divider, null);

var _ref2 = React.createElement(Divider, null);

var _ref3 = React.createElement(Divider, null);

var _ref4 = React.createElement(Divider, {
  absolute: true
});

var _ref5 = React.createElement(Divider, {
  inset: true
});

var _ref6 = React.createElement(Divider, {
  light: true
});

describe('<Divider />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a hr', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'hr');
  });
  it('should render with the root and default class', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should set the absolute class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.absolute), true, 'should be absolute');
  });
  it('should set the inset class', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have inset class');
  });
  it('should set the light class', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.light), true, 'should have light class');
  });
});