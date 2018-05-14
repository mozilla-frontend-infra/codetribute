"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _brcast = _interopRequireDefault(require("brcast"));

var _testUtils = require("../test-utils");

var _themeListener = require("./themeListener");

var _withTheme = _interopRequireDefault(require("./withTheme"));

var _ref = _react.default.createElement("div", null);

var Empty = function Empty() {
  return _ref;
};

describe('withTheme', function () {
  var shallow;
  var context;
  var mount;
  var broadcast;
  before(function () {
    shallow = (0, _testUtils.createShallow)();
    mount = (0, _testUtils.createMount)();
    broadcast = (0, _brcast.default)();
    context = (0, _defineProperty2.default)({}, _themeListener.CHANNEL, broadcast);
  });
  after(function () {
    mount.cleanUp();
  });
  it('should use the theme provided by the context', function () {
    var theme = {
      themeProperty: 'foo'
    };
    broadcast.setState(theme);
    var ThemedComponent = (0, _withTheme.default)()(Empty);
    var wrapper = shallow(_react.default.createElement(ThemedComponent, null), {
      context: context
    });

    _chai.assert.strictEqual(wrapper.props().theme, theme);
  });
  it('should rerender when the theme is updated', function () {
    var theme = {
      themeProperty: 'foo'
    };
    broadcast.setState(theme);
    var ThemedComponent = (0, _withTheme.default)()(Empty);
    var wrapper = mount(_react.default.createElement(ThemedComponent, null), {
      context: context
    });

    _chai.assert.strictEqual(wrapper.instance().state.theme, theme);

    var newTheme = {
      themeProperty: 'bar'
    };
    broadcast.setState(newTheme);

    _chai.assert.strictEqual(wrapper.instance().state.theme, newTheme);
  });
});