import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Card from './Card';
import Paper from '../Paper';

var _ref = React.createElement(Card, null);

var _ref2 = React.createElement(Card, null);

var _ref3 = React.createElement(Card, {
  className: "card"
});

var _ref4 = React.createElement(Card, {
  raised: true
});

var _ref5 = React.createElement(Card, {
  "data-my-prop": "woofCard"
});

describe('<Card />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render Paper with the root class & with 2dp', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.type(), Paper);
    assert.strictEqual(wrapper.props().elevation, 2);
  });
  it('should have the root and custom class', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('card'), true);
  });
  it('should render Paper with 8dp', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.props().elevation, 8);
  });
  it('should spread custom props on the root node', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofCard', 'custom prop should be woofCard');
  });
});