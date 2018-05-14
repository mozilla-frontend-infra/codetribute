import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import DialogTitle from './DialogTitle';

var _ref = React.createElement(DialogTitle, null, "foo");

var _ref2 = React.createElement(DialogTitle, null, "foo");

var _ref3 = React.createElement(DialogTitle, {
  "data-my-prop": "woofDialogTitle"
}, "foo");

var _ref4 = React.createElement(DialogTitle, {
  className: "woofDialogTitle"
}, "foo");

var _ref5 = React.createElement("p", {
  className: "test"
}, "Hello");

describe('<DialogTitle />', () => {
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
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialogTitle', 'custom prop should be woofDialogTitle');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofDialogTitle'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render JSX children', () => {
    const children = _ref5;
    const wrapper = shallow(React.createElement(DialogTitle, {
      disableTypography: true
    }, children));
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should render string children as given string', () => {
    const children = 'Hello';
    const wrapper = shallow(React.createElement(DialogTitle, null, children));
    assert.strictEqual(wrapper.childAt(0).props().children, children);
  });
});