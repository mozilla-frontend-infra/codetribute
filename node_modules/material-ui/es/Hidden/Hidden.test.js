import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Hidden from './Hidden';
import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';

var _ref = React.createElement(Hidden, null, "Hello");

var _ref2 = React.createElement(Hidden, {
  implementation: "css"
}, "Hello");

describe('<Hidden />', () => {
  let shallow;
  before(() => {
    shallow = createShallow();
  });
  describe('prop: implementation', () => {
    it('should use HiddenJs by default', () => {
      const wrapper = shallow(_ref);
      assert.strictEqual(wrapper.find(HiddenJs).length, 1);
    });
    it('should change the implementation', () => {
      const wrapper = shallow(_ref2);
      assert.strictEqual(wrapper.find(HiddenCss).length, 1);
    });
  });
});