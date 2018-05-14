import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Backdrop from './Backdrop';

var _ref = React.createElement(Backdrop, {
  open: true
});

var _ref2 = React.createElement(Backdrop, {
  open: true,
  className: "woofBackdrop"
});

describe('<Backdrop />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a backdrop div', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.childAt(0).hasClass('woofBackdrop'), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.root), true);
  });
});