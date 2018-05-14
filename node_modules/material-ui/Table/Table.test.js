"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Table = _interopRequireDefault(require("./Table"));

var _ref = _react.default.createElement(_Table.default, null, "foo");

var _ref2 = _react.default.createElement(_Table.default, null, "foo");

var _ref3 = _react.default.createElement(_Table.default, {
  component: "div"
}, "foo");

var _ref4 = _react.default.createElement(_Table.default, {
  "data-my-prop": "woofTable"
}, "foo");

var _ref5 = _react.default.createElement(_Table.default, {
  className: "woofTable"
}, "foo");

var _ref6 = _react.default.createElement("tbody", {
  className: "test"
});

var _ref7 = _react.default.createElement(_Table.default, null, "foo");

describe('<Table />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a table', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'table');
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofTable', 'custom prop should be woofTable');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass('woofTable'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', function () {
    var children = _ref6;
    var wrapper = shallow(_react.default.createElement(_Table.default, null, children));

    _chai.assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should define table in the child context', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.deepStrictEqual(wrapper.instance().getChildContext().table, {});
  });
});