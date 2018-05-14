"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _Badge = _interopRequireDefault(require("./Badge"));

var _ref = _react.default.createElement(_Badge.default, {
  badgeContent: 1
}, "Hello World");

var _ref2 = _react.default.createElement("div", {
  className: "unique"
}, "Hello World");

var _ref8 = _react.default.createElement(_Badge.default, {
  badgeContent: 10,
  color: "error"
}, _react.default.createElement("span", null));

describe('<Badge />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref);
  });
  var testChildren = _ref2;

  var _ref3 = _react.default.createElement(_Badge.default, {
    badgeContent: 10
  }, testChildren);

  it('renders children and badgeContent', function () {
    var wrapper = shallow(_ref3);

    _chai.assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');

    _chai.assert.ok(wrapper.find('span').length, 'should contain the badgeContent');
  });
  it('renders children and overwrite badge class', function () {
    var badgeClassName = 'testBadgeClassName';
    var wrapper = shallow(_react.default.createElement(_Badge.default, {
      badgeContent: 10,
      classes: {
        badge: badgeClassName
      }
    }, testChildren));

    _chai.assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');

    _chai.assert.strictEqual(wrapper.find('span').at(1).hasClass('testBadgeClassName'), true);
  });

  var _ref4 = _react.default.createElement(_Badge.default, {
    badgeContent: 10
  }, testChildren);

  it('renders children by default', function () {
    var wrapper = shallow(_ref4);

    _chai.assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');
  });

  var _ref5 = _react.default.createElement(_Badge.default, {
    badgeContent: 10,
    className: "testClassName"
  }, testChildren);

  it('renders children and className', function () {
    var wrapper = shallow(_ref5);

    _chai.assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');

    _chai.assert.strictEqual(wrapper.is('.testClassName'), true, 'should contain the className');
  });

  var _ref6 = _react.default.createElement(_Badge.default, {
    badgeContent: 10,
    color: "primary"
  }, testChildren);

  it('renders children and have primary styles', function () {
    var wrapper = shallow(_ref6);

    _chai.assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');

    _chai.assert.strictEqual(wrapper.find('span').at(1).hasClass(classes.colorPrimary), true, 'should have primary class');
  });

  var _ref7 = _react.default.createElement(_Badge.default, {
    badgeContent: 10,
    color: "secondary"
  }, testChildren);

  it('renders children and have secondary styles', function () {
    var wrapper = shallow(_ref7);

    _chai.assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');

    _chai.assert.strictEqual(wrapper.find('span').at(1).hasClass(classes.colorSecondary), true);
  });
  it('have error class', function () {
    var wrapper = shallow(_ref8);

    _chai.assert.strictEqual(wrapper.find('span').at(2).hasClass(classes.colorError), true);
  });
  it('renders children and overwrite root styles', function () {
    var style = {
      backgroundColor: 'red'
    };
    var wrapper = shallow(_react.default.createElement(_Badge.default, {
      badgeContent: 10,
      style: style
    }, testChildren));

    _chai.assert.strictEqual(wrapper.contains(testChildren), true, 'should contain the children');

    _chai.assert.strictEqual(wrapper.props().style.backgroundColor, style.backgroundColor, 'should overwrite badge backgroundColor');
  });
});