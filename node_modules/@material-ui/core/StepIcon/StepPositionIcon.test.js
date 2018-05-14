"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _StepPositionIcon = _interopRequireDefault(require("./StepPositionIcon"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

var _ref = _react.default.createElement(_StepPositionIcon.default, {
  position: 1
});

var _ref2 = _react.default.createElement(_StepPositionIcon.default, {
  position: 3
});

describe('<StepPositionIcon />', function () {
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
  it('renders a <SvgIcon>', function () {
    var wrapper = shallow(_ref);

    _chai.assert.strictEqual(wrapper.find(_SvgIcon.default).length, 1);
  });
  it('contains text "3" when position is "3"', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.find('text').text(), '3');
  });
});