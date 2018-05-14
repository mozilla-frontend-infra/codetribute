import React from 'react';
import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createShallow, getClasses } from '../test-utils';
import LinearProgress from './LinearProgress';

var _ref = React.createElement(LinearProgress, null);

var _ref2 = React.createElement(LinearProgress, null);

var _ref3 = React.createElement(LinearProgress, {
  className: "woofLinearProgress"
});

var _ref4 = React.createElement(LinearProgress, null);

var _ref5 = React.createElement(LinearProgress, {
  color: "primary"
});

var _ref6 = React.createElement(LinearProgress, {
  color: "secondary"
});

var _ref7 = React.createElement(LinearProgress, {
  value: 1,
  variant: "determinate"
});

var _ref8 = React.createElement(LinearProgress, {
  color: "primary",
  value: 1,
  variant: "determinate"
});

var _ref9 = React.createElement(LinearProgress, {
  color: "secondary",
  value: 1,
  variant: "determinate"
});

var _ref10 = React.createElement(LinearProgress, {
  variant: "determinate",
  value: 77
});

var _ref11 = React.createElement(LinearProgress, {
  value: 1,
  valueBuffer: 1,
  variant: "buffer"
});

var _ref12 = React.createElement(LinearProgress, {
  value: 1,
  valueBuffer: 1,
  color: "primary",
  variant: "buffer"
});

var _ref13 = React.createElement(LinearProgress, {
  value: 1,
  valueBuffer: 1,
  color: "secondary",
  variant: "buffer"
});

var _ref14 = React.createElement(LinearProgress, {
  variant: "buffer",
  value: 77,
  valueBuffer: 85
});

var _ref15 = React.createElement(LinearProgress, {
  variant: "query"
});

var _ref16 = React.createElement(LinearProgress, {
  variant: "determinate",
  value: undefined
});

var _ref17 = React.createElement(LinearProgress, {
  variant: "buffer",
  value: undefined
});

describe('<LinearProgress />', () => {
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
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass('woofLinearProgress'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render intermediate variant by default', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Indeterminate), true, 'should have the bar1Indeterminate class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar2Indeterminate), true, 'should have the bar2Indeterminate class');
  });
  it('should render for the primary color', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
  });
  it('should render for the secondary color', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');
  });
  it('should render with determinate classes for the primary color by default', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true, 'should have the bar1Determinate class');
  });
  it('should render with determinate classes for the primary color', () => {
    const wrapper = shallow(_ref8);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true, 'should have the bar1Determinate class');
  });
  it('should render with determinate classes for the secondary color', () => {
    const wrapper = shallow(_ref9);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Determinate), true, 'should have the bar1Determinate class');
  });
  it('should set width of bar1 on determinate variant', () => {
    const wrapper = shallow(_ref10);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.childAt(0).props().style.transform, 'scaleX(0.77)', 'should have width set');
    assert.strictEqual(wrapper.props()['aria-valuenow'], 77);
  });
  it('should render with buffer classes for the primary color by default', () => {
    const wrapper = shallow(_ref11);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorPrimary), true, 'should have the dashedColorPrimary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true, 'should have the bar1Buffer class');
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorPrimary), true, 'should have the colorPrimary class');
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true, 'should have the bar2Buffer class');
  });
  it('should render with buffer classes for the primary color', () => {
    const wrapper = shallow(_ref12);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorPrimary), true, 'should have the dashedColorPrimary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true, 'should have the bar1Buffer class');
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorPrimary), true, 'should have the colorPrimary class');
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true, 'should have the bar2Buffer class');
  });
  it('should render with buffer classes for the secondary color', () => {
    const wrapper = shallow(_ref13);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.dashedColorSecondary), true, 'should have the dashedColorSecondary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorSecondary), true, 'should have the barColorSecondary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar1Buffer), true, 'should have the bar1Buffer class');
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.colorSecondary), true, 'should have the colorSecondary class');
    assert.strictEqual(wrapper.childAt(2).hasClass(classes.bar2Buffer), true, 'should have the bar2Buffer class');
  });
  it('should set width of bar1 and bar2 on buffer variant', () => {
    const wrapper = shallow(_ref14);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.childAt(1).props().style.transform, 'scaleX(0.77)', 'should have width set');
    assert.strictEqual(wrapper.childAt(2).props().style.transform, 'scaleX(0.85)', 'should have width set');
  });
  it('should render with query classes', () => {
    const wrapper = shallow(_ref15);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.query), true, 'should have the query class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(0).hasClass(classes.bar1Indeterminate), true, 'should have the bar1Indeterminate class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.barColorPrimary), true, 'should have the barColorPrimary class');
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.bar2Indeterminate), true, 'should have the bar2Indeterminate class');
  });
  describe('prop: value', () => {
    before(() => {
      consoleErrorMock.spy();
    });
    after(() => {
      consoleErrorMock.reset();
    });
    it('should warn when not used as expected', () => {
      shallow(_ref16);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(consoleErrorMock.args()[0][0], /Warning: Material-UI: you need to provide a value property/);
      shallow(_ref17);
      assert.strictEqual(consoleErrorMock.callCount(), 3);
      assert.match(consoleErrorMock.args()[1][0], /Warning: Material-UI: you need to provide a value property/);
      assert.match(consoleErrorMock.args()[2][0], /Warning: Material-UI: you need to provide a valueBuffer property/);
    });
  });
});