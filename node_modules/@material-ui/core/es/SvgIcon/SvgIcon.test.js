import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import SvgIcon from './SvgIcon';

var _ref = React.createElement(SvgIcon, null, "foo");

var _ref2 = React.createElement("path", {
  d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
});

var _ref4 = React.createElement(SvgIcon, null, "book");

describe('<SvgIcon />', () => {
  let shallow;
  let classes;
  let path;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
    path = _ref2;
  });

  var _ref3 = React.createElement(SvgIcon, null, path);

  it('renders children by default', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.contains(path), true, 'should contain the children');
    assert.strictEqual(wrapper.props()['aria-hidden'], 'true');
  });
  it('should render an svg', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.name(), 'svg');
  });

  var _ref5 = React.createElement(SvgIcon, {
    "data-test": "hello",
    viewBox: "0 0 32 32"
  }, path);

  it('should spread props on svg', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.props()['data-test'], 'hello', 'should be spread on the svg');
    assert.strictEqual(wrapper.props().viewBox, '0 0 32 32', 'should override the viewBox');
  });

  var _ref6 = React.createElement(SvgIcon, {
    title: "Go to link",
    titleAccess: "Network"
  }, path);

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.find('title').text(), 'Network');
      assert.strictEqual(wrapper.props()['aria-hidden'], 'false');
    });
  });

  var _ref7 = React.createElement(SvgIcon, {
    className: "meow"
  }, path);

  var _ref8 = React.createElement(SvgIcon, {
    color: "secondary"
  }, path);

  var _ref9 = React.createElement(SvgIcon, {
    color: "action"
  }, path);

  var _ref10 = React.createElement(SvgIcon, {
    color: "error"
  }, path);

  var _ref11 = React.createElement(SvgIcon, {
    color: "primary"
  }, path);

  describe('prop: color', () => {
    it('should render with the user and SvgIcon classes', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.hasClass('meow'), true, 'should have the "meow" class');
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the SvgIcon class');
    });
    it('should render with the secondary color', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });
    it('should render with the action color', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.hasClass(classes.colorAction), true, 'should have the "action" color');
    });
    it('should render with the error color', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.hasClass(classes.colorError), true, 'should have the "error" color');
    });
    it('should render with the primary class', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true, 'should have the "primary" color');
    });
  });
});