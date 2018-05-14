"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _map = _interopRequireDefault(require("@babel/runtime/core-js/map"));

var _sinon = require("sinon");

var _chai = require("chai");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jss = require("jss");

var _JssProvider = _interopRequireDefault(require("react-jss/lib/JssProvider"));

var _server = require("react-dom/server");

var _testUtils = require("../test-utils");

var _createMuiTheme = _interopRequireDefault(require("./createMuiTheme"));

var _Button = _interopRequireDefault(require("../Button"));

var _createGenerateClassName = _interopRequireDefault(require("./createGenerateClassName"));

var _withTheme = _interopRequireDefault(require("./withTheme"));

var _MuiThemeProvider = _interopRequireDefault(require("./MuiThemeProvider"));

function getThemeSpy() {
  var themeSpy = (0, _sinon.spy)();

  var ThemeSpy = function ThemeSpy(props) {
    themeSpy(props.theme);
    return props.children;
  };

  ThemeSpy.propTypes = {
    children: _propTypes.default.node.isRequired,
    theme: _propTypes.default.object
  };
  return {
    ThemeSpy: (0, _withTheme.default)()(ThemeSpy),
    themeSpy: themeSpy
  };
}

function getOptionsSpy() {
  var optionsSpy = (0, _sinon.spy)();

  var OptionsSpy = function OptionsSpy(props, context) {
    optionsSpy(context.muiThemeProviderOptions);
    return props.children;
  };

  OptionsSpy.propTypes = {
    children: _propTypes.default.element.isRequired
  };
  OptionsSpy.contextTypes = {
    muiThemeProviderOptions: _propTypes.default.object
  };
  return {
    OptionsSpy: OptionsSpy,
    optionsSpy: optionsSpy
  };
}

var _ref = _react.default.createElement(_Button.default, null, "Hello World");

var _ref2 = _react.default.createElement("span", null, "Foo");

var _ref3 = _react.default.createElement("span", null, "Bar");

var _ref4 = _react.default.createElement("div", null);

var _ref5 = _react.default.createElement("div", null, "Foo");

