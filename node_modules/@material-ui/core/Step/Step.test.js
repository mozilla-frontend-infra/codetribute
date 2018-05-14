"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Step = _interopRequireDefault(require("./Step"));

var _ref = _react.default.createElement("h1", {
  className: "hello-world"
}, "Hello World");

var _ref2 = _react.default.createElement("h1", {
  key: 1,
  className: "hello-world"
}, "Hello World");

var _ref3 = _react.default.createElement("p", {
  key: 2,
  className: "hay"
}, "How are you?");

var _ref4 = _react.default.createElement("h1", {
  active: false,
  className: "hello-world"
}, "Hello World");

describe('<Step />', function () {
  var shallow;
  var mount;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('merges styles and other props into the root node', function () {
    var wrapper = shallow(_react.default.createElement(_Step.default, {
      index: 1,
      style: {
        paddingRight: 200,
        color: 'purple',
        border: '1px solid tomato'
      },
      role: "Menuitem",
      orientation: "horizontal"
    }));

    var _wrapper$props = wrapper.props(),
        style = _wrapper$props.style,
        role = _wrapper$props.role;

    _chai.assert.strictEqual(style.paddingRight, 200);

    _chai.assert.strictEqual(style.color, 'purple');

    _chai.assert.strictEqual(style.border, '1px solid tomato');

    _chai.assert.strictEqual(role, 'Menuitem');
  });
  describe('rendering children', function () {
    it('renders children', function () {
      var children = _ref;
      var wrapper = shallow(_react.default.createElement(_Step.default, {
        label: "Step One",
        index: 1,
        orientation: "horizontal"
      }, children));

      _chai.assert.strictEqual(wrapper.find('.hello-world').length, 1);
    });
    it('renders children with all props passed through', function () {
      var children = [_ref2, _ref3];
      var wrapper = shallow(_react.default.createElement(_Step.default, {
        active: false,
        completed: true,
        disabled: true,
        index: 0,
        orientation: "horizontal"
      }, children));
      var child1 = wrapper.find('.hello-world');
      var child2 = wrapper.find('.hay');
      [child1, child2].forEach(function (child) {
        _chai.assert.strictEqual(child.length, 1);

        _chai.assert.strictEqual(child.props().active, false);

        _chai.assert.strictEqual(child.props().completed, true);

        _chai.assert.strictEqual(child.props().disabled, true);

        _chai.assert.strictEqual(child.props().icon, 1);
      });
    });
    it('honours children overriding props passed through', function () {
      var children = _ref4;
      var wrapper = shallow(_react.default.createElement(_Step.default, {
        active: true,
        label: "Step One",
        orientation: "horizontal",
        index: 0
      }, children));
      var childWrapper = wrapper.find('.hello-world');

      _chai.assert.strictEqual(childWrapper.props().active, false);
    });
  });
});