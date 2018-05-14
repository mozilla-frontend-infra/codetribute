"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _DialogContent = _interopRequireDefault(require("./DialogContent"));

var _ref = _react.default.createElement(_DialogContent.default, null);

var _ref2 = _react.default.createElement(_DialogContent.default, null);

var _ref3 = _react.default.createElement(_DialogContent.default, {
  "data-my-prop": "woofDialogContent"
});

var _ref4 = _react.default.createElement(_DialogContent.default, {
  className: "woofDialogContent"
});

var _ref5 = _react.default.createElement("p", null);

describe('<DialogContent />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofDialogContent', 'custom prop should be woofDialogContent');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofDialogContent'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', function () {
    var children = _ref5;
    var wrapper = shallow(_react.default.createElement(_DialogContent.default, null, children));

    _chai.assert.strictEqual(wrapper.children().equals(children), true);
  });
});