"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactEventListener = _interopRequireDefault(require("react-event-listener"));

var _ownerDocument = _interopRequireDefault(require("dom-helpers/ownerDocument"));

// @inheritedComponent EventListener
var isDescendant = function isDescendant(el, target) {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }

  return false;
};
/**
 * Listen for click events that are triggered outside of the component children.
 */


var ClickAwayListener =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ClickAwayListener, _React$Component);

  function ClickAwayListener() {
    var _ref;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, ClickAwayListener);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref = ClickAwayListener.__proto__ || (0, _getPrototypeOf.default)(ClickAwayListener)).call.apply(_ref, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "mounted", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: false
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleClickAway", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        // Ignore events that have been `event.preventDefault()` marked.
        if (event.defaultPrevented) {
          return;
        } // IE11 support, which trigger the handleClickAway even after the unbind


        if (!_this.mounted) {
          return;
        }

        var el = _reactDom.default.findDOMNode((0, _assertThisInitialized2.default)(_this));

        var doc = (0, _ownerDocument.default)(el);

        if (doc.documentElement && doc.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
          _this.props.onClickAway(event);
        }
      }
    }), _temp));
  }

  (0, _createClass2.default)(ClickAwayListener, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          mouseEvent = _props.mouseEvent,
          touchEvent = _props.touchEvent,
          onClickAway = _props.onClickAway,
          other = (0, _objectWithoutProperties2.default)(_props, ["children", "mouseEvent", "touchEvent", "onClickAway"]);
      var listenerProps = {};

      if (mouseEvent !== false) {
        listenerProps[mouseEvent] = this.handleClickAway;
      }

      if (touchEvent !== false) {
        listenerProps[touchEvent] = this.handleClickAway;
      }

      return _react.default.createElement(_reactEventListener.default, (0, _extends2.default)({
        target: "document"
      }, listenerProps, other), children);
    }
  }]);
  return ClickAwayListener;
}(_react.default.Component);

ClickAwayListener.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes.default.node.isRequired,
  mouseEvent: _propTypes.default.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),
  onClickAway: _propTypes.default.func.isRequired,
  touchEvent: _propTypes.default.oneOf(['onTouchStart', 'onTouchEnd', false])
} : {};
ClickAwayListener.defaultProps = {
  mouseEvent: 'onMouseUp',
  touchEvent: 'onTouchEnd'
};
var _default = ClickAwayListener;
exports.default = _default;