"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Typography = _interopRequireDefault(require("../Typography"));

var _InputAdornment = _interopRequireDefault(require("./InputAdornment"));

var _ref = _react.default.createElement(_InputAdornment.default, {
  position: "start"
}, "foo");

var _ref2 = _react.default.createElement(_InputAdornment.default, {
  position: "start"
}, "foo");

var _ref3 = _react.default.createElement(_InputAdornment.default, {
  component: "span",
  position: "start"
}, "foo");

var _ref4 = _react.default.createElement(_InputAdornment.default, {
  position: "start"
}, "foo");

var _ref5 = _react.default.createElement(_InputAdornment.default, {
  position: "start"
}, "foo");

var _ref6 = _react.default.createElement(_InputAdornment.default, {
  position: "end"
}, "foo");

var _ref7 = _react.default.createElement(_InputAdornment.default, {
  disableTypography: true,
  position: "start"
}, "foo");

var _ref8 = _react.default.createElement(_InputAdornment.default, {
  position: "start"
}, _react.default.createElement("div", null, "foo"));

describe('<InputAdornment />', function () {
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
  it('should render given component', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.name(), 'span');
  });
  it('should wrap text children in a Typography', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.childAt(0).type(), _Typography.default);
  });
  it('should have the root and start class when position is start', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.positionStart), true);
  });
  it('should have the root and end class when position is end', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.positionEnd), true);
  });
  it('should not wrap text children in a Typography when disableTypography true', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.childAt(0).text(), 'foo');
  });
  it('should render children', function () {
    var wrapper = shallow(_ref8);

    _chai.assert.strictEqual(wrapper.childAt(0).name(), 'div');
  });
});