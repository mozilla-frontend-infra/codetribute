import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses, createMount } from '../test-utils';
import { MenuItem } from '../Menu';
import Input from '../Input';
import Select from './Select';

var _ref = React.createElement(Input, null);

var _ref2 = React.createElement(MenuItem, {
  value: "1"
}, "1");

var _ref3 = React.createElement(MenuItem, {
  value: "2"
}, "2");

var _ref4 = React.createElement(MenuItem, {
  value: ""
}, React.createElement("em", null, "None"));

var _ref5 = React.createElement(MenuItem, {
  value: 10
}, "Ten");

var _ref6 = React.createElement(MenuItem, {
  value: 20
}, "Twenty");

var _ref7 = React.createElement(MenuItem, {
  value: 30
}, "Thirty");

describe('<Select />', () => {
  let shallow;
  let classes;
  let mount;
  const props = {
    input: _ref,
    children: [_ref2, _ref3]
  };
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(React.createElement(Select, props));
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });
  it('should render a correct top element', () => {
    const wrapper = shallow(React.createElement(Select, props));
    assert.strictEqual(wrapper.type(), Input);
  });
  it('should provide the classes to the input component', () => {
    const wrapper = shallow(React.createElement(Select, props));
    assert.deepEqual(wrapper.props().inputProps.classes, classes);
  });
  it('should be able to mount the component', () => {
    const wrapper = mount(React.createElement(Select, _extends({}, props, {
      value: 10
    }), _ref4, _ref5, _ref6, _ref7));
    assert.strictEqual(wrapper.find('input').props().value, 10);
  });
});