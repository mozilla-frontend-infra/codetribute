"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _IndeterminateCheckBox = _interopRequireDefault(require("../internal/svg-icons/IndeterminateCheckBox"));

var _testUtils = require("../test-utils");

var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _ref = _react.default.createElement(_Checkbox.default, null);

var _ref2 = _react.default.createElement(_Checkbox.default, null);

var _ref3 = _react.default.createElement(_Checkbox.default, {
  checked: true
});

var _ref4 = _react.default.createElement(_Checkbox.default, {
  indeterminate: true
});

describe('<Checkbox />', function () {
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
  it('should have the classes required for Checkbox', function () {
    _chai.assert.strictEqual((0, _typeof2.default)(classes.root), 'string');

    _chai.assert.strictEqual((0, _typeof2.default)(classes.checked), 'string');

    _chai.assert.strictEqual((0, _typeof2.default)(classes.disabled), 'string');
  });
  it('should render a div with a SwitchBase', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _SwitchBase.default);
  });
  it('should mount without issue', function () {
    mount(_ref3);
  });
  describe('prop: indeterminate', function () {
    it('should render an indeterminate icon', function () {
      var wrapper = mount(_ref4);

      _chai.assert.strictEqual(wrapper.find(_IndeterminateCheckBox.default).length, 1);
    });
  });
});