import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import DialogActions from './DialogActions';

var _ref = React.createElement(DialogActions, null);

var _ref2 = React.createElement(DialogActions, null);

var _ref3 = React.createElement(DialogActions, {
  "data-my-prop": "woofDialogActions"
});

var _ref4 = React.createElement(DialogActions, {
  className: "woofDialogActions"
});

var _ref5 = React.createElement(DialogActions, null, React.createElement("button", {
  className: "woofDialogActions"
}, "Hello"));

var _ref6 = React.createElement("button", {
  className: "woofDialogActions"
}, "Hello");

var _ref7 = React.createElement("button", null, "false button");

describe('<DialogActions />', () => {
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
  it('should spread custom props on the root node', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialogActions', 'custom prop should be woofDialogActions');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofDialogActions'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children with the button class wrapped in a div with the action class', () => {
    const wrapper = shallow(_ref5);
    const button = wrapper.childAt(0);
    assert.strictEqual(button.is('button'), true, 'should be a button');
    assert.strictEqual(button.hasClass('woofDialogActions'), true, 'should have the user class');
    assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');
  });
  it('should render children with the conditional buttons', () => {
    const showButton = true;
    const wrapper = shallow(React.createElement(DialogActions, null, showButton ? _ref6 : null, !showButton ? _ref7 : null));
    const button = wrapper.childAt(0);
    assert.strictEqual(button.hasClass('woofDialogActions'), true, 'should have the user class');
    assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');
    assert.strictEqual(button.is('button'), true, 'should be a button');
  });
});