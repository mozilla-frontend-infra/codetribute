"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _StepContent = _interopRequireDefault(require("./StepContent"));

var _Collapse = _interopRequireDefault(require("../transitions/Collapse"));

var _ref = _react.default.createElement("div", {
  className: "test-content"
}, "This is my content!");

describe('<StepContent />', function () {
  var shallow;
  var mount;
  var props = {
    orientation: 'vertical'
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('renders a div', function () {
    var wrapper = shallow(_react.default.createElement(_StepContent.default, props, "Here is the content"));

    _chai.assert.strictEqual(wrapper.type(), 'div');
  });
  it('merges styles and other props into the root node', function () {
    var wrapper = shallow(_react.default.createElement(_StepContent.default, (0, _extends2.default)({
      style: {
        paddingRight: 200,
        color: 'purple',
        border: '1px solid tomato'
      },
      role: "Tabpanel"
    }, props), "Lorem ipsum"));

    var _wrapper$props = wrapper.props(),
        style = _wrapper$props.style,
        role = _wrapper$props.role;

    _chai.assert.strictEqual(style.paddingRight, 200);

    _chai.assert.strictEqual(style.color, 'purple');

    _chai.assert.strictEqual(style.border, '1px solid tomato');

    _chai.assert.strictEqual(role, 'Tabpanel');
  });
  it('renders children inside an Collapse component', function () {
    var wrapper = shallow(_react.default.createElement(_StepContent.default, props, _ref));
    var collapse = wrapper.find(_Collapse.default);

    _chai.assert.strictEqual(collapse.length, 1);

    var content = collapse.find('.test-content');

    _chai.assert.strictEqual(content.length, 1);

    _chai.assert.strictEqual(content.props().children, 'This is my content!');
  });
});