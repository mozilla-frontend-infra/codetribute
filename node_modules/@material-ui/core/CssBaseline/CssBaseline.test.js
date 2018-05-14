"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _CssBaseline = _interopRequireDefault(require("./CssBaseline"));

var _ref = _react.default.createElement(_CssBaseline.default, null);

var _ref2 = _react.default.createElement(_CssBaseline.default, null, _react.default.createElement("div", null));

describe('<CssBaseline />', function () {
  var mount;
  before(function () {
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render nothing', function () {
    var wrapper = mount(_ref);

    _chai.assert.strictEqual(wrapper.childAt(0).children().length, 0, 'should have no children');
  });
  it('should render a div with the root class', function () {
    var wrapper = mount(_ref2);

    _chai.assert.strictEqual(wrapper.childAt(0).children().name(), 'div');
  });
});