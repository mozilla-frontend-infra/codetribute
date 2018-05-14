"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _RadioButtonChecked = _interopRequireDefault(require("../internal/svg-icons/RadioButtonChecked"));

var _RadioButtonUnchecked = _interopRequireDefault(require("../internal/svg-icons/RadioButtonUnchecked"));

var _testUtils = require("../test-utils");

var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _ref = _react.default.createElement(_Radio.default, null);

var _ref2 = _react.default.createElement(_Radio.default, null);

var _ref3 = _react.default.createElement(_Radio.default, null);

var _ref4 = _react.default.createElement(_Radio.default, {
  checked: true
});

describe('<Radio />', function () {
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
  describe('styleSheet', function () {
    it('should have the classes required for SwitchBase', function () {
      _chai.assert.strictEqual((0, _typeof2.default)(classes.root), 'string');

      _chai.assert.strictEqual((0, _typeof2.default)(classes.checked), 'string');

      _chai.assert.strictEqual((0, _typeof2.default)(classes.disabled), 'string');
    });
  });
  it('should be using SwitchBase', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _SwitchBase.default);
  });
  describe('prop: unchecked', function () {
    it('should render an unchecked icon', function () {
      var wrapper = mount(_ref3);

      _chai.assert.strictEqual(wrapper.find(_RadioButtonUnchecked.default).length, 1);
    });
  });
  describe('prop: checked', function () {
    it('should render a checked icon', function () {
      var wrapper = mount(_ref4);

      _chai.assert.strictEqual(wrapper.find(_RadioButtonChecked.default).length, 1);
    });
  });
});