import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ExpansionPanelActions from './ExpansionPanelActions';

var _ref = React.createElement(ExpansionPanelActions, null, "foo");

var _ref2 = React.createElement(ExpansionPanelActions, null, "foo");

var _ref3 = React.createElement(ExpansionPanelActions, {
  "data-my-prop": "woofExpansionPanelActions"
}, "foo");

var _ref4 = React.createElement(ExpansionPanelActions, {
  className: "woofExpansionPanelActions"
}, "foo");

var _ref5 = React.createElement(ExpansionPanelActions, null, React.createElement("button", {
  className: "woofExpansionPanelActions"
}, "Hello"));

var _ref6 = React.createElement(ExpansionPanelActions, null, React.createElement("button", null, "Hello"), null);

describe('<ExpansionPanelActions />', () => {
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
    assert.strictEqual(wrapper.props()['data-my-prop'], 'woofExpansionPanelActions', 'custom prop should be woofExpansionPanelActions');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofExpansionPanelActions'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children with the button class wrapped in a div with the action class', () => {
    const wrapper = shallow(_ref5);
    const button = wrapper.childAt(0);
    assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');
    assert.strictEqual(button.type(), 'button');
    assert.strictEqual(button.hasClass('woofExpansionPanelActions'), true, 'should have the user class');
  });
  it('should render a valid children', () => {
    const wrapper = shallow(_ref6);
    const button = wrapper.childAt(0);
    assert.strictEqual(button.hasClass(classes.action), true, 'should have the action wrapper');
    assert.strictEqual(button.type(), 'button');
  });
});