"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _ListItemSecondaryAction = _interopRequireDefault(require("./ListItemSecondaryAction"));

var _ref = _react.default.createElement(_ListItemSecondaryAction.default, null);

var _ref2 = _react.default.createElement(_ListItemSecondaryAction.default, null);

var _ref3 = _react.default.createElement(_ListItemSecondaryAction.default, {
  className: "woofListItemSecondaryAction"
});

describe('<ListItemSecondaryAction />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'ListItemSecondaryAction'
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass('woofListItemSecondaryAction'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});