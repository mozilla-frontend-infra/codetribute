import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '../test-utils';
import Typography from '../Typography';
import StepLabel from './StepLabel';
import StepIcon from './StepIcon';

var _ref = React.createElement(StepLabel, null);

var _ref2 = React.createElement(StepLabel, null, "Step One");

var _ref3 = React.createElement(StepLabel, {
  icon: 1,
  active: true,
  completed: true,
  alternativeLabel: true
}, "Step One");

var _ref4 = React.createElement(StepLabel, {
  active: true
}, "Step One");

var _ref5 = React.createElement(StepLabel, {
  icon: 1,
  active: true
}, "Step One");

var _ref6 = React.createElement(StepLabel, {
  active: false
}, "Step One");

var _ref7 = React.createElement(StepLabel, {
  completed: true
}, "Step One");

var _ref8 = React.createElement(StepLabel, {
  icon: 1,
  completed: true
}, "Step One");

var _ref9 = React.createElement(StepLabel, {
  error: true
}, "Step One");

var _ref10 = React.createElement(StepLabel, {
  icon: 1,
  error: true
}, "Step One");

var _ref11 = React.createElement(StepLabel, {
  icon: 1,
  disabled: true
}, "Step One");

var _ref12 = React.createElement(StepLabel, {
  icon: 1,
  optional: React.createElement(Typography, {
    variant: "caption"
  }, "Optional Text")
}, "Step One");

describe('<StepLabel />', () => {
  let shallow;
  let classes;
  let mount;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });
  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(React.createElement(StepLabel, {
      orientation: "horizontal",
      style: {
        paddingRight: 200,
        color: 'purple',
        border: '1px solid tomato'
      },
      "data-myProp": "hello"
    }, "My Label"));
    const props = wrapper.props();
    assert.strictEqual(props.style.paddingRight, 200);
    assert.strictEqual(props.style.color, 'purple');
    assert.strictEqual(props.style.border, '1px solid tomato');
    assert.strictEqual(props['data-myProp'], 'hello');
  });
  describe('label content', () => {
    it('renders the label from children', () => {
      const wrapper = shallow(_ref2);
      assert.strictEqual(wrapper.contains('Step One'), true);
    });
    it('renders <StepIcon>', () => {
      const wrapper = shallow(_ref3);
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.length, 1, 'should have an <StepIcon />');
      const props = stepIcon.props();
      assert.strictEqual(props.icon, 1, 'should set icon');
    });
  });
  describe('prop: active', () => {
    it('renders <Typography> with the className active', () => {
      const wrapper = shallow(_ref4);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.active), true);
    });
    it('renders <StepIcon> with the prop active set to true', () => {
      const wrapper = shallow(_ref5);
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().active, true, 'should set active');
    });
    it('renders <Typography> without the className active', () => {
      const wrapper = shallow(_ref6);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.labelActive), false);
    });
  });
  describe('prop: completed', () => {
    it('renders <Typography> with the className completed', () => {
      const wrapper = shallow(_ref7);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.completed), true);
    });
    it('renders <StepIcon> with the prop completed set to true', () => {
      const wrapper = shallow(_ref8);
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().completed, true, 'should set completed');
    });
  });
  describe('prop: error', () => {
    it('renders <Typography> with the className error', () => {
      const wrapper = shallow(_ref9);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.error), true);
    });
    it('renders <StepIcon> with the prop error set to true', () => {
      const wrapper = shallow(_ref10);
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().error, true, 'should set error');
    });
  });
  describe('prop: disabled', () => {
    it('renders with disabled className when disabled', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.hasClass(classes.disabled), true);
    });
  });
  describe('prop: classes', () => {
    it('should set iconContainer', () => {
      const wrapper = shallow(React.createElement(StepLabel, {
        classes: {
          iconContainer: 'my-custom-class'
        },
        icon: 1
      }, "Step One"));
      assert.include(wrapper.find('span').at(1).props().className, 'my-custom-class');
    });
  });
  describe('prop: optional = Optional Text', () => {
    it('creates a <Typography> component with text "Optional Text"', () => {
      const wrapper = shallow(_ref12);
      assert.strictEqual(wrapper.find(Typography).at(1).contains('Optional Text'), true);
    });
  });
});