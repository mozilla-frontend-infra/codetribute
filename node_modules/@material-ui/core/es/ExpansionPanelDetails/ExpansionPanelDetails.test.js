import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ExpansionPanelDetails from './ExpansionPanelDetails';

var _ref = React.createElement(ExpansionPanelDetails, null, "foo");

var _ref2 = React.createElement(ExpansionPanelDetails, {
  className: "woofExpansionPanelDetails"
}, "foo");

var _ref3 = React.createElement(ExpansionPanelDetails, null, React.createElement("div", null, "Hello"));

describe('<ExpansionPanelDetails />', () => {
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
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofExpansionPanelDetails'), true);
  });
  it('should render a children element', () => {
    const wrapper = shallow(_ref3);
    const container = wrapper.childAt(0);
    assert.strictEqual(container.type(), 'div');
  });
});