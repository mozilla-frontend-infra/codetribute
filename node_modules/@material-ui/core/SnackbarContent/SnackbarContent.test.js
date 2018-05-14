"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _SnackbarContent = _interopRequireDefault(require("./SnackbarContent"));

var _ref = _react.default.createElement(_SnackbarContent.default, {
  message: "message"
});

var _ref2 = _react.default.createElement(_SnackbarContent.default, {
  message: "message"
});

var _ref3 = _react.default.createElement("span", null, "action");

var _ref4 = _react.default.createElement("span", null, "message");

describe('<SnackbarContent />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      untilSelector: 'withStyles(Paper)'
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a Paper with classes', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('prop: action', function () {
    it('should render the action', function () {
      var action = _ref3;
      var wrapper = shallow(_react.default.createElement(_SnackbarContent.default, {
        message: "message",
        action: action
      }));

      _chai.assert.strictEqual(wrapper.childAt(1).hasClass(classes.action), true);

      _chai.assert.strictEqual(wrapper.childAt(1).contains(action), true);
    });
  });
  describe('prop: message', function () {
    it('should render the message', function () {
      var message = _ref4;
      var wrapper = shallow(_react.default.createElement(_SnackbarContent.default, {
        message: message
      }));

      _chai.assert.strictEqual(wrapper.childAt(0).hasClass(classes.message), true);

      _chai.assert.strictEqual(wrapper.childAt(0).contains(message), true);
    });
  });
});