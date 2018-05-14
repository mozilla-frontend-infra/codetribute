"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _TableRow = _interopRequireDefault(require("./TableRow"));

var _ref = _react.default.createElement(_TableRow.default, null);

var _ref2 = _react.default.createElement(_TableRow.default, null);

var _ref3 = _react.default.createElement(_TableRow.default, {
  component: "div"
});

var _ref4 = _react.default.createElement(_TableRow.default, {
  "data-my-prop": "woofTableRow"
});

var _ref5 = _react.default.createElement(_TableRow.default, {
  className: "woofTableRow"
});

var _ref6 = _react.default.createElement("td", {
  className: "test"
});

var _ref7 = _react.default.createElement(_TableRow.default, null);

var _ref8 = _react.default.createElement(_TableRow.default, null);

describe('<TableRow />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a tr', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'tr');
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofTableRow', 'custom prop should be woofTableRow');
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass('woofTableRow'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', function () {
    var children = _ref6;
    var wrapper = shallow(_react.default.createElement(_TableRow.default, null, children));

    _chai.assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
  it('should render with the head class when in the context of a table head', function () {
    var wrapper = shallow(_ref7);
    wrapper.setContext({
      table: {
        head: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.head), true, 'should have the head class');
  });
  it('should render with the footer class when in the context of a table footer', function () {
    var wrapper = shallow(_ref8);
    wrapper.setContext({
      table: {
        footer: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.footer), true, 'should have the footer class');
  });
});