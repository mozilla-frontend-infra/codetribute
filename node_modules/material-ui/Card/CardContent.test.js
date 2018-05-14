"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _CardContent = _interopRequireDefault(require("./CardContent"));

var _ref = _react.default.createElement(_CardContent.default, null);

var _ref2 = _react.default.createElement(_CardContent.default, null);

describe('<CardContent />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'CardContent'
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div with the root class', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});