"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _TableBody = _interopRequireDefault(require("./TableBody"));

var _ref = _react.default.createElement(_TableBody.default, null, "foo");

var _ref2 = _react.default.createElement(_TableBody.default, null, "foo");

var _ref3 = _react.default.createElement(_TableBody.default, {
  component: "div"
}, "foo");

var _ref4 = _react.default.createElement(_TableBody.default, {
  className: "woofTableBody"
}, "foo");

var _ref5 = _react.default.createElement("tr", {
  className: "test"
});

var _ref6 = _react.default.createElement(_TableBody.default, null, "foo");

describe('<TableBody />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a tbody', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'tbody');
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the user and root class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofTableBody'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', function () {
    var children = _ref5;
    var wrapper = shallow(_react.default.createElement(_TableBody.default, null, children));

    _chai.assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should define table.body in the child context', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.instance().getChildContext().table.body, true);
  });
});