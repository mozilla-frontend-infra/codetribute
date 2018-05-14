"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _testUtils = require("../test-utils");

var _TableSortLabel = _interopRequireDefault(require("./TableSortLabel"));

var _ref = _react.default.createElement(_TableSortLabel.default, null);

var _ref2 = _react.default.createElement(_TableSortLabel.default, null);

var _ref3 = _react.default.createElement(_TableSortLabel.default, null);

var _ref4 = _react.default.createElement(_TableSortLabel.default, null);

var _ref5 = _react.default.createElement(_TableSortLabel.default, {
  direction: "desc"
});

var _ref6 = _react.default.createElement(_TableSortLabel.default, {
  direction: "asc"
});

var _ref7 = _react.default.createElement(_TableSortLabel.default, null);

describe('<TableSortLabel />', function () {
  var shallow;
  var mount;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    mount = (0, _testUtils.createMount)();
    classes = (0, _testUtils.getClasses)(_ref);
  });
  after(function () {
    mount.cleanUp();
  });
  it('should render TableSortLabel', function () {
    var wrapper = shallow(_ref2);

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have root class');
  });
  it('should set the active class when active', function () {
    var activeFlag = true;
    var wrapper = shallow(_react.default.createElement(_TableSortLabel.default, {
      active: activeFlag
    }));

    _chai.assert.strictEqual(wrapper.hasClass(classes.active), true);
  });
  it('should not set the active class when not active', function () {
    var activeFlag = false;
    var wrapper = shallow(_react.default.createElement(_TableSortLabel.default, {
      active: activeFlag
    }));

    _chai.assert.strictEqual(wrapper.hasClass(classes.active), false);
  });
  describe('has an icon', function () {
    it('should have one child with the icon class', function () {
      var wrapper = shallow(_ref3);
      var iconChildren = wrapper.find(".".concat(classes.icon));

      _chai.assert.strictEqual(iconChildren.length, 1);
    });
    it('by default should have desc direction class', function () {
      var wrapper = shallow(_ref4);
      var icon = wrapper.find(".".concat(classes.icon)).first();

      _chai.assert.strictEqual(icon.hasClass(classes.iconDirectionAsc), false);

      _chai.assert.strictEqual(icon.hasClass(classes.iconDirectionDesc), true);
    });
    it('when given direction desc should have desc direction class', function () {
      var wrapper = shallow(_ref5);
      var icon = wrapper.find(".".concat(classes.icon)).first();

      _chai.assert.strictEqual(icon.hasClass(classes.iconDirectionAsc), false);

      _chai.assert.strictEqual(icon.hasClass(classes.iconDirectionDesc), true);
    });
    it('when given direction asc should have asc direction class', function () {
      var wrapper = shallow(_ref6);
      var icon = wrapper.find(".".concat(classes.icon)).first();

      _chai.assert.strictEqual(icon.hasClass(classes.iconDirectionAsc), true);

      _chai.assert.strictEqual(icon.hasClass(classes.iconDirectionDesc), false);
    });
  });
  describe('mount', function () {
    it('should mount without error', function () {
      mount(_ref7);
    });
  });
});