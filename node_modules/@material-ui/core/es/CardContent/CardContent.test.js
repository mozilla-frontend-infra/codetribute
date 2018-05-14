import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import CardContent from './CardContent';

var _ref = React.createElement(CardContent, null);

var _ref2 = React.createElement(CardContent, null);

describe('<CardContent />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      untilSelector: 'CardContent'
    });
    classes = getClasses(_ref);
  });
  it('should render a div with the root class', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});