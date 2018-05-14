"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _ListItemIcon = _interopRequireDefault(require("./ListItemIcon"));

var _ref = _react.default.createElement(_ListItemIcon.default, null, _react.default.createElement("span", null));

var _ref2 = _react.default.createElement(_ListItemIcon.default, null, _react.default.createElement("span", null));

var _ref3 = _react.default.createElement(_ListItemIcon.default, {
  className: "foo"
}, _react.default.createElement("span", {
  className: "bar"
}));

describe('<ListItemIcon />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a span', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'span');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');

    _chai.assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});