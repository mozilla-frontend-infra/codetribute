import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import StepPositionIcon from './StepPositionIcon';
import SvgIcon from '../SvgIcon';

var _ref = React.createElement(StepPositionIcon, {
  position: 1
});

var _ref2 = React.createElement(StepPositionIcon, {
  position: 3
});

describe('<StepPositionIcon />', () => {
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
  it('renders a <SvgIcon>', () => {
    const wrapper = shallow(_ref);
    assert.strictEqual(wrapper.find(SvgIcon).length, 1);
  });
  it('contains text "3" when position is "3"', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.find('text').text(), '3');
  });
});