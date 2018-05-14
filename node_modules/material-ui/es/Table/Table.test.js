import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Table from './Table';

var _ref = React.createElement(Table, null, "foo");

var _ref2 = React.createElement(Table, null, "foo");

var _ref3 = React.createElement(Table, {
  component: "div"
}, "foo");

var _ref4 = React.createElement(Table, {
  "data-my-prop": "woofTable"
}, "foo");

var _ref5 = React.createElement(Table, {
  className: "woofTable"
}, "foo");

var _ref6 = React.createElement("tbody", {
  className: "test"
});

var _ref7 = React.createElement(Table, null, "foo");

describe('<Table />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a table', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'table');
  });
  it('should render a div', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should spread custom props on the root node', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofTable', 'custom prop should be woofTable');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass('woofTable'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', () => {
    const children = _ref6;
    const wrapper = shallow(React.createElement(Table, null, children));
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should define table in the child context', () => {
    const wrapper = shallow(_ref7);
    assert.deepStrictEqual(wrapper.instance().getChildContext().table, {});
  });
});