"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _TableFooter = _interopRequireDefault(require("./TableFooter"));

var _ref = _react.default.createElement(_TableFooter.default, null);

var _ref2 = _react.default.createElement(_TableFooter.default, null);

var _ref3 = _react.default.createElement(_TableFooter.default, {
  component: "div"
});

var _ref4 = _react.default.createElement(_TableFooter.default, {
  className: "woofTableHead"
});

var _ref5 = _react.default.createElement("tr", {
  className: "test"
});

describe('<TableFooter />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a tfoot', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'tfoot');
  });
  it('should render a div', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the user and root class', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass('woofTableHead'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  it('should render children', function () {
    var children = _ref5;
    var wrapper = shallow(_react.default.createElement(_TableFooter.default, null, children));

    _chai.assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});