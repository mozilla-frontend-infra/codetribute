import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Icon from './Icon';

var _ref = React.createElement(Icon, null);

var _ref2 = React.createElement(Icon, null, "account_circle");

var _ref3 = React.createElement(Icon, null, "account_circle");

var _ref4 = React.createElement(Icon, {
  "data-test": "hello"
}, "account_circle");

var _ref5 = React.createElement(Icon, {
  className: "meow"
}, "account_circle");

var _ref6 = React.createElement(Icon, {
  color: "secondary"
}, "account_circle");

var _ref7 = React.createElement(Icon, {
  color: "action"
}, "account_circle");

var _ref8 = React.createElement(Icon, {
  color: "error"
}, "account_circle");

var _ref9 = React.createElement(Icon, {
  color: "primary"
}, "account_circle");

describe('<Icon />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('renders children by default', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.contains('account_circle'), true, 'should contain the children');
  });
  it('should render an span with root class', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the "root" class');
  });
  it('should spread props on span', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the span');
  });
  describe('optional classes', () => {
    it('should render with the user class', () => {
      const wrapper = shallow(_ref5);
      assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
    });
    it('should render with the secondary color', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });
    it('should render with the action color', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.hasClass(classes.colorAction), true, 'should have the "action" color');
    });
    it('should render with the error color', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.hasClass(classes.colorError), true, 'should have the "error" color');
    });
    it('should render with the primary class', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the "primary" color');
    });
  });
});