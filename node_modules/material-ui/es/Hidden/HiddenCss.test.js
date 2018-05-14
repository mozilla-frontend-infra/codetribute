import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import HiddenCss from './HiddenCss';

var _ref = React.createElement("div", null, "bar");

const Foo = () => _ref;

var _ref2 = React.createElement(HiddenCss, null, React.createElement("div", null));

var _ref3 = React.createElement(HiddenCss, {
  only: "sm"
}, React.createElement("div", {
  className: "foo"
}));

var _ref4 = React.createElement("div", {
  className: "foo"
});

var _ref5 = React.createElement("div", {
  className: "foo"
});

var _ref6 = React.createElement(HiddenCss, {
  mdDown: true
}, React.createElement("div", {
  className: "foo"
}));

var _ref7 = React.createElement(HiddenCss, {
  mdUp: true
}, React.createElement("div", {
  className: "foo"
}));

var _ref8 = React.createElement(HiddenCss, {
  mdUp: true,
  className: "custom"
}, React.createElement("div", {
  className: "foo"
}));

var _ref9 = React.createElement(HiddenCss, {
  mdUp: true
}, "foo");

var _ref10 = React.createElement(HiddenCss, {
  mdUp: true
}, React.createElement(Foo, null));

var _ref11 = React.createElement(HiddenCss, {
  mdUp: true
}, React.createElement(Foo, null), React.createElement(Foo, null), "foo");

describe('<HiddenCss />', () => {
  let shallow;
  let classes;
  before(() => {
    shallow = createShallow({
      untilSelector: 'div'
    });
    classes = getClasses(_ref2);
  });
  describe('the generated class names', () => {
    it('should be ok with only', () => {
      const wrapper = shallow(_ref3);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.onlySm), true);
      const div = wrapper.childAt(0);
      assert.strictEqual(div.type(), 'div');
      assert.strictEqual(div.props().className, 'foo');
    });
    it('should be ok with only as an array', () => {
      const wrapper = shallow(React.createElement(HiddenCss, {
        only: ['xs', 'sm']
      }, _ref4));
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.props().className.split(' ')[0], classes.onlyXs);
      assert.strictEqual(wrapper.props().className.split(' ')[1], classes.onlySm);
    });
    it('should be ok with only as an empty array', () => {
      const wrapper = shallow(React.createElement(HiddenCss, {
        only: []
      }, _ref5));
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.props().className, '');
    });
    it('should be ok with mdDown', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.hasClass(classes.mdDown), true);
    });
    it('should be ok with mdUp', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
    });
    it('should handle provided className prop', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.hasClass('custom'), true);
    });
  });
  describe('prop: children', () => {
    it('should work when text Node', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
      assert.strictEqual(wrapper.childAt(0).text(), 'foo');
    });
    it('should work when Element', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
      assert.strictEqual(wrapper.childAt(0).is(Foo), true);
    });
    it('should work when mixed ChildrenArray', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.hasClass(classes.mdUp), true);
      assert.strictEqual(wrapper.childAt(0).is(Foo), true);
      assert.strictEqual(wrapper.childAt(1).is(Foo), true);
      assert.strictEqual(wrapper.childAt(2).text(), 'foo');
    });
  });
});