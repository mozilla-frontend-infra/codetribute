import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListItemIcon from './ListItemIcon';

var _ref = React.createElement(ListItemIcon, null, React.createElement("span", null));

var _ref2 = React.createElement(ListItemIcon, null, React.createElement("span", null));

var _ref3 = React.createElement(ListItemIcon, {
  className: "foo"
}, React.createElement("span", {
  className: "bar"
}));

describe('<ListItemIcon />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a span', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'span');
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');
    assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});