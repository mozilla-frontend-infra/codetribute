import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import Step from './Step';

var _ref = React.createElement("h1", {
  className: "hello-world"
}, "Hello World");

var _ref2 = React.createElement("h1", {
  key: 1,
  className: "hello-world"
}, "Hello World");

var _ref3 = React.createElement("p", {
  key: 2,
  className: "hay"
}, "How are you?");

var _ref4 = React.createElement("h1", {
  active: false,
  className: "hello-world"
}, "Hello World");

describe('<Step />', () => {
  let shallow;
  let mount;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });
  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(React.createElement(Step, {
      index: 1,
      style: {
        paddingRight: 200,
        color: 'purple',
        border: '1px solid tomato'
      },
      role: "Menuitem",
      orientation: "horizontal"
    }));
    const {
      style,
      role
    } = wrapper.props();
    assert.strictEqual(style.paddingRight, 200);
    assert.strictEqual(style.color, 'purple');
    assert.strictEqual(style.border, '1px solid tomato');
    assert.strictEqual(role, 'Menuitem');
  });
  describe('rendering children', () => {
    it('renders children', () => {
      const children = _ref;
      const wrapper = shallow(React.createElement(Step, {
        label: "Step One",
        index: 1,
        orientation: "horizontal"
      }, children));
      assert.strictEqual(wrapper.find('.hello-world').length, 1);
    });
    it('renders children with all props passed through', () => {
      const children = [_ref2, _ref3];
      const wrapper = shallow(React.createElement(Step, {
        active: false,
        completed: true,
        disabled: true,
        index: 0,
        orientation: "horizontal"
      }, children));
      const child1 = wrapper.find('.hello-world');
      const child2 = wrapper.find('.hay');
      [child1, child2].forEach(child => {
        assert.strictEqual(child.length, 1);
        assert.strictEqual(child.props().active, false);
        assert.strictEqual(child.props().completed, true);
        assert.strictEqual(child.props().disabled, true);
        assert.strictEqual(child.props().icon, 1);
      });
    });
    it('honours children overriding props passed through', () => {
      const children = _ref4;
      const wrapper = shallow(React.createElement(Step, {
        active: true,
        label: "Step One",
        orientation: "horizontal",
        index: 0
      }, children));
      const childWrapper = wrapper.find('.hello-world');
      assert.strictEqual(childWrapper.props().active, false);
    });
  });
});