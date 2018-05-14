import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import ListItemText from './ListItemText';
import ListItemSecondaryAction from './ListItemSecondaryAction';
import ListItem from './ListItem';
import ListItemAvatar from './ListItemAvatar';
import Avatar from '../Avatar';
import ButtonBase from '../ButtonBase';

var _ref = React.createElement(ListItem, null);

var _ref2 = React.createElement(ListItem, {
  component: "div"
});

var _ref3 = React.createElement(ListItem, null);

var _ref4 = React.createElement(ListItem, {
  className: "woofListItem"
});

var _ref5 = React.createElement(ListItem, {
  disableGutters: true
});

var _ref6 = React.createElement(ListItem, null, React.createElement(ListItemAvatar, null, React.createElement(Avatar, null)));

var _ref7 = React.createElement(ListItem, {
  button: true
});

var _ref8 = React.createElement(ListItem, {
  button: true,
  component: "a"
});

var _ref9 = React.createElement(ListItem, {
  button: true,
  component: "li"
});

var _ref10 = React.createElement(ListItem, null);

var _ref11 = React.createElement(ListItem, null, React.createElement(ListItemText, {
  primary: "primary"
}), React.createElement(ListItemSecondaryAction, null));

var _ref12 = React.createElement(ListItem, {
  component: "span"
}, React.createElement(ListItemText, {
  primary: "primary"
}), React.createElement(ListItemSecondaryAction, null));

var _ref13 = React.createElement(ListItem, {
  button: true
}, React.createElement(ListItemText, {
  primary: "primary"
}), React.createElement(ListItemSecondaryAction, null));

var _ref14 = React.createElement(ListItem, {
  ContainerComponent: "div"
}, React.createElement(ListItemText, {
  primary: "primary"
}), React.createElement(ListItemSecondaryAction, null));

var _ref15 = React.createElement(ListItemText, {
  primary: "primary"
});

var _ref16 = React.createElement(ListItemSecondaryAction, null);

describe('<ListItem />', () => {
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
  it('should render a li', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.name(), 'li');
  });
  it('should render with the user, root and gutters classes', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.hasClass('woofListItem'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.gutters), true, 'should have the gutters class');
  });
  it('should disable the gutters', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.gutters), false, 'should not have the gutters class');
  });
  it('should use dense class when ListItemAvatar is present', () => {
    const wrapper = shallow(_ref6, {
      context: {
        dense: false
      }
    });
    assert.strictEqual(wrapper.hasClass(classes.dense), true);
  });
  describe('prop: button', () => {
    it('should render a div', () => {
      const wrapper = shallow(_ref7);
      assert.strictEqual(wrapper.props().component, 'div');
    });
  });
  describe('prop: component', () => {
    it('should change the component', () => {
      const wrapper = shallow(_ref8);
      assert.strictEqual(wrapper.props().component, 'a');
    });
    it('should change the component', () => {
      const wrapper = shallow(_ref9);
      assert.strictEqual(wrapper.props().component, 'li');
    });
  });
  describe('context: dense', () => {
    it('should forward the context', () => {
      const wrapper = shallow(_ref10);
      assert.strictEqual(wrapper.instance().getChildContext().dense, false, 'dense should be false by default');
      wrapper.setProps({
        dense: true
      });
      assert.strictEqual(wrapper.instance().getChildContext().dense, true, 'dense should be true when set');
    });
  });
  describe('secondary action', () => {
    it('should wrap with a container', () => {
      const wrapper = shallow(_ref11);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.type(), 'li');
      assert.strictEqual(wrapper.childAt(0).type(), 'div');
    });
    it('should accept a component property', () => {
      const wrapper = shallow(_ref12);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.type(), 'li');
      assert.strictEqual(wrapper.childAt(0).type(), 'span');
    });
    it('should accet a button property', () => {
      const wrapper = shallow(_ref13);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.type(), 'li');
      assert.strictEqual(wrapper.childAt(0).type(), ButtonBase);
    });
    it('should accept a ContainerComponent property', () => {
      const wrapper = shallow(_ref14);
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.childAt(0).type(), 'div');
    });
    it('should allow customization of the wrapper', () => {
      const wrapper = shallow(React.createElement(ListItem, {
        ContainerProps: {
          className: 'bubu'
        }
      }, _ref15, _ref16));
      assert.strictEqual(wrapper.hasClass(classes.container), true);
      assert.strictEqual(wrapper.hasClass('bubu'), true);
    });
  });
});