describe('<MuiThemeProvider />', function () {
  var mount;
  before(function () {
    mount = (0, _testUtils.createMount)();
  });
  after(function () {
    mount.cleanUp();
  });
  describe('server side', function () {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should be able to extract the styles', function () {
      var theme = (0, _createMuiTheme.default)();
      var sheetsRegistry = new _jss.SheetsRegistry();
      var generateClassName = (0, _createGenerateClassName.default)();
      var markup = (0, _server.renderToString)(_react.default.createElement(_JssProvider.default, {
        registry: sheetsRegistry,
        generateClassName: generateClassName
      }, _react.default.createElement(_MuiThemeProvider.default, {
        theme: theme,
        sheetsManager: new _map.default()
      }, _ref)));

      _chai.assert.notStrictEqual(markup.match('Hello World'), null);

      _chai.assert.strictEqual(sheetsRegistry.registry.length, 3);

      _chai.assert.strictEqual(sheetsRegistry.toString().length > 4000, true);

      _chai.assert.strictEqual(sheetsRegistry.registry[0].classes.root, 'MuiTouchRipple-root-19');

      _chai.assert.deepEqual(sheetsRegistry.registry[1].classes, {
        disabled: 'MuiButtonBase-disabled-17',
        focusVisible: 'MuiButtonBase-focusVisible-18',
        root: 'MuiButtonBase-root-16'
      }, 'the class names should be deterministic');

      _chai.assert.strictEqual(sheetsRegistry.registry[2].classes.root, 'MuiButton-root-1');
    });
  });
  describe('mount', function () {
    it('should work with nesting theme', function () {
      var _getThemeSpy = getThemeSpy(),
          themeSpy1 = _getThemeSpy.themeSpy,
          ThemeSpy1 = _getThemeSpy.ThemeSpy;

      var _getThemeSpy2 = getThemeSpy(),
          themeSpy2 = _getThemeSpy2.themeSpy,
          ThemeSpy2 = _getThemeSpy2.ThemeSpy;

      var _getThemeSpy3 = getThemeSpy(),
          themeSpy3 = _getThemeSpy3.themeSpy,
          ThemeSpy3 = _getThemeSpy3.ThemeSpy;

      var theme1 = (0, _createMuiTheme.default)({
        status: {
          color: 'orange'
        }
      });

      var theme2 = function theme2(outerTheme) {
        return (0, _objectSpread2.default)({}, outerTheme, {
          status: {
            color: 'green'
          }
        });
      };

      var theme3 = (0, _createMuiTheme.default)({
        status: {
          color: 'yellow'
        }
      });
      var wrapper = mount(_react.default.createElement(_MuiThemeProvider.default, {
        theme: theme1
      }, _react.default.createElement(ThemeSpy1, null, _react.default.createElement(_MuiThemeProvider.default, {
        theme: theme2
      }, _react.default.createElement(ThemeSpy2, null, _ref2)), _react.default.createElement(_MuiThemeProvider.default, {
        theme: theme3
      }, _react.default.createElement(ThemeSpy3, null, _ref3)))));

      _chai.assert.strictEqual(themeSpy1.callCount, 1);

      _chai.assert.strictEqual(themeSpy1.args[0][0].status.color, 'orange');

      _chai.assert.strictEqual(themeSpy2.callCount, 1);

      _chai.assert.strictEqual(themeSpy2.args[0][0].status.color, 'green');

      _chai.assert.strictEqual(themeSpy3.callCount, 1);

      _chai.assert.strictEqual(themeSpy3.args[0][0].status.color, 'yellow');

      wrapper.setProps({
        theme: (0, _createMuiTheme.default)({
          status: {
            color: 'blue'
          }
        })
      });

      _chai.assert.strictEqual(themeSpy1.callCount, 3);

      _chai.assert.strictEqual(themeSpy1.args[2][0].status.color, 'blue');

      _chai.assert.strictEqual(themeSpy2.callCount, 3);

      _chai.assert.strictEqual(themeSpy2.args[2][0].status.color, 'green');

      _chai.assert.strictEqual(themeSpy3.callCount, 3);

      _chai.assert.strictEqual(themeSpy3.args[2][0].status.color, 'yellow');
    });
    it('should forward the parent options', function () {
      var theme = (0, _createMuiTheme.default)({
        status: {
          color: 'orange'
        }
      });
      var optionsSpy = (0, _sinon.spy)();

      function OptionsSpy(props, context) {
        optionsSpy(context.muiThemeProviderOptions);
        return _ref4;
      }

      OptionsSpy.contextTypes = {
        muiThemeProviderOptions: _propTypes.default.object.isRequired
      };
      mount(_react.default.createElement(_MuiThemeProvider.default, {
        theme: theme,
        disableStylesGeneration: true
      }, _react.default.createElement(_MuiThemeProvider.default, {
        theme: theme
      }, _react.default.createElement(OptionsSpy, null))));

      _chai.assert.strictEqual(optionsSpy.callCount, 1);

      _chai.assert.deepEqual(optionsSpy.args[0][0], {
        disableStylesGeneration: true
      });
    });
  });
  describe('prop: disableStylesGeneration', function () {
    it('should provide the property down the context', function () {
      var _getOptionsSpy = getOptionsSpy(),
          optionsSpy = _getOptionsSpy.optionsSpy,
          OptionsSpy = _getOptionsSpy.OptionsSpy;

      var theme = (0, _createMuiTheme.default)();
      var wrapper = mount(_react.default.createElement(_MuiThemeProvider.default, {
        theme: theme,
        disableStylesGeneration: true
      }, _react.default.createElement(OptionsSpy, null, _ref5)));

      _chai.assert.strictEqual(optionsSpy.callCount, 1);

      _chai.assert.strictEqual(optionsSpy.args[0][0].disableStylesGeneration, true);

      wrapper.setProps({
        disableStylesGeneration: false
      });

      _chai.assert.strictEqual(optionsSpy.args[1][0].disableStylesGeneration, false);
    });
  });
});