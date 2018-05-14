import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import FormGroup from './FormGroup';

var _ref = React.createElement(FormGroup, null);

var _ref2 = React.createElement(FormGroup, {
  className: "woofFormGroup"
});

var _ref3 = React.createElement(FormGroup, null, React.createElement("div", {
  className: "woofFormGroup"
}));

describe('<FormGroup />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a div with the root and user classes', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofFormGroup'), true);
  });
  it('should render a div with a div child', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.children('span').length, 0);
    assert.strictEqual(wrapper.children('div').length, 1);
    assert.strictEqual(wrapper.children('div').first().hasClass('woofFormGroup'), true);
  });
});