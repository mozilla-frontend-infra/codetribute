"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _StepConnector = _interopRequireDefault(require("./StepConnector"));

var _ref = _react.default.createElement(_StepConnector.default, {
  orientation: "horizontal"
});

var _ref2 = _react.default.createElement(_StepConnector.default, {
  orientation: "horizontal"
});

var _ref3 = _react.default.createElement(_StepConnector.default, {
  orientation: "vertical"
});

describe('<StepConnector />', function () {
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
  describe('rendering', function () {
    it('renders a div containing a span', function () {
      var wrapper = shallow(_ref);

      _chai.assert.strictEqual(wrapper.type(), 'div');

      var line = wrapper.find('span');

      _chai.assert.strictEqual(line.length, 1);
    });
    it('has the class lineHorizontal when horizontal', function () {
      var wrapper = shallow(_ref2);
      var line = wrapper.find('span');

      _chai.assert.include(line.props().className, 'StepConnector-lineHorizontal');
    });
    it('has the class lineVertical when vertical', function () {
      var wrapper = shallow(_ref3);
      var line = wrapper.find('span');

      _chai.assert.include(line.props().className, 'StepConnector-lineVertical');
    });
  });
});