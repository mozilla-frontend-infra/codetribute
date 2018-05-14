import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import CircularProgress from './CircularProgress';

var _ref = React.createElement(CircularProgress, null);

var _ref2 = React.createElement(CircularProgress, null);

var _ref3 = React.createElement(CircularProgress, null);

var _ref4 = React.createElement(CircularProgress, {
  color: "primary"
});

var _ref5 = React.createElement(CircularProgress, {
  color: "secondary"
});

var _ref6 = React.createElement(CircularProgress, {
  className: "woofCircularProgress"
});

var _ref7 = React.createElement(CircularProgress, null);

var _ref8 = React.createElement(CircularProgress, null);

var _ref9 = React.createElement(CircularProgress, {
  size: 60
});

var _ref10 = React.createElement(CircularProgress, {
  variant: "static",
  value: 70
});

var _ref11 = React.createElement(CircularProgress, {
  variant: "determinate"
});

var _ref12 = React.createElement(CircularProgress, {
  variant: "determinate",
  value: 70
});

describe('<CircularProgress />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a div with the root class', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the primary color by default', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
  });
  it('should render with the primary color', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
  });
  it('should render with the secondary color', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass('woofCircularProgress'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.props().role, 'progressbar');
  });
  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const wrapper = shallow(_ref7);
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.name(), 'svg');
    assert.strictEqual(svg.hasClass(classes.svgIndeterminate), true);
    assert.strictEqual(svg.childAt(0).name(), 'circle', 'should be a circle');
    assert.strictEqual(svg.childAt(0).hasClass(classes.circle), true, 'should have the circle class');
  });
  it('should render intermediate variant by default', () => {
    const wrapper = shallow(_ref8);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.childAt(0).hasClass(classes.circleIndeterminate), true, 'should have the circleIndeterminate class');
  });
  it('should render with a different size', () => {
    const wrapper = shallow(_ref9);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.props().style.width, 60, 'should have width correctly set');
    assert.strictEqual(wrapper.props().style.height, 60, 'should have width correctly set');
    const svg = wrapper.childAt(0);
    assert.strictEqual(svg.name(), 'svg');
    assert.strictEqual(svg.childAt(0).name(), 'circle');
    assert.strictEqual(svg.childAt(0).props().cx, 25, 'should have cx correctly set');
    assert.strictEqual(svg.childAt(0).props().cy, 25, 'should have cx correctly set');
  });
  describe('prop: variant="static', () => {
    it('should set strokeDasharray of circle', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      const style = svg.childAt(0).props().style;
      assert.strictEqual(style.strokeDasharray, '125.664', 'should have strokeDasharray set');
      assert.strictEqual(style.strokeDashoffset, '37.699px', 'should have strokeDashoffset set');
      assert.strictEqual(wrapper.props()['aria-valuenow'], 70);
    });
  });
  describe('prop: variant="determinate"', () => {
    it('should render with determinate classes', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      assert.strictEqual(svg.name(), 'svg');
      assert.strictEqual(svg.hasClass(classes.svgIndeterminate), false, 'should not have the svgIndeterminate class');
    });
    it('should set strokeDasharray of circle', () => {
      const wrapper = shallow(_ref12);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      const svg = wrapper.childAt(0);
      const style = svg.childAt(0).props().style;
      assert.strictEqual(style.strokeDasharray, '125.664', 'should have strokeDasharray set');
      assert.strictEqual(style.strokeDashoffset, '11.310px', 'should have strokeDashoffset set');
      assert.strictEqual(wrapper.props()['aria-valuenow'], 70);
    });
  });
});