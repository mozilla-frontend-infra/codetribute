import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import StepConnector from './StepConnector';

var _ref = React.createElement(StepConnector, {
  orientation: "horizontal"
});

var _ref2 = React.createElement(StepConnector, {
  orientation: "horizontal"
});

var _ref3 = React.createElement(StepConnector, {
  orientation: "vertical"
});

describe('<StepConnector />', () => {
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
  describe('rendering', () => {
    it('renders a div containing a span', () => {
      const wrapper = shallow(_ref);
      assert.strictEqual(wrapper.type(), 'div');
      const line = wrapper.find('span');
      assert.strictEqual(line.length, 1);
    });
    it('has the class lineHorizontal when horizontal', () => {
      const wrapper = shallow(_ref2);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineHorizontal');
    });
    it('has the class lineVertical when vertical', () => {
      const wrapper = shallow(_ref3);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineVertical');
    });
  });
});