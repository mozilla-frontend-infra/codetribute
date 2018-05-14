import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import StepContent from './StepContent';
import Collapse from '../transitions/Collapse';

var _ref = React.createElement("div", {
  className: "test-content"
}, "This is my content!");

describe('<StepContent />', () => {
  let shallow;
  let mount;
  const props = {
    orientation: 'vertical'
  };
  before(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });
  it('renders a div', () => {
    const wrapper = shallow(React.createElement(StepContent, props, "Here is the content"));
    assert.strictEqual(wrapper.type(), 'div');
  });
  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(React.createElement(StepContent, _extends({
      style: {
        paddingRight: 200,
        color: 'purple',
        border: '1px solid tomato'
      },
      role: "Tabpanel"
    }, props), "Lorem ipsum"));
    const {
      style,
      role
    } = wrapper.props();
    assert.strictEqual(style.paddingRight, 200);
    assert.strictEqual(style.color, 'purple');
    assert.strictEqual(style.border, '1px solid tomato');
    assert.strictEqual(role, 'Tabpanel');
  });
  it('renders children inside an Collapse component', () => {
    const wrapper = shallow(React.createElement(StepContent, props, _ref));
    const collapse = wrapper.find(Collapse);
    assert.strictEqual(collapse.length, 1);
    const content = collapse.find('.test-content');
    assert.strictEqual(content.length, 1);
    assert.strictEqual(content.props().children, 'This is my content!');
  });
});