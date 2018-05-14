import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TableRow from './TableRow';

var _ref = React.createElement(TableRow, null);

var _ref2 = React.createElement(TableRow, null);

var _ref3 = React.createElement(TableRow, {
  component: "div"
});

var _ref4 = React.createElement(TableRow, {
  "data-my-prop": "woofTableRow"
});

var _ref5 = React.createElement(TableRow, {
  className: "woofTableRow"
});

var _ref6 = React.createElement("td", {
  className: "test"
});

var _ref7 = React.createElement(TableRow, null);

var _ref8 = React.createElement(TableRow, null);

describe('<TableRow />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a tr', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'tr');
  });
  it('should render a div', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should spread custom props on the root node', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.prop('data-my-prop'), 'woofTableRow', 'custom prop should be woofTableRow');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass('woofTableRow'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', () => {
    const children = _ref6;
    const wrapper = shallow(React.createElement(TableRow, null, children));
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should render with the head class when in the context of a table head', () => {
    const wrapper = shallow(_ref7);
    wrapper.setContext({
      table: {
        head: true
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.head), true, 'should have the head class');
  });
  it('should render with the footer class when in the context of a table footer', () => {
    const wrapper = shallow(_ref8);
    wrapper.setContext({
      table: {
        footer: true
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
});