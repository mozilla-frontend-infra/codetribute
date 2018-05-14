import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Typography from './Typography';

var _ref = React.createElement(Typography, null, "Hello");

var _ref2 = React.createElement(Typography, null, "Hello");

var _ref3 = React.createElement(Typography, {
  "data-test": "hello"
}, "Hello");

var _ref4 = React.createElement(Typography, null, "Hello");

var _ref5 = React.createElement(Typography, {
  className: "woofTypography"
}, "Hello");

var _ref6 = React.createElement(Typography, {
  align: "center",
  className: "woofTypography"
}, "Hello");

var _ref8 = React.createElement(Typography, {
  color: "inherit"
}, "Hello");

var _ref9 = React.createElement(Typography, {
  variant: "button"
}, "Hello");

var _ref10 = React.createElement(Typography, {
  paragraph: true
}, "Hello");

var _ref11 = React.createElement(Typography, {
  variant: "title"
}, "Hello");

var _ref12 = React.createElement(Typography, {
  component: "h1"
}, "Hello");

describe('<Typography />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render the text', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.childAt(0).equals('Hello'), true);
  });
  it('should spread props', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.props()['data-test'], 'hello');
  });
  it('should render body1 root by default', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should merge user classes', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.body1), true);
    assert.strictEqual(wrapper.hasClass('woofTypography'), true);
  });
  it('should center text', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.alignCenter), true);
  });
  ['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'].forEach(variant => {
    var _ref7 = React.createElement(Typography, {
      variant: variant
    }, "Hello");

    it(`should render ${variant} text`, () => {
      const wrapper = shallow(_ref7);
      assert.ok(classes[variant] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[variant]), true, `should be ${variant} text`);
    });
  });
  [['primary', 'colorPrimary'], ['textSecondary', 'colorTextSecondary'], ['secondary', 'colorSecondary'], ['inherit', 'colorInherit'], ['error', 'colorError']].forEach(([color, className]) => {
    it(`should render ${color} color`, () => {
      const wrapper = shallow(React.createElement(Typography, {
        color: color
      }, "Hello"));
      assert.ok(classes[className] !== undefined);
      assert.strictEqual(wrapper.hasClass(classes[className]), true, `should be ${color} text`);
    });
  });
  describe('prop: color', () => {
    it('should inherit the color', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.hasClass(classes.colorInherit), true);
    });
  });
  describe('headline', () => {
    it('should render a span by default', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.name(), 'span');
    });
    it('should render a p with a paragraph', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.name(), 'p');
    });
    it('should render the mapped headline', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.name(), 'h2');
    });
    it('should render a h1', () => {
      const wrapper = shallow(_ref12);
      assert.strictEqual(wrapper.name(), 'h1');
    });
  });
});