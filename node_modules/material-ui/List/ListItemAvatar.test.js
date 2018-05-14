"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _testUtils = require("../test-utils");

var _Avatar = _interopRequireDefault(require("../Avatar"));

var _ListItemAvatar = _interopRequireDefault(require("./ListItemAvatar"));

var _ref = _react.default.createElement(_ListItemAvatar.default, {
  className: "foo"
}, _react.default.createElement(_Avatar.default, {
  className: "bar"
}));

var _ref2 = _react.default.createElement(_ListItemAvatar.default, {
  className: "foo"
}, _react.default.createElement(_Avatar.default, {
  className: "bar"
}));

var _ref3 = _react.default.createElement(_ListItemAvatar.default, null, _react.default.createElement(_Avatar.default, null));

var _ref4 = _react.default.createElement(_ListItemAvatar.default, null, _react.default.createElement(_Avatar.default, null));

describe('<ListItemAvatar />', function () {
  var shallow;
  var classes;
  before(function () {
    shallow = (0, _testUtils.createShallow)({
      dive: true
    });
    classes = (0, _testUtils.getClasses)(_ref, {
      context: {
        dense: true
      }
    });
  });
  it('should render with the user and root classes', function () {
    var wrapper = shallow(_ref2, {
      context: {
        dense: true
      }
    });

    _chai.assert.strictEqual(wrapper.hasClass('foo'), true, 'should have the "foo" class');

    _chai.assert.strictEqual(wrapper.hasClass('bar'), true, 'should have the "bar" class');

    _chai.assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
  describe('List', function () {
    before(function () {
      _consoleErrorMock.default.spy();
    });
    after(function () {
      _consoleErrorMock.default.reset();
    });
    it('should render an Avatar', function () {
      var wrapper = shallow(_ref3, {
        context: {
          dense: true
        }
      });

      _chai.assert.strictEqual(wrapper.type(), _Avatar.default);

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 0);
    });
    it('should warn in a wrong context', function () {
      shallow(_ref4);

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);
    });
  });
});