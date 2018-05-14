"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _CheckCircle = _interopRequireDefault(require("../internal/svg-icons/CheckCircle"));

var _Warning = _interopRequireDefault(require("../internal/svg-icons/Warning"));

var _testUtils = require("../test-utils");

var _StepIcon = _interopRequireDefault(require("./StepIcon"));

var _StepPositionIcon = _interopRequireDefault(require("./StepPositionIcon"));

var _ref = _react.default.createElement(_StepIcon.default, {
  icon: 1,
  completed: true
});

var _ref2 = _react.default.createElement(_StepIcon.default, {
  icon: 1,
  error: true
});

var _ref3 = _react.default.createElement(_StepIcon.default, {
  icon: 1,
  active: true
});

var _ref4 = _react.default.createElement(_StepIcon.default, {
  icon: _react.default.createElement("span", {
    className: "my-icon"
  })
});

describe('<StepIcon />', function () {
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
  it('renders <CheckCircle> when completed', function () {
    var wrapper = mount(_ref);
    var checkCircle = wrapper.find(_CheckCircle.default);

    _chai.assert.strictEqual(checkCircle.length, 1, 'should have an <CheckCircle />');
  });
  it('renders <Warning> when error occured', function () {
    var wrapper = mount(_ref2);
    var warning = wrapper.find(_Warning.default);

    _chai.assert.strictEqual(warning.length, 1, 'should have an <Warning />');
  });
  it('renders <StepPositionIcon> when not completed', function () {
    var wrapper = shallow(_ref3);
    var checkCircle = wrapper.find(_StepPositionIcon.default);

    _chai.assert.strictEqual(checkCircle.length, 1, 'should have an <StepPositionIcon />');

    var props = checkCircle.props();

    _chai.assert.strictEqual(props.position, 1, 'should set position');

    _chai.assert.include(props.className, 'active');
  });
  it('renders the custom icon', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.find('.my-icon').length, 1, 'should have the custom icon');
  });
});