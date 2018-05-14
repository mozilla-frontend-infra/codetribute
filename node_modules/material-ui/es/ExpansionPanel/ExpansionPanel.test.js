import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import Collapse from '../transitions/Collapse';
import Paper from '../Paper';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelSummary from './ExpansionPanelSummary';

var _ref = React.createElement(ExpansionPanel, null, "foo");

var _ref2 = React.createElement(ExpansionPanel, null, "foo");

var _ref3 = React.createElement(ExpansionPanel, {
  defaultExpanded: true
}, "foo");

var _ref4 = React.createElement(ExpansionPanel, {
  className: "test-class-name"
}, "foo");

var _ref5 = React.createElement(ExpansionPanel, null, React.createElement(ExpansionPanelSummary, null), React.createElement("div", null, "Hello"));

var _ref6 = React.createElement(ExpansionPanel, {
  expanded: true
}, "foo");

var _ref7 = React.createElement(ExpansionPanelSummary, null);

var _ref8 = React.createElement(ExpansionPanelSummary, null);

var _ref9 = React.createElement(ExpansionPanelSummary, null);

var _ref10 = React.createElement(ExpansionPanel, {
  disabled: true
}, "foo");

var _ref11 = React.createElement(ExpansionPanel, null, React.createElement(ExpansionPanelSummary, null), null);

describe('<ExpansionPanel />', () => {
  let mount;
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
    classes = getClasses(_ref);
  });
  after(() => {
    mount.cleanUp();
  });
  it('should render and have isControlled set to false', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.type(), Paper);
    assert.strictEqual(wrapper.props().elevation, 1);
    assert.strictEqual(wrapper.props().square, true);
    assert.strictEqual(wrapper.instance().isControlled, false);
    const collapse = wrapper.find(Collapse);
    assert.strictEqual(collapse.props()['aria-hidden'], 'true');
    wrapper.setProps({
      expanded: true
    });
    assert.strictEqual(wrapper.state().expanded, false, 'should not change the expanded state');
  });
  it('should handle defaultExpanded prop', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.instance().isControlled, false, 'should have isControlled state false');
    assert.strictEqual(wrapper.state().expanded, true, 'should set expanded state');
    assert.strictEqual(wrapper.hasClass(classes.expanded), true, 'should have the expanded class');
  });
  it('should render the custom className and the root class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render the summary and collapse elements', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.childAt(0).type(), ExpansionPanelSummary);
    const collapse = wrapper.childAt(1);
    assert.strictEqual(collapse.type(), Collapse);
    assert.strictEqual(collapse.children().length, 1, 'collapse should have 1 children div');
  });
  it('should handle the expanded prop', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.state().expanded, undefined);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
    assert.strictEqual(wrapper.instance().isControlled, true, 'should set isControlled prop');
    wrapper.setProps({
      expanded: false
    });
    assert.strictEqual(wrapper.hasClass(classes.expanded), false);
  });
  it('should call onChange when clicking the summary element', () => {
    const handleChange = spy();
    const wrapper = mount(React.createElement(ExpansionPanel, {
      onChange: handleChange
    }, _ref7));
    assert.strictEqual(wrapper.type(), ExpansionPanel);
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
  });
  it('when controlled should call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(React.createElement(ExpansionPanel, {
      onChange: handleChange,
      expanded: true
    }, _ref8));
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 1, 'it should forward the onChange');
    assert.strictEqual(handleChange.args[0][1], false);
  });
  it('when undefined onChange and controlled should not call the onChange', () => {
    const handleChange = spy();
    const wrapper = mount(React.createElement(ExpansionPanel, {
      onChange: handleChange,
      expanded: true
    }, _ref9));
    wrapper.setProps({
      onChange: undefined
    });
    wrapper.find(ExpansionPanelSummary).simulate('click');
    assert.strictEqual(handleChange.callCount, 0);
  });
  it('when disabled should have the disabled class', () => {
    const wrapper = shallow(_ref10);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true, 'should have the disabled class');
  });
  describe('prop: children', () => {
    it('should accept an empty child', () => {
      shallow(_ref11);
    });
  });
});