import React from 'react';
import { assert } from 'chai';
import { createShallow, createRender, getClasses } from '../test-utils';
import Button from './Button';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

var _ref = React.createElement(Button, null, "Hello World");

var _ref2 = React.createElement(Button, null, "Hello World");

var _ref3 = React.createElement(Button, null, "Hello World");

var _ref4 = React.createElement(Button, {
  className: "test-class-name"
}, "Hello World");

var _ref5 = React.createElement(Button, {
  color: "primary"
}, "Hello World");

var _ref6 = React.createElement(Button, {
  color: "secondary"
}, "Hello World");

var _ref7 = React.createElement(Button, {
  variant: "raised"
}, "Hello World");

var _ref8 = React.createElement(Button, {
  variant: "raised",
  color: "primary"
}, "Hello World");

var _ref9 = React.createElement(Button, {
  variant: "raised",
  color: "secondary"
}, "Hello World");

var _ref10 = React.createElement(Button, {
  variant: "fab"
}, "Hello World");

var _ref11 = React.createElement(Button, {
  variant: "fab",
  mini: true
}, "Hello World");

var _ref12 = React.createElement(Button, {
  variant: "fab",
  color: "primary"
}, "Hello World");

var _ref13 = React.createElement(Button, {
  variant: "fab",
  color: "secondary"
}, "Hello World");

var _ref14 = React.createElement(Button, null, "Hello World");

var _ref15 = React.createElement(Button, {
  disableRipple: true
}, "Hello World");

var _ref16 = React.createElement(Button, null, "Hello World");

var _ref17 = React.createElement(Button, {
  disableFocusRipple: true
}, "Hello World");

var _ref18 = React.createElement(Button, null, "Hello World");

describe('<Button />', () => {
  let shallow;
  let render;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    render = createRender();
    classes = getClasses(_ref);
  });
  it('should render a <ButtonBase> element', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.type(), ButtonBase);
    assert.strictEqual(wrapper.props().type, 'button', 'should render with the button type attribute');
  });
  it('should render with the root class but no others', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should not have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render the custom className and the root class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render a primary button', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.flatPrimary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render an secondary button', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), false, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), true);
  });
  it('should render a raised button', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render a raised primary button', () => {
    const wrapper = shallow(_ref8);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), false);
  });
  it('should render a raised secondary button', () => {
    const wrapper = shallow(_ref9);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), false, 'should not have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), true, 'should have the secondary class');
  });
  it('should render a floating action button', () => {
    const wrapper = shallow(_ref10);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render a mini floating action button', () => {
    const wrapper = shallow(_ref11);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.mini), true, 'should have the mini class');
    assert.strictEqual(wrapper.hasClass(classes.flatPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.flatSecondary), false);
  });
  it('should render a primary floating action button', () => {
    const wrapper = shallow(_ref12);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), true, 'should have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), false);
  });
  it('should render an secondary floating action button', () => {
    const wrapper = shallow(_ref13);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.raised), true, 'should have the raised class');
    assert.strictEqual(wrapper.hasClass(classes.fab), true, 'should have the fab class');
    assert.strictEqual(wrapper.hasClass(classes.raisedPrimary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.raisedSecondary), true, 'should have the secondary class');
  });
  it('should have a ripple by default', () => {
    const wrapper = shallow(_ref14);
    assert.strictEqual(wrapper.props().disableRipple, undefined);
  });
  it('should pass disableRipple to ButtonBase', () => {
    const wrapper = shallow(_ref15);
    assert.strictEqual(wrapper.props().disableRipple, true);
  });
  it('should have a focusRipple by default', () => {
    const wrapper = shallow(_ref16);
    assert.strictEqual(wrapper.props().focusRipple, true, 'should set focusRipple to true');
  });
  it('should pass disableFocusRipple to ButtonBase', () => {
    const wrapper = shallow(_ref17);
    assert.strictEqual(wrapper.props().focusRipple, false, 'should set focusRipple to false');
  });
  it('should render Icon children with right classes', () => {
    const childClassName = 'child-woof';
    const iconChild = React.createElement(Icon, {
      className: childClassName
    });
    const wrapper = shallow(React.createElement(Button, {
      variant: "fab"
    }, iconChild));
    const label = wrapper.childAt(0);
    const renderedIconChild = label.childAt(0);
    assert.strictEqual(renderedIconChild.type(), Icon);
    assert.strictEqual(renderedIconChild.hasClass(childClassName), true, 'child should be icon');
  });
  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server side render', () => {
      const markup = render(_ref18);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});