import React from 'react';
import { assert } from 'chai';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import { createShallow, createMount } from '../test-utils';
import StepIcon from './StepIcon';
import StepPositionIcon from './StepPositionIcon';

var _ref = React.createElement(StepIcon, {
  icon: 1,
  completed: true
});

var _ref2 = React.createElement(StepIcon, {
  icon: 1,
  error: true
});

var _ref3 = React.createElement(StepIcon, {
  icon: 1,
  active: true
});

var _ref4 = React.createElement(StepIcon, {
  icon: React.createElement("span", {
    className: "my-icon"
  })
});

describe('<StepIcon />', () => {
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
  it('renders <CheckCircle> when completed', () => {
    const wrapper = mount(_ref);
    const checkCircle = wrapper.find(CheckCircle);
    assert.strictEqual(checkCircle.length, 1, 'should have an <CheckCircle />');
  });
  it('renders <Warning> when error occured', () => {
    const wrapper = mount(_ref2);
    const warning = wrapper.find(Warning);
    assert.strictEqual(warning.length, 1, 'should have an <Warning />');
  });
  it('renders <StepPositionIcon> when not completed', () => {
    const wrapper = shallow(_ref3);
    const checkCircle = wrapper.find(StepPositionIcon);
    assert.strictEqual(checkCircle.length, 1, 'should have an <StepPositionIcon />');
    const props = checkCircle.props();
    assert.strictEqual(props.position, 1, 'should set position');
    assert.include(props.className, 'active');
  });
  it('renders the custom icon', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.find('.my-icon').length, 1, 'should have the custom icon');
  });
});