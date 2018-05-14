import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Badge from './Badge';

var _ref = React.createElement(Badge, {
  badgeContent: 1
}, "Hello World");

var _ref2 = React.createElement("div", {
  className: "unique"
}, "Hello World");

var _ref8 = React.createElement(Badge, {
  badgeContent: 10,
  color: "error"
}, React.createElement("span", null));

describe('<Badge />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  const testChildren = _ref2;

  var _ref3 = React.createElement(Badge, {
    badgeContent: 10
  }, testChildren);

  it('renders children and badgeContent', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.ok(wrapper.find('span').length, 'should contain the badgeContent');
  });
  it('renders children and overwrite badge class', () => {
    const badgeClassName = 'testBadgeClassName';
    const wrapper = shallow(React.createElement(Badge, {
      badgeContent: 10,
      classes: {
        badge: badgeClassName
      }
    }, testChildren));
    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.find('span').at(1).hasClass('testBadgeClassName'), true);
  });

  var _ref4 = React.createElement(Badge, {
    badgeContent: 10
  }, testChildren);

  it('renders children by default', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
  });

  var _ref5 = React.createElement(Badge, {
    badgeContent: 10,
    className: "testClassName"
  }, testChildren);

  it('renders children and className', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.is('.testClassName'), true, 'should contain the className');
  });

  var _ref6 = React.createElement(Badge, {
    badgeContent: 10,
    color: "primary"
  }, testChildren);

  it('renders children and have primary styles', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.find('span').at(1).hasClass(classes.colorPrimary), true, 'should have primary class');
  });

  var _ref7 = React.createElement(Badge, {
    badgeContent: 10,
    color: "secondary"
  }, testChildren);

  it('renders children and have secondary styles', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.find('span').at(1).hasClass(classes.colorSecondary), true);
  });
  it('have error class', () => {
    const wrapper = shallow(_ref8);
    assert.strictEqual(wrapper.find('span').at(2).hasClass(classes.colorError), true);
  });
  it('renders children and overwrite root styles', () => {
    const style = {
      backgroundColor: 'red'
    };
    const wrapper = shallow(React.createElement(Badge, {
      badgeContent: 10,
      style: style
    }, testChildren));
    assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
    assert.strictEqual(wrapper.props().style.backgroundColor, style.backgroundColor, 'should overwrite badge backgroundColor');
  });
});