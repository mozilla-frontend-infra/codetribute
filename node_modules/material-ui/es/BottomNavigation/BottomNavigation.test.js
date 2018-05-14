import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import BottomNavigationAction from './BottomNavigationAction';
import Icon from '../Icon';
import BottomNavigation from './BottomNavigation';

var _ref = React.createElement(Icon, null, "restore");

var _ref3 = React.createElement(BottomNavigation, {
  showLabels: true,
  value: 0
}, React.createElement(BottomNavigationAction, {
  label: "One"
}), null, React.createElement(BottomNavigationAction, {
  label: "Three"
}));

describe('<BottomNavigation />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = _ref;

  var _ref2 = React.createElement(BottomNavigation, {
    showLabels: true,
    value: 0
  }, React.createElement(BottomNavigationAction, {
    icon: icon
  }));

  before(() => {
    shallow = createShallow({
      dive: true
    });
    classes = getClasses(_ref2);
    mount = createMount();
  });
  after(() => {
    mount.cleanUp();
  });
  it('renders with a null child', () => {
    const wrapper = shallow(_ref3);
    assert.strictEqual(wrapper.find(BottomNavigationAction).length, 2);
  });

  var _ref4 = React.createElement(BottomNavigation, {
    showLabels: true,
    value: 0
  }, React.createElement(BottomNavigationAction, {
    icon: icon
  }));

  it('should render with the root class', () => {
    const wrapper = shallow(_ref4);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref5 = React.createElement(BottomNavigation, {
    showLabels: true,
    value: 0,
    className: "woofBottomNavigation"
  }, React.createElement(BottomNavigationAction, {
    icon: icon
  }));

  it('should render with the user and root classes', () => {
    const wrapper = shallow(_ref5);
    assert.strictEqual(wrapper.hasClass('woofBottomNavigation'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref6 = React.createElement(BottomNavigation, {
    showLabels: true,
    value: 1
  }, React.createElement(BottomNavigationAction, {
    icon: icon
  }), React.createElement(BottomNavigationAction, {
    icon: icon
  }));

  it('should pass selected prop to children', () => {
    const wrapper = shallow(_ref6);
    assert.strictEqual(wrapper.childAt(0).props().selected, false, 'should have selected to false');
    assert.strictEqual(wrapper.childAt(1).props().selected, true, 'should have selected');
  });

  var _ref7 = React.createElement(BottomNavigation, {
    showLabels: true,
    value: 1
  }, React.createElement(BottomNavigationAction, {
    icon: icon
  }), React.createElement(BottomNavigationAction, {
    icon: icon,
    showLabel: false
  }));

  it('should overwrite parent showLabel prop', () => {
    const wrapper = shallow(_ref7);
    assert.strictEqual(wrapper.childAt(0).props().showLabel, true, 'should have parent showLabel');
    assert.strictEqual(wrapper.childAt(1).props().showLabel, false, 'should overwrite showLabel');
  });

  var _ref8 = React.createElement(BottomNavigationAction, {
    icon: icon
  });

  var _ref9 = React.createElement(BottomNavigationAction, {
    icon: icon
  });

  it('should pass selected prop to children', () => {
    const handleChange = spy();
    const wrapper = mount(React.createElement(BottomNavigation, {
      showLabels: true,
      value: 0,
      onChange: handleChange
    }, _ref8, _ref9));
    wrapper.find(BottomNavigationAction).at(1).simulate('click');
    assert.strictEqual(handleChange.callCount, 1, 'should have been called once');
    assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with value 1');
  });

  var _ref10 = React.createElement(BottomNavigationAction, {
    value: "first",
    icon: icon
  });

  var _ref11 = React.createElement(BottomNavigationAction, {
    value: "second",
    icon: icon
  });

  it('should use custom action values', () => {
    const handleChange = spy();
    const wrapper = mount(React.createElement(BottomNavigation, {
      showLabels: true,
      value: 'first',
      onChange: handleChange
    }, _ref10, _ref11));
    wrapper.find(BottomNavigationAction).at(1).simulate('click');
    assert.strictEqual(handleChange.args[0][1], 'second', 'should have been called with value second');
  });

  var _ref12 = React.createElement(BottomNavigationAction, {
    value: "",
    icon: icon
  });

  var _ref13 = React.createElement(BottomNavigationAction, {
    icon: icon
  });

  var _ref14 = React.createElement(BottomNavigationAction, {
    value: null,
    icon: icon
  });

  it('should handle also empty action value', () => {
    const handleChange = spy();
    const wrapper = mount(React.createElement(BottomNavigation, {
      showLabels: true,
      value: "val",
      onChange: handleChange
    }, _ref12, _ref13, _ref14));
    wrapper.find(BottomNavigationAction).at(0).simulate('click');
    assert.strictEqual(handleChange.args[0][1], '');
    wrapper.find(BottomNavigationAction).at(1).simulate('click');
    assert.strictEqual(handleChange.args[1][1], 1);
    wrapper.find(BottomNavigationAction).at(2).simulate('click');
    assert.strictEqual(handleChange.args[2][1], null);
  });
});