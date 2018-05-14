import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListItemSecondaryAction from './ListItemSecondaryAction';

var _ref = React.createElement(ListItemSecondaryAction, null);

var _ref2 = React.createElement(ListItemSecondaryAction, null);

var _ref3 = React.createElement(ListItemSecondaryAction, {
  className: "woofListItemSecondaryAction"
});

describe('<ListItemSecondaryAction />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      untilSelector: 'ListItemSecondaryAction'
    });
    classes = getClasses(_ref);
  });
  it('should render a div', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass('woofListItemSecondaryAction'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});