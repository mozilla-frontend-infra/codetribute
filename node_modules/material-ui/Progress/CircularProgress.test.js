"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _CircularProgress = _interopRequireDefault(require("./CircularProgress"));

var _ref = _react.default.createElement(_CircularProgress.default, null);

var _ref2 = _react.default.createElement(_CircularProgress.default, null);

var _ref3 = _react.default.createElement(_CircularProgress.default, null);

var _ref4 = _react.default.createElement(_CircularProgress.default, {
  color: "primary"
});

var _ref5 = _react.default.createElement(_CircularProgress.default, {
  color: "secondary"
});

var _ref6 = _react.default.createElement(_CircularProgress.default, {
  className: "woofCircularProgress"
});

var _ref7 = _react.default.createElement(_CircularProgress.default, null);

var _ref8 = _react.default.createElement(_CircularProgress.default, null);

var _ref9 = _react.default.createElement(_CircularProgress.default, {
  size: 60
});

var _ref10 = _react.default.createElement(_CircularProgress.default, {
  variant: "static",
  value: 70
});

var _ref11 = _react.default.createElement(_CircularProgress.default, {
  variant: "determinate"
});

var _ref12 = _react.default.createElement(_CircularProgress.default, {
  variant: "determinate",
  value: 70
});

describe('<CircularProgress />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div with the root class', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');
  });
  it('should render with the primary color by default', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
  });
  it('should render with the primary color', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
  });
  it('should render with the secondary color', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.hasClass('woofCircularProgress'), true);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.props().role, 'progressbar');
  });
  it('should contain an SVG with the svg class, and a circle with the circle class', function () {
    var wrapper = shallow(_ref7);
    var svg = wrapper.childAt(0);

    _chai.assert.strictEqual(svg.name(), 'svg');

    _chai.assert.strictEqual(svg.hasClass(classes.svgIndeterminate), true);

    _chai.assert.strictEqual(svg.childAt(0).name(), 'circle', 'should be a circle');

    _chai.assert.strictEqual(svg.childAt(0).hasClass(classes.circle), true, 'should have the circle class');
  });
  it('should render intermediate variant by default', function () {
    var wrapper = shallow(_ref8);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    var svg = wrapper.childAt(0);

    _chai.assert.strictEqual(svg.childAt(0).hasClass(classes.circleIndeterminate), true, 'should have the circleIndeterminate class');
  });
  it('should render with a different size', function () {
    var wrapper = shallow(_ref9);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.props().style.width, 60, 'should have width correctly set');

    _chai.assert.strictEqual(wrapper.props().style.height, 60, 'should have width correctly set');

    var svg = wrapper.childAt(0);

    _chai.assert.strictEqual(svg.name(), 'svg');

    _chai.assert.strictEqual(svg.childAt(0).name(), 'circle');

    _chai.assert.strictEqual(svg.childAt(0).props().cx, 25, 'should have cx correctly set');

    _chai.assert.strictEqual(svg.childAt(0).props().cy, 25, 'should have cx correctly set');
  });
  describe('prop: variant="static', function () {
    it('should set strokeDasharray of circle', function () {
      var wrapper = shallow(_ref10);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      var svg = wrapper.childAt(0);
      var style = svg.childAt(0).props().style;

      _chai.assert.strictEqual(style.strokeDasharray, '125.664', 'should have strokeDasharray set');

      _chai.assert.strictEqual(style.strokeDashoffset, '37.699px', 'should have strokeDashoffset set');

      _chai.assert.strictEqual(wrapper.props()['aria-valuenow'], 70);
    });
  });
  describe('prop: variant="determinate"', function () {
    it('should render with determinate classes', function () {
      var wrapper = shallow(_ref11);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      var svg = wrapper.childAt(0);

      _chai.assert.strictEqual(svg.name(), 'svg');

      _chai.assert.strictEqual(svg.hasClass(classes.svgIndeterminate), false, 'should not have the svgIndeterminate class');
    });
    it('should set strokeDasharray of circle', function () {
      var wrapper = shallow(_ref12);

      _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

      var svg = wrapper.childAt(0);
      var style = svg.childAt(0).props().style;

      _chai.assert.strictEqual(style.strokeDasharray, '125.664', 'should have strokeDasharray set');

      _chai.assert.strictEqual(style.strokeDashoffset, '11.310px', 'should have strokeDashoffset set');

      _chai.assert.strictEqual(wrapper.props()['aria-valuenow'], 70);
    });
  });
});