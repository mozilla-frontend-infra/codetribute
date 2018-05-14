import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import ButtonBase from '../ButtonBase';
import ExpansionPanelSummary from './ExpansionPanelSummary';

var _ref = React.createElement(ExpansionPanelSummary, null);

var _ref2 = React.createElement(ExpansionPanelSummary, null);

var _ref3 = React.createElement(ExpansionPanelSummary, {
  className: "woofExpansionPanelSummary"
});

var _ref4 = React.createElement(ExpansionPanelSummary, null);

var _ref5 = React.createElement(ExpansionPanelSummary, {
  disabled: true
});

var _ref6 = React.createElement(ExpansionPanelSummary, {
  expanded: true
});

var _ref7 = React.createElement(ExpansionPanelSummary, {
  expandIcon: React.createElement("div", null, "Icon")
});

describe('<ExpansionPanelSummary />', () => {
  let mount;
  let shallow;
  let classes;
  const ExpansionPanelSummaryNaked = unwrap(ExpansionPanelSummary);
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
  it('should render a ButtonBase', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofExpansionPanelSummary'), true);
  });
  it('should render with the content', () => {
    const wrapper = shallow(_ref4);
    const itemsWrap = wrapper.childAt(0);
    assert.strictEqual(itemsWrap.hasClass(classes.content), true);
  });
  it('when disabled should have disabled class', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.disabled), true);
  });
  it('when expanded should have expanded class', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.expanded), true);
  });
  it('should render with the expand icon and have the expandIcon class', () => {
    const wrapper = shallow(_ref7);
    const iconWrap = wrapper.childAt(1);
    assert.strictEqual(iconWrap.hasClass(classes.expandIcon), true);
  });
  it('handleFocus() should set focused state', () => {
    const eventMock = 'woofExpansionPanelSummary';
    const wrapper = mount(React.createElement(ExpansionPanelSummaryNaked, {
      classes: {}
    }));
    wrapper.instance().handleFocus(eventMock);
    assert.strictEqual(wrapper.state().focused, true);
  });
  it('handleBlur() should unset focused state', () => {
    const eventMock = 'woofExpansionPanelSummary';
    const wrapper = mount(React.createElement(ExpansionPanelSummaryNaked, {
      classes: {}
    }));
    wrapper.setState({
      focused: true
    });
    wrapper.instance().handleBlur(eventMock);
    assert.strictEqual(wrapper.state().focused, false);
  });
  describe('prop: onChange', () => {
    it('should propagate call to onChange prop', () => {
      const eventMock = 'woofExpansionPanelSummary';
      const handleChange = spy();
      const wrapper = mount(React.createElement(ExpansionPanelSummaryNaked, {
        classes: {},
        onChange: handleChange
      }));
      wrapper.instance().handleChange(eventMock);
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.calledWith(eventMock), true);
    });
    it('should not propagate call to onChange prop', () => {
      const eventMock = 'woofExpansionPanelSummary';
      const handleChange = spy();
      const wrapper = mount(React.createElement(ExpansionPanelSummaryNaked, {
        classes: {},
        onChange: handleChange
      }));
      wrapper.setProps({
        onChange: undefined
      });
      wrapper.instance().handleChange(eventMock);
      assert.strictEqual(handleChange.callCount, 0);
    });
  });
  describe('prop: click', () => {
    it('should trigger onClick', () => {
      const handleClick = spy();
      const wrapper = shallow(React.createElement(ExpansionPanelSummary, {
        onClick: handleClick
      }));
      wrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1);
    });
  });
});