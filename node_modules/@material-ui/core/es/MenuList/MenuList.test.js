import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import MenuList from './MenuList';

var _ref = React.createElement(MenuList, {
  className: "test-class",
  "data-test": "hi"
});

var _ref2 = React.createElement(MenuList, null, React.createElement("div", null), React.createElement("div", null), null);

describe('<MenuList />', () => {
  let shallow;
  before(() => {
    shallow = createShallow({
      dive: true,
      disableLifecycleMethods: true
    });
  });
  describe('list node', () => {
    let wrapper;
    before(() => {
      wrapper = shallow(_ref);
    });
    it('should render a List', () => {
      assert.strictEqual(wrapper.name(), 'List');
      assert.strictEqual(wrapper.props()['data-test'], 'hi');
      assert.strictEqual(wrapper.hasClass('test-class'), true);
    });
  });
  describe('prop: children', () => {
    it('should support invalid children', () => {
      const wrapper = shallow(_ref2);
      assert.strictEqual(wrapper.find('div').length, 2);
    });
  });
});