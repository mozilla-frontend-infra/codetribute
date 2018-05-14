"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _FormGroup = _interopRequireDefault(require("./FormGroup"));

var _ref = _react.default.createElement(_FormGroup.default, null);

var _ref2 = _react.default.createElement(_FormGroup.default, {
  className: "woofFormGroup"
});

var _ref3 = _react.default.createElement(_FormGroup.default, null, _react.default.createElement("div", {
  className: "woofFormGroup"
}));

describe('<FormGroup />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div with the root and user classes', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('woofFormGroup'), true);
  });
  it('should render a div with a div child', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.children('span').length, 0);

    _chai.assert.strictEqual(wrapper.children('div').length, 1);

    _chai.assert.strictEqual(wrapper.children('div').first().hasClass('woofFormGroup'), true);
  });
});