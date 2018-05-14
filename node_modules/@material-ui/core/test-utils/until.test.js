"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assert = _interopRequireDefault(require("assert"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _enzyme = require("enzyme");

var _until = _interopRequireDefault(require("./until"));

var _ref = _react.default.createElement("div", null);

var Div = function Div() {
  return _ref;
};

var hoc = function hoc(Component) {
  var _ref2 = _react.default.createElement(Component, null);

  return function () {
    return _ref2;
  };
};

var _ref3 = _react.default.createElement("div", null);

var _ref4 = _react.default.createElement("div", null);

var _ref5 = _react.default.createElement("div", null);

var _ref6 = _react.default.createElement("div", null);

var _ref7 = _react.default.createElement("div", null, _react.default.createElement(Div, null));

var _ref8 = _react.default.createElement("div", null, _react.default.createElement(Div, null));

var _ref9 = _react.default.createElement(Div, null);

var _ref10 = _react.default.createElement("div", null, _react.default.createElement(Div, null));

var _ref11 = _react.default.createElement("div", null);

var _ref12 = _react.default.createElement(Div, null);

var _ref13 = _react.default.createElement(Div, null);

var _ref16 = _react.default.createElement(Div, null);

describe('until', function () {
  it('shallow renders the current wrapper one level deep', function () {
    var EnhancedDiv = hoc(Div);

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(EnhancedDiv, null)), 'Div');

    _assert.default.strictEqual(wrapper.contains(_ref3), true);
  });
  it('shallow renders the current wrapper several levels deep', function () {
    var EnhancedDiv = hoc(hoc(hoc(Div)));

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(EnhancedDiv, null)), 'Div');

    _assert.default.strictEqual(wrapper.contains(_ref4), true);
  });
  it('stops shallow rendering when the wrapper is empty', function () {
    var nullHoc = function nullHoc() {
      return function () {
        return null;
      };
    };

    var EnhancedDiv = nullHoc();

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(EnhancedDiv, null)), 'Div');

    _assert.default.strictEqual(wrapper.html(), null);
  });
  it('shallow renders as much as possible when no selector is provided', function () {
    var EnhancedDiv = hoc(hoc(Div));

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(EnhancedDiv, null)));

    _assert.default.strictEqual(wrapper.contains(_ref5), true);
  });
  it('shallow renders the current wrapper even if the selector never matches', function () {
    var EnhancedDiv = hoc(Div);

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(EnhancedDiv, null)), 'NotDiv');

    _assert.default.strictEqual(wrapper.contains(_ref6), true);
  });
  it('stops shallow rendering when it encounters a DOM element', function () {
    var wrapper = _until.default.call((0, _enzyme.shallow)(_ref7), 'Div');

    _assert.default.strictEqual(wrapper.contains(_ref8), true);
  });
  it('throws when assert.strictEqual called on an empty wrapper', function () {
    _assert.default.throws(function () {
      _until.default.call((0, _enzyme.shallow)(_ref9).find('Foo'), 'div');
    }, Error, 'Method “until” is only meant to be run on a single node. 0 found instead.');
  });
  it('shallow renders non-root wrappers', function () {
    var Container = function Container() {
      return _ref10;
    };

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(Container, null)).find(Div));

    _assert.default.strictEqual(wrapper.contains(_ref11), true);
  }); // eslint-disable-next-line react/prefer-stateless-function

  var Foo =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(Foo, _React$Component);

    function Foo() {
      (0, _classCallCheck2.default)(this, Foo);
      return (0, _possibleConstructorReturn2.default)(this, (Foo.__proto__ || (0, _getPrototypeOf.default)(Foo)).apply(this, arguments));
    }

    (0, _createClass2.default)(Foo, [{
      key: "render",
      value: function render() {
        return _ref12;
      }
    }]);
    return Foo;
  }(_react.default.Component);

  Foo.contextTypes = {
    quux: _propTypes.default.bool.isRequired
  };
  it('context propagation passes down context from the root component', function () {
    var EnhancedFoo = hoc(Foo);
    var options = {
      context: {
        quux: true
      }
    };

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(EnhancedFoo, null), options), 'Foo', options);

    _assert.default.strictEqual(wrapper.context('quux'), true);

    _assert.default.strictEqual(wrapper.contains(_ref13), true);
  }); // eslint-disable-next-line react/no-multi-comp

  var _ref15 = _react.default.createElement(Foo, null);

  var Bar =
  /*#__PURE__*/
  function (_React$Component2) {
    (0, _inherits2.default)(Bar, _React$Component2);

    function Bar() {
      var _ref14;

      var _temp, _this;

      (0, _classCallCheck2.default)(this, Bar);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref14 = Bar.__proto__ || (0, _getPrototypeOf.default)(Bar)).call.apply(_ref14, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "getChildContext", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function value() {
          return {
            quux: true
          };
        }
      }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "render", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function value() {
          return _ref15;
        }
      }), _temp));
    }

    return Bar;
  }(_react.default.Component);

  Object.defineProperty(Bar, "childContextTypes", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      quux: _propTypes.default.bool
    }
  });
  it('context propagation passes down context from an intermediary component', function () {
    var EnhancedBar = hoc(Bar);

    var wrapper = _until.default.call((0, _enzyme.shallow)(_react.default.createElement(EnhancedBar, null)), 'Foo');

    _assert.default.strictEqual(wrapper.context('quux'), true);

    _assert.default.strictEqual(wrapper.contains(_ref16), true);
  });
});