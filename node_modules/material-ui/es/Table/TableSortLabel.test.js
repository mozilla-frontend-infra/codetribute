import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '../test-utils';
import TableSortLabel from './TableSortLabel';

var _ref = React.createElement(TableSortLabel, null);

var _ref2 = React.createElement(TableSortLabel, null);

var _ref3 = React.createElement(TableSortLabel, null);

var _ref4 = React.createElement(TableSortLabel, null);

var _ref5 = React.createElement(TableSortLabel, {
  direction: "desc"
});

var _ref6 = React.createElement(TableSortLabel, {
  direction: "asc"
});

var _ref7 = React.createElement(TableSortLabel, null);

describe('<TableSortLabel />', () => {
  let shallow;
  let mount;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
    classes = getClasses(_ref);
  });
  after(() => {
    mount.cleanUp();
  });
  it('should render TableSortLabel', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have root class');
  });
  it('should set the active class when active', () => {
    const activeFlag = true;
    const wrapper = shallow(React.createElement(TableSortLabel, {
      active: activeFlag
    }));
    assert.strictEqual(wrapper.hasClass(classes.active), true);
  });
  it('should not set the active class when not active', () => {
    const activeFlag = false;
    const wrapper = shallow(React.createElement(TableSortLabel, {
      active: activeFlag
    }));
    assert.strictEqual(wrapper.hasClass(classes.active), false);
  });
  describe('has an icon', () => {
    it('should have one child with the icon class', () => {
      const wrapper = shallow(_ref3);
      const iconChildren = wrapper.find(`.${classes.icon}`);
      assert.strictEqual(iconChildren.length, 1);
    });
    it('by default should have desc direction class', () => {
      const wrapper = shallow(_ref4);
      const icon = wrapper.find(`.${classes.icon}`).first();
      assert.strictEqual(icon.hasClass(classes.iconDirectionAsc), false);
      assert.strictEqual(icon.hasClass(classes.iconDirectionDesc), true);
    });
    it('when given direction desc should have desc direction class', () => {
      const wrapper = shallow(_ref5);
      const icon = wrapper.find(`.${classes.icon}`).first();
      assert.strictEqual(icon.hasClass(classes.iconDirectionAsc), false);
      assert.strictEqual(icon.hasClass(classes.iconDirectionDesc), true);
    });
    it('when given direction asc should have asc direction class', () => {
      const wrapper = shallow(_ref6);
      const icon = wrapper.find(`.${classes.icon}`).first();
      assert.strictEqual(icon.hasClass(classes.iconDirectionAsc), true);
      assert.strictEqual(icon.hasClass(classes.iconDirectionDesc), false);
    });
  });
  describe('mount', () => {
    it('should mount without error', () => {
      mount(_ref7);
    });
  });
});