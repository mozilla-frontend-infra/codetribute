"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _sinon = require("sinon");

var _testUtils = require("../test-utils");

var _ListItem = _interopRequireDefault(require("../List/ListItem"));

var _ListItemSecondaryAction = _interopRequireDefault(require("../List/ListItemSecondaryAction"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _ref = _react.default.createElement(_MenuItem.default, null);

var _ref2 = _react.default.createElement(_MenuItem.default, null);

var _ref3 = _react.default.createElement(_MenuItem.default, {
  className: "woofMenuItem"
});

var _ref4 = _react.default.createElement(_MenuItem.default, {
  selected: true
});

var _ref5 = _react.default.createElement(_MenuItem.default, null);

var _ref6 = _react.default.createElement(_MenuItem.default, {
  role: "option",
  "aria-selected": false
});

var _ref7 = _react.default.createElement(_MenuItem.default, null);

var _ref8 = _react.default.createElement(_MenuItem.default, {
  component: "a"
});

var _ref9 = _react.default.createElement(_MenuItem.default, null, _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement("div", null)));

var _ref10 = _react.default.createElement(_MenuItem.default, {
  button: false
}, _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement("div", null)));

describe('<MenuItem />', function () {
  var shallow;
  var classes;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a button ListItem with with ripple', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _ListItem.default);

    _chai.assert.strictEqual(wrapper.props().button, true, 'should have the button prop');

    _chai.assert.strictEqual(wrapper.props().disableRipple, undefined, 'should have a ripple');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass('woofMenuItem'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the selected class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
  });
  it('should have a default role of menuitem', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.props().role, 'menuitem', 'should have the menuitem role');
  });
  it('should have a role of option', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.props().role, 'option', 'should have the option role');
  });
  it('should have a tabIndex of -1 by default', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.props().tabIndex, -1);
  });
  describe('event callbacks', function () {
    it('should fire event callbacks', function () {
      var events = ['onClick', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchStart'];
      var handlers = events.reduce(function (result, n) {
        result[n] = (0, _sinon.spy)();
        return result;
      }, {});
      var wrapper = shallow(_react.default.createElement(_MenuItem.default, handlers));
      events.forEach(function (n) {
        var event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          persist: function persist() {}
        });

        _chai.assert.strictEqual(handlers[n].callCount, 1, "should have called the ".concat(n, " handler"));
      });
    });
  });
  describe('prop: component', function () {
    it('should be able to override the rendered component', function () {
      var wrapper = shallow(_ref8);

      _chai.assert.strictEqual(wrapper.props().component, 'a');

      _chai.assert.strictEqual(wrapper.props().disableRipple, undefined);
    });
  });
  describe('mount', function () {
    it('should not fail with a li > li error message', function () {
      var wrapper1 = mount(_ref9);

      _chai.assert.strictEqual(wrapper1.find('li').length, 1);

      var wrapper2 = mount(_ref10);

      _chai.assert.strictEqual(wrapper2.find('li').length, 1);
    });
  });
});