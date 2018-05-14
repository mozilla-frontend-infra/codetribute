import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Typography from '../Typography';
import ListItemText from './ListItemText';

var _ref = React.createElement(ListItemText, null);

var _ref2 = React.createElement(ListItemText, null);

var _ref3 = React.createElement(ListItemText, {
  className: "woofListItemText"
});

var _ref4 = React.createElement(ListItemText, {
  inset: true
});

var _ref5 = React.createElement(ListItemText, null);

var _ref6 = React.createElement(ListItemText, {
  primary: "This is the primary text"
});

var _ref7 = React.createElement("span", null);

var _ref8 = React.createElement("span", null);

var _ref9 = React.createElement(ListItemText, {
  secondary: "This is the secondary text"
});

var _ref10 = React.createElement("span", null);

var _ref11 = React.createElement(ListItemText, {
  primary: "This is the primary text",
  secondary: "This is the secondary text"
});

var _ref12 = React.createElement("p", {
  className: "test"
}, "This is the primary text");

var _ref13 = React.createElement("p", {
  className: "test"
}, "This is the secondary text");

var _ref14 = React.createElement(ListItemText, {
  primary: "This is the primary text",
  secondary: "This is the secondary text"
});

describe('<ListItemText />', () => {
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
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.hasClass('woofListItemText'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with inset class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass(classes.inset), true, 'should have the inset class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with no children', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.children().length, 0, 'should have no children');
  });
  describe('prop: primary', () => {
    it('should render primary text', () => {
      const wrapper = shallow(_ref6);
      assert.strictEqual(wrapper.children().length, 1, 'should have 1 child');
      assert.strictEqual(wrapper.childAt(0).type(), Typography);
      assert.strictEqual(wrapper.childAt(0).props().variant, 'subheading');
      assert.strictEqual(wrapper.childAt(0).children().equals('This is the primary text'), true, 'should have the primary text');
    });
    it('should use the primary node', () => {
      const primary = _ref7;
      const wrapper = shallow(React.createElement(ListItemText, {
        primary: primary
      }));
      assert.strictEqual(wrapper.contains(primary), true, 'should find the node');
    });
    it('should use the children prop as primary node', () => {
      const primary = _ref8;
      const wrapper = shallow(React.createElement(ListItemText, null, primary));
      assert.strictEqual(wrapper.contains(primary), true, 'should find the node');
    });
  });
  describe('prop: secondary', () => {
    it('should render secondary text', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.children().length, 1, 'should have 1 child');
      assert.strictEqual(wrapper.childAt(0).type(), Typography);
      assert.strictEqual(wrapper.childAt(0).props().variant, 'body1');
      assert.strictEqual(wrapper.childAt(0).props().color, 'textSecondary', 'should have the text secondary property');
      assert.strictEqual(wrapper.childAt(0).children().equals('This is the secondary text'), true, 'should have the secondary text');
    });
    it('should use the secondary node', () => {
      const secondary = _ref10;
      const wrapper = shallow(React.createElement(ListItemText, {
        secondary: secondary
      }));
      assert.strictEqual(wrapper.contains(secondary), true, 'should find the node');
    });
  });
  describe('prop: disableTypography', () => {
    it('should wrap children in `<Typography/>` by default', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.children().length, 2, 'should have 2 children');
      assert.strictEqual(wrapper.childAt(0).type(), Typography);
      assert.strictEqual(wrapper.childAt(0).props().variant, 'subheading');
      assert.strictEqual(wrapper.childAt(0).children().equals('This is the primary text'), true, 'should have the primary text');
      assert.strictEqual(wrapper.childAt(1).type(), Typography);
      assert.strictEqual(wrapper.childAt(1).props().variant, 'body1');
      assert.strictEqual(wrapper.childAt(1).props().color, 'textSecondary');
      assert.strictEqual(wrapper.childAt(1).children().equals('This is the secondary text'), true, 'should have the secondary text');
    });
    it('should render JSX children', () => {
      const primaryChild = _ref12;
      const secondaryChild = _ref13;
      const wrapper = shallow(React.createElement(ListItemText, {
        primary: primaryChild,
        secondary: secondaryChild,
        disableTypography: true
      }));
      assert.strictEqual(wrapper.childAt(0).equals(primaryChild), true);
      assert.strictEqual(wrapper.childAt(1).equals(secondaryChild), true);
    });
  });
  it('should render primary and secondary text', () => {
    const wrapper = shallow(_ref14);
    assert.strictEqual(wrapper.children().length, 2, 'should have 2 children');
    assert.strictEqual(wrapper.childAt(0).type(), Typography);
    assert.strictEqual(wrapper.childAt(0).props().variant, 'subheading');
    assert.strictEqual(wrapper.childAt(0).children().equals('This is the primary text'), true, 'should have the primary text');
    assert.strictEqual(wrapper.childAt(1).type(), Typography);
    assert.strictEqual(wrapper.childAt(1).props().variant, 'body1');
    assert.strictEqual(wrapper.childAt(1).props().color, 'textSecondary');
    assert.strictEqual(wrapper.childAt(1).children().equals('This is the secondary text'), true, 'should have the secondary text');
  });
  it('should render primary and secondary text with customisable classes', () => {
    const textClasses = {
      primary: 'GeneralText',
      secondary: 'SecondaryText'
    };
    const wrapper = shallow(React.createElement(ListItemText, {
      primary: "This is the primary text",
      secondary: "This is the secondary text",
      classes: textClasses
    }));
    assert.strictEqual(wrapper.childAt(0).props().className.includes('GeneralText'), true, 'should have the primary text class');
    assert.strictEqual(wrapper.childAt(1).props().className.includes('SecondaryText'), true, 'should have the secondary text class');
  });
});