"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Card = _interopRequireDefault(require("./Card"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _ref = _react.default.createElement(_Card.default, null);

var _ref2 = _react.default.createElement(_Card.default, null);

var _ref3 = _react.default.createElement(_Card.default, {
  className: "card"
});

var _ref4 = _react.default.createElement(_Card.default, {
  raised: true
});

var _ref5 = _react.default.createElement(_Card.default, {
  "data-my-prop": "woofCard"
});

describe('<Card />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render Paper with the root class & with 2dp', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.type(), _Paper.default);

    _chai.assert.strictEqual(wrapper.props().elevation, 2);
  });
  it('should have the root and custom class', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('card'), true);
  });
  it('should render Paper with 8dp', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.props().elevation, 8);
  });
  it('should spread custom props on the root node', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.prop('data-my-prop'), 'woofCard', 'custom prop should be woofCard');
  });
});