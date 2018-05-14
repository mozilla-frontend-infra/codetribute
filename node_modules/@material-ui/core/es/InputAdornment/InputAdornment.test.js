import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Typography from '../Typography';
import InputAdornment from './InputAdornment';

var _ref = React.createElement(InputAdornment, {
  position: "start"
}, "foo");

var _ref2 = React.createElement(InputAdornment, {
  position: "start"
}, "foo");

var _ref3 = React.createElement(InputAdornment, {
  component: "span",
  position: "start"
}, "foo");

var _ref4 = React.createElement(InputAdornment, {
  position: "start"
}, "foo");

var _ref5 = React.createElement(InputAdornment, {
  position: "start"
}, "foo");

var _ref6 = React.createElement(InputAdornment, {
  position: "end"
}, "foo");

var _ref7 = React.createElement(InputAdornment, {
  disableTypography: true,
  position: "start"
}, "foo");

var _ref8 = React.createElement(InputAdornment, {
  position: "start"
}, React.createElement("div", null, "foo"));

describe('<InputAdornment />', () => {
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
  it('should render given component', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'span');
  });
  it('should wrap text children in a Typography', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.childAt(0).type(), Typography);
  });
  it('should have the root and start class when position is start', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.positionStart), true);
  });
  it('should have the root and end class when position is end', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.positionEnd), true);
  });
  it('should not wrap text children in a Typography when disableTypography true', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.childAt(0).text(), 'foo');
  });
  it('should render children', () => {
    const wrapper = shallow(_ref8);
    assert.strictEqual(wrapper.childAt(0).name(), 'div');
  });
});