"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _CardActions = _interopRequireDefault(require("./CardActions"));

var _ref = _react.default.createElement(_CardActions.default, null);

var _ref2 = _react.default.createElement(_CardActions.default, {
  className: "cardActions"
});

var _ref3 = _react.default.createElement("div", {
  id: "child1"
});

var _ref4 = _react.default.createElement("div", {
  id: "child2"
});

var _ref5 = _react.default.createElement("div", {
  id: "child3"
});

var _ref6 = _react.default.createElement(_CardActions.default, {
  disableActionSpacing: true
}, _react.default.createElement("div", {
  id: "child1"
}), _react.default.createElement("div", {
  id: "child2"
}));

describe('<CardActions />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  it('should render a div with the root and custom class', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.name(), 'div');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);

    _chai.assert.strictEqual(wrapper.hasClass('cardActions'), true);
  });
  it('should pass the action class to children', function () {
    var child3 = false;
    var wrapper = shallow(_react.default.createElement(_CardActions.default, null, _ref3, _ref4, child3 && _ref5));

    _chai.assert.strictEqual(wrapper.find('#child1').hasClass(classes.action), true);

    _chai.assert.strictEqual(wrapper.find('#child2').hasClass(classes.action), true);
  });
  it('should not pass the action class to children', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.find('#child1').hasClass(classes.action), false);

    _chai.assert.strictEqual(wrapper.find('#child2').hasClass(classes.action), false);
  });
});