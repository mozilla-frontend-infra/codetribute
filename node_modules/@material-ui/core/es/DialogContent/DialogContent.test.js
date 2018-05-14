import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import DialogContent from './DialogContent';

var _ref = React.createElement(DialogContent, null);

var _ref2 = React.createElement(DialogContent, null);

var _ref3 = React.createElement(DialogContent, {
  "data-my-prop": "woofDialogContent"
});

var _ref4 = React.createElement(DialogContent, {
  className: "woofDialogContent"
});

var _ref5 = React.createElement("p", null);

describe('<DialogContent />', () => {
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
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialogContent', 'custom prop should be woofDialogContent');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofDialogContent'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', () => {
    const children = _ref5;
    const wrapper = shallow(React.createElement(DialogContent, null, children));
    assert.strictEqual(wrapper.children().equals(children), true);
  });
});