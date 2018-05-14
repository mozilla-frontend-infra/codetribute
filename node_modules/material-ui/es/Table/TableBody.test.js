import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TableBody from './TableBody';

var _ref = React.createElement(TableBody, null, "foo");

var _ref2 = React.createElement(TableBody, null, "foo");

var _ref3 = React.createElement(TableBody, {
  component: "div"
}, "foo");

var _ref4 = React.createElement(TableBody, {
  className: "woofTableBody"
}, "foo");

var _ref5 = React.createElement("tr", {
  className: "test"
});

var _ref6 = React.createElement(TableBody, null, "foo");

describe('<TableBody />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a tbody', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'tbody');
  });
  it('should render a div', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the user and root class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofTableBody'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', () => {
    const children = _ref5;
    const wrapper = shallow(React.createElement(TableBody, null, children));
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should define table.body in the child context', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.instance().getChildContext().table.body, true);
  });
});