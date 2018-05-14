"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _ExpansionPanelDetails = _interopRequireDefault(require("./ExpansionPanelDetails"));

var _ref = _react.default.createElement(_ExpansionPanelDetails.default, null, "foo");

var _ref2 = _react.default.createElement(_ExpansionPanelDetails.default, {
  className: "woofExpansionPanelDetails"
}, "foo");

var _ref3 = _react.default.createElement(_ExpansionPanelDetails.default, null, _react.default.createElement("div", null, "Hello"));

describe('<ExpansionPanelDetails />', function () {
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

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('woofExpansionPanelDetails'), true);
  });
  it('should render a children element', function () {
    var wrapper = shallow(_ref3);
    var container = wrapper.childAt(0);

    _chai.assert.strictEqual(container.type(), 'div');
  });
});