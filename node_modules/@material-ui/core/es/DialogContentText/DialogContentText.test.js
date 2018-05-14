import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import DialogContentText from './DialogContentText';

var _ref = React.createElement(DialogContentText, null);

var _ref2 = React.createElement(DialogContentText, {
  className: "woofDialogContentText"
});

var _ref3 = React.createElement("p", null);

describe('<DialogContentText />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(_ref2);
      assert.strictEqual(wrapper.hasClass('woofDialogContentText'), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: children', () => {
    it('should render children', () => {
      const children = _ref3;
      const wrapper = shallow(React.createElement(DialogContentText, null, children));
      assert.strictEqual(wrapper.children().equals(children), true);
    });
  });
});