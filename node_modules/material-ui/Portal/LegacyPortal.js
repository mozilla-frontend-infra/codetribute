"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ownerDocument = _interopRequireDefault(require("dom-helpers/ownerDocument"));

var _exactProp = _interopRequireDefault(require("../utils/exactProp"));

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return _reactDom.default.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return (0, _ownerDocument.default)(_reactDom.default.findDOMNode(element));
}
/**
 * @ignore - internal component.
 *
 * This module will soon be gone. We should drop it as soon as react@15.x support stop.
 */


var LegacyPortal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(LegacyPortal, _React$Component);

  function LegacyPortal() {
    var _ref;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, LegacyPortal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref = LegacyPortal.__proto__ || (0, _getPrototypeOf.default)(LegacyPortal)).call.apply(_ref, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "getMountNode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.mountNode;
      }
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "mountOverlayTarget", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (!_this.overlayTarget) {
          _this.overlayTarget = document.createElement('div');
          _this.mountNode = getContainer(_this.props.container, getOwnerDocument((0, _assertThisInitialized2.default)(_this)).body);

          _this.mountNode.appendChild(_this.overlayTarget);
        }
      }
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "unmountOverlayTarget", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.overlayTarget) {
          _this.mountNode.removeChild(_this.overlayTarget);

          _this.overlayTarget = null;
        }

        _this.mountNode = null;
      }
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "unrenderOverlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (_this.overlayTarget) {
          _reactDom.default.unmountComponentAtNode(_this.overlayTarget);

          _this.overlayInstance = null;
        }
      }
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "renderOverlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var overlay = _this.props.children;

        _this.mountOverlayTarget();

        var initialRender = !_this.overlayInstance;
        _this.overlayInstance = _reactDom.default.unstable_renderSubtreeIntoContainer((0, _assertThisInitialized2.default)(_this), overlay, _this.overlayTarget, function () {
          if (initialRender && _this.props.onRendered) {
            _this.props.onRendered();
          }
        });
      }
    }), _temp));
  }

  (0, _createClass2.default)(LegacyPortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.renderOverlay();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.overlayTarget && prevProps.container !== this.props.container) {
        this.mountNode.removeChild(this.overlayTarget);
        this.mountNode = getContainer(this.props.container, getOwnerDocument(this).body);
        this.mountNode.appendChild(this.overlayTarget);
      }

      this.renderOverlay();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      this.unrenderOverlay();
      this.unmountOverlayTarget();
    }
    /**
     * @public
     */

  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return LegacyPortal;
}(_react.default.Component);

LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes.default.element.isRequired,
  container: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  onRendered: _propTypes.default.func
} : {};
LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? (0, _exactProp.default)(LegacyPortal.propTypes, 'LegacyPortal') : {};
var _default = LegacyPortal;
exports.default = _default;