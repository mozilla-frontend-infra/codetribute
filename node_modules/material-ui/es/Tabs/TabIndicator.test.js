import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import TabIndicator from './TabIndicator';
describe('<TabIndicator />', () => {
  let shallow;
  let classes;
  const style = {
    left: 1,
    width: 2
  };

  var _ref = React.createElement(TabIndicator, {
    color: "secondary",
    style: style
  });

  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });

  var _ref2 = React.createElement(TabIndicator, {
    color: "secondary",
    style: style
  });

  it('should render with the root class', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'span');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref3 = React.createElement(TabIndicator, {
    color: "secondary",
    style: style
  });

  describe('prop: style', () => {
    it('should be applied on the root element', () => {
      const wrapper = shallow(_ref3);
      assert.strictEqual(wrapper.props().style, style, 'should apply directly the property');
    });
  });

  var _ref4 = React.createElement(TabIndicator, {
    color: "secondary",
    style: style,
    className: "foo"
  });

  describe('prop: className', () => {
    it('should append the className on the root element', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the property class');
    });
  });
});