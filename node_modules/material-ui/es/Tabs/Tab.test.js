import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import Tab from './Tab';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

var _ref = React.createElement(Icon, null, "restore");

var _ref2 = React.createElement(Tab, {
  textColor: "inherit"
});

var _ref3 = React.createElement(Tab, {
  textColor: "inherit"
});

var _ref4 = React.createElement(Tab, {
  textColor: "inherit",
  className: "woofTab"
});

var _ref5 = React.createElement(Tab, {
  selected: true,
  textColor: "secondary"
});

var _ref6 = React.createElement(Tab, {
  disabled: true,
  textColor: "secondary"
});

var _ref7 = React.createElement(Tab, {
  textColor: "inherit",
  label: "foo"
});

var _ref8 = React.createElement(Tab, {
  textColor: "inherit",
  label: "foo"
});

var _ref10 = React.createElement(Tab, {
  selected: true,
  textColor: "inherit"
});

var _ref11 = React.createElement(Tab, {
  textColor: "inherit",
  fullWidth: true
});

describe('<Tab />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = _ref;
  before(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
    classes = getClasses(_ref2);
  });
  after(() => {
    mount.cleanUp();
  });
  it('should render with the root class', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.type(), ButtonBase);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(_ref4);
      assert.strictEqual(wrapper.hasClass('woofTab'), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: selected', () => {
    it('should render with the selected and root classes', () => {
      const wrapper = shallow(_ref5);
      assert.strictEqual(wrapper.hasClass(classes.selected), true);
      assert.strictEqual(wrapper.hasClass(classes.textColorSecondary), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.props()['aria-selected'], true);
    });
  });
  describe('prop: disabled', () => {
    it('should render with the disabled and root classes', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.hasClass(classes.disabled), true);
      assert.strictEqual(wrapper.hasClass(classes.textColorSecondary), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(React.createElement(Tab, {
        textColor: "inherit",
        onClick: handleClick,
        onChange: () => {}
      }));
      wrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });
  describe('prop: label', () => {
    it('should render label with the label class', () => {
      const wrapper = shallow(_ref7);
      const label = wrapper.childAt(0).childAt(0).childAt(0);
      assert.strictEqual(label.hasClass(classes.label), true);
    });
    it('should render with text wrapping', () => {
      const wrapper = shallow(_ref8);
      const instance = wrapper.instance();
      instance.label = {
        getClientRects: stub().returns({
          length: 2
        })
      };
      instance.checkTextWrap();
      wrapper.update();
      const label = wrapper.childAt(0).childAt(0).childAt(0);
      assert.strictEqual(label.hasClass(classes.labelWrapped), true, 'should have labelWrapped class');
      assert.strictEqual(wrapper.state().wrappedText, true, 'wrappedText state should be true');
    });
  });
  describe('prop: classes', () => {
    it('should render label with a custom label class', () => {
      const wrapper = shallow(React.createElement(Tab, {
        textColor: "inherit",
        label: "foo",
        classes: {
          label: 'MyLabel'
        }
      }));
      const label = wrapper.childAt(0).childAt(0).childAt(0);
      assert.strictEqual(label.hasClass(classes.label), true);
      assert.strictEqual(label.hasClass('MyLabel'), true);
    });
  });

  var _ref9 = React.createElement(Tab, {
    textColor: "inherit",
    icon: icon
  });

  describe('prop: icon', () => {
    it('should render icon element', () => {
      const wrapper = shallow(_ref9);
      const iconWrapper = wrapper.childAt(0).childAt(0);
      assert.strictEqual(iconWrapper.is(Icon), true);
    });
  });
  describe('prop: textColor', () => {
    it('should support the inherit value', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.hasClass(classes.selected), true);
      assert.strictEqual(wrapper.hasClass(classes.textColorInherit), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });
  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.hasClass(classes.fullWidth), true);
    });
  });
  describe('prop: style', () => {
    it('should be able to override everything', () => {
      const style = {
        width: '80%',
        color: 'red',
        alignText: 'center'
      };
      const wrapper = shallow(React.createElement(Tab, {
        fullWidth: true,
        style: style
      }));
      assert.deepEqual(wrapper.props().style, style);
    });
  });
  it('should have a ref on label property', () => {
    const TabNaked = unwrap(Tab);
    const instance = mount(React.createElement(TabNaked, {
      textColor: "inherit",
      label: "foo",
      classes: classes
    })).instance();
    assert.isDefined(instance.label, 'should be defined');
  });
});