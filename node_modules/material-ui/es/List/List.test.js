import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListSubheader from './ListSubheader';
import List from './List';

var _ref = React.createElement(List, null);

var _ref2 = React.createElement(List, {
  component: "div"
});

var _ref3 = React.createElement(List, null);

var _ref4 = React.createElement(List, {
  className: "woofList"
});

var _ref5 = React.createElement(List, {
  disablePadding: true
});

var _ref6 = React.createElement(List, {
  subheader: React.createElement(ListSubheader, null, "Title")
});

var _ref7 = React.createElement(List, {
  subheader: React.createElement(ListSubheader, null, "Title")
});

var _ref8 = React.createElement(List, null);

var _ref9 = React.createElement(List, {
  dense: true
});

describe('<List />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref);
  });
  it('should render a div', () => {
    const wrapper = shallow(_ref2);
    assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render a ul', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'ul');
  });
  it('should render with the user, root and padding classes', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofList'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.padding), true, 'should have the padding class');
  });
  it('should disable the padding', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.padding), false, 'should not have the padding class');
  });
  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.subheader), true, 'should have the subheader class');
    });
    it('should render ListSubheader', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.find(ListSubheader).length, 1, 'should render ListSubheader');
    });
  });
  describe('context: dense', () => {
    it('should forward the context', () => {
      const wrapper1 = shallow(_ref8);
      assert.strictEqual(wrapper1.instance().getChildContext().dense, false, 'dense should be false by default');
      const wrapper2 = shallow(_ref9);
      assert.strictEqual(wrapper2.instance().getChildContext().dense, true, 'dense should be true when set');
    });
  });
});