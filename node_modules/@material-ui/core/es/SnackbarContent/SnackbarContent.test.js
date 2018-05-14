import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import SnackbarContent from './SnackbarContent';

var _ref = React.createElement(SnackbarContent, {
  message: "message"
});

var _ref2 = React.createElement(SnackbarContent, {
  message: "message"
});

var _ref3 = React.createElement("span", null, "action");

var _ref4 = React.createElement("span", null, "message");

describe('<SnackbarContent />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      untilSelector: 'withStyles(Paper)'
    });
    classes = getClasses(_ref);
  });
  it('should render a Paper with classes', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('prop: action', () => {
    it('should render the action', () => {
      const action = _ref3;
      const wrapper = shallow(React.createElement(SnackbarContent, {
        message: "message",
        action: action
      }));
      assert.strictEqual(wrapper.childAt(1).hasClass(classes.action), true);
      assert.strictEqual(wrapper.childAt(1).contains(action), true);
    });
  });
  describe('prop: message', () => {
    it('should render the message', () => {
      const message = _ref4;
      const wrapper = shallow(React.createElement(SnackbarContent, {
        message: message
      }));
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.message), true);
      assert.strictEqual(wrapper.childAt(0).contains(message), true);
    });
  });
});