"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Menu = require("../Menu");

var _Input = _interopRequireDefault(require("../Input"));

var _Select = _interopRequireDefault(require("./Select"));

var _ref = _react.default.createElement(_Input.default, null);

var _ref2 = _react.default.createElement(_Menu.MenuItem, {
  value: "1"
}, "1");

var _ref3 = _react.default.createElement(_Menu.MenuItem, {
  value: "2"
}, "2");

var _ref4 = _react.default.createElement(_Menu.MenuItem, {
  value: ""
}, _react.default.createElement("em", null, "None"));

var _ref5 = _react.default.createElement(_Menu.MenuItem, {
  value: 10
}, "Ten");

var _ref6 = _react.default.createElement(_Menu.MenuItem, {
  value: 20
}, "Twenty");

var _ref7 = _react.default.createElement(_Menu.MenuItem, {
  value: 30
}, "Thirty");

describe('<Select />', function () {
  var shallow;
  var classes;
  var mount;
  var props = {
    input: _ref,
    children: [_ref2, _ref3]
  };
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_react.default.createElement(_Select.default, props));
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render a correct top element', function () {
    var wrapper = shallow(_react.default.createElement(_Select.default, props));

    _chai.assert.strictEqual(wrapper.type(), _Input.default);
  });
  it('should provide the classes to the input component', function () {
    var wrapper = shallow(_react.default.createElement(_Select.default, props));

    _chai.assert.deepEqual(wrapper.props().inputProps.classes, classes);
  });
  it('should be able to mount the component', function () {
    var wrapper = mount(_react.default.createElement(_Select.default, (0, _extends2.default)({}, props, {
      value: 10
    }), _ref4, _ref5, _ref6, _ref7));

    _chai.assert.strictEqual(wrapper.find('input').props().value, 10);
  });
});