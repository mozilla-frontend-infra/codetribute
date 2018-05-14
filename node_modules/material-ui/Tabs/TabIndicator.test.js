"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _TabIndicator = _interopRequireDefault(require("./TabIndicator"));

describe('<TabIndicator />', function () {
  var shallow;
  var classes;
  var style = {
    left: 1,
    width: 2
  };

  var _ref = _react.default.createElement(_TabIndicator.default, {
    color: "secondary",
    style: style
  });

  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });

  var _ref2 = _react.default.createElement(_TabIndicator.default, {
    color: "secondary",
    style: style
  });

  it('should render with the root class', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'span');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  var _ref3 = _react.default.createElement(_TabIndicator.default, {
    color: "secondary",
    style: style
  });

  describe('prop: style', function () {
    it('should be applied on the root element', function () {
      var wrapper = shallow(_ref3);

      _chai.assert.strictEqual(wrapper.props().style, style, 'should apply directly the property');
    });
  });

  var _ref4 = _react.default.createElement(_TabIndicator.default, {
    color: "secondary",
    style: style,
    className: "foo"
  });

  describe('prop: className', function () {
    it('should append the className on the root element', function () {
      var wrapper = shallow(_ref4);

      _chai.assert.strictEqual(wrapper.name(), 'span');

      _chai.assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the property class');
    });
  });
});