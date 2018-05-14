"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _BottomNavigationAction = _interopRequireDefault(require("./BottomNavigationAction"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _BottomNavigation = _interopRequireDefault(require("./BottomNavigation"));

var _ref = _react.default.createElement(_Icon.default, null, "restore");

var _ref3 = _react.default.createElement(_BottomNavigation.default, {
  showLabels: true,
  value: 0
}, _react.default.createElement(_BottomNavigationAction.default, {
  label: "One"
}), null, _react.default.createElement(_BottomNavigationAction.default, {
  label: "Three"
}));

describe('<BottomNavigation />', function () {
  var shallow;
  var mount;
  var classes;
  var icon = _ref;

  var _ref2 = _react.default.createElement(_BottomNavigation.default, {
    showLabels: true,
    value: 0
  }, _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  }));

  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref2);
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('renders with a null child', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.find(_BottomNavigationAction.default).length, 2);
  });

  var _ref4 = _react.default.createElement(_BottomNavigation.default, {
    showLabels: true,
    value: 0
  }, _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  }));

  it('should render with the root class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref5 = _react.default.createElement(_BottomNavigation.default, {
    showLabels: true,
    value: 0,
    className: "woofBottomNavigation"
  }, _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  }));

  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass('woofBottomNavigation'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref6 = _react.default.createElement(_BottomNavigation.default, {
    showLabels: true,
    value: 1
  }, _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  }), _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  }));

  it('should pass selected prop to children', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.childAt(0).props().selected, false, 'should have selected to false');

    _chai.assert.strictEqual(wrapper.childAt(1).props().selected, true, 'should have selected');
  });

  var _ref7 = _react.default.createElement(_BottomNavigation.default, {
    showLabels: true,
    value: 1
  }, _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  }), _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon,
    showLabel: false
  }));

  it('should overwrite parent showLabel prop', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.childAt(0).props().showLabel, true, 'should have parent showLabel');

    _chai.assert.strictEqual(wrapper.childAt(1).props().showLabel, false, 'should overwrite showLabel');
  });

  var _ref8 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  });

  var _ref9 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  });

  it('should pass selected prop to children', function () {
    var handleChange = (0, _sinon.spy)();
    var wrapper = mount(_react.default.createElement(_BottomNavigation.default, {
      showLabels: true,
      value: 0,
      onChange: handleChange
    }, _ref8, _ref9));
    wrapper.find(_BottomNavigationAction.default).at(1).simulate('click');

    _chai.assert.strictEqual(handleChange.callCount, 1, 'should have been called once');

    _chai.assert.strictEqual(handleChange.args[0][1], 1, 'should have been called with value 1');
  });

  var _ref10 = _react.default.createElement(_BottomNavigationAction.default, {
    value: "first",
    icon: icon
  });

  var _ref11 = _react.default.createElement(_BottomNavigationAction.default, {
    value: "second",
    icon: icon
  });

  it('should use custom action values', function () {
    var handleChange = (0, _sinon.spy)();
    var wrapper = mount(_react.default.createElement(_BottomNavigation.default, {
      showLabels: true,
      value: 'first',
      onChange: handleChange
    }, _ref10, _ref11));
    wrapper.find(_BottomNavigationAction.default).at(1).simulate('click');

    _chai.assert.strictEqual(handleChange.args[0][1], 'second', 'should have been called with value second');
  });

  var _ref12 = _react.default.createElement(_BottomNavigationAction.default, {
    value: "",
    icon: icon
  });

  var _ref13 = _react.default.createElement(_BottomNavigationAction.default, {
    icon: icon
  });

  var _ref14 = _react.default.createElement(_BottomNavigationAction.default, {
    value: null,
    icon: icon
  });

  it('should handle also empty action value', function () {
    var handleChange = (0, _sinon.spy)();
    var wrapper = mount(_react.default.createElement(_BottomNavigation.default, {
      showLabels: true,
      value: "val",
      onChange: handleChange
    }, _ref12, _ref13, _ref14));
    wrapper.find(_BottomNavigationAction.default).at(0).simulate('click');

    _chai.assert.strictEqual(handleChange.args[0][1], '');

    wrapper.find(_BottomNavigationAction.default).at(1).simulate('click');

    _chai.assert.strictEqual(handleChange.args[1][1], 1);

    wrapper.find(_BottomNavigationAction.default).at(2).simulate('click');

    _chai.assert.strictEqual(handleChange.args[2][1], null);
  });
});