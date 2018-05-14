"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTranslateValue = setTranslateValue;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _Transition = _interopRequireDefault(require("react-transition-group/Transition"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _ownerWindow = _interopRequireDefault(require("../utils/ownerWindow"));

var _withTheme = _interopRequireDefault(require("../styles/withTheme"));

var _transitions = require("../styles/transitions");

var _utils = require("./utils");

// @inheritedComponent Transition
var GUTTER = 24; // Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`

function getTranslateValue(props, node) {
  var direction = props.direction;
  var rect = node.getBoundingClientRect();
  var transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    var computedStyle = (0, _ownerWindow.default)(node).getComputedStyle(node);
    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
  }

  var offsetX = 0;
  var offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    var transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return "translateX(100vw) translateX(-".concat(rect.left - offsetX, "px)");
  } else if (direction === 'right') {
    return "translateX(-".concat(rect.left + rect.width + GUTTER - offsetX, "px)");
  } else if (direction === 'up') {
    return "translateY(100vh) translateY(-".concat(rect.top - offsetY, "px)");
  } // direction === 'down'


  return "translateY(-".concat(rect.top + rect.height + GUTTER - offsetY, "px)");
}

function setTranslateValue(props, node) {
  var transform = getTranslateValue(props, node);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}
/**
 * The Slide transition is used by the [Snackbar](/demos/snackbars) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */


var Slide =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Slide, _React$Component);

  function Slide() {
    var _ref;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, Slide);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref = Slide.__proto__ || (0, _getPrototypeOf.default)(Slide)).call.apply(_ref, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "mounted", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: false
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "transition", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleResize", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: (0, _debounce.default)(function () {
        // Skip configuration where the position is screen size invariant.
        if (_this.props.in || _this.props.direction === 'down' || _this.props.direction === 'right') {
          return;
        }

        var node = _reactDom.default.findDOMNode(_this.transition);

        if (node) {
          setTranslateValue(_this.props, node);
        }
      }, 166)
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleEnter", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        setTranslateValue(_this.props, node);
        (0, _utils.reflow)(node);

        if (_this.props.onEnter) {
          _this.props.onEnter(node);
        }
      }
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleEntering", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        var theme = _this.props.theme;
        var transitionProps = (0, _utils.getTransitionProps)(_this.props, {
          mode: 'enter'
        });
        node.style.webkitTransition = theme.transitions.create('-webkit-transform', (0, _objectSpread2.default)({}, transitionProps, {
          easing: theme.transitions.easing.easeOut
        }));
        node.style.transition = theme.transitions.create('transform', (0, _objectSpread2.default)({}, transitionProps, {
          easing: theme.transitions.easing.easeOut
        }));
        node.style.webkitTransform = 'translate(0, 0)';
        node.style.transform = 'translate(0, 0)';

        if (_this.props.onEntering) {
          _this.props.onEntering(node);
        }
      }
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleExit", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        var theme = _this.props.theme;
        var transitionProps = (0, _utils.getTransitionProps)(_this.props, {
          mode: 'exit'
        });
        node.style.webkitTransition = theme.transitions.create('-webkit-transform', (0, _objectSpread2.default)({}, transitionProps, {
          easing: theme.transitions.easing.sharp
        }));
        node.style.transition = theme.transitions.create('transform', (0, _objectSpread2.default)({}, transitionProps, {
          easing: theme.transitions.easing.sharp
        }));
        setTranslateValue(_this.props, node);

        if (_this.props.onExit) {
          _this.props.onExit(node);
        }
      }
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleExited", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(node) {
        // No need for transitions when the component is hidden
        node.style.webkitTransition = '';
        node.style.transition = '';

        if (_this.props.onExited) {
          _this.props.onExited(node);
        }
      }
    }), _temp));
  }

  (0, _createClass2.default)(Slide, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // state.mounted handle SSR, once the component is mounted, we need
      // to properly hide it.
      if (!this.props.in) {
        // We need to set initial translate values of transition element
        // otherwise component will be shown when in=false.
        this.updatePosition();
      }

      this.mounted = true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.direction !== this.props.direction && !this.props.in) {
        // We need to update the position of the drawer when the direction change and
        // when it's hidden.
        this.updatePosition();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var node = _reactDom.default.findDOMNode(this.transition);

      if (node) {
        node.style.visibility = 'inherit';
        setTranslateValue(this.props, node);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          onEnter = _props.onEnter,
          onEntering = _props.onEntering,
          onExit = _props.onExit,
          onExited = _props.onExited,
          styleProp = _props.style,
          theme = _props.theme,
          other = (0, _objectWithoutProperties2.default)(_props, ["children", "onEnter", "onEntering", "onExit", "onExited", "style", "theme"]);
      var style = {}; // We use this state to handle the server-side rendering.
      // We don't know the width of the children ahead of time.
      // We need to render it.

      if (!this.props.in && !this.mounted) {
        style.visibility = 'hidden';
      }

      style = (0, _objectSpread2.default)({}, style, styleProp, _react.default.isValidElement(children) ? children.props.style : {});
      return _react.default.createElement(_reactEventListener.default, {
        target: "window",
        onResize: this.handleResize
      }, _react.default.createElement(_Transition.default, (0, _extends2.default)({
        onEnter: this.handleEnter,
        onEntering: this.handleEntering,
        onExit: this.handleExit,
        onExited: this.handleExited,
        appear: true,
        style: style,
        ref: function ref(node) {
          _this2.transition = node;
        }
      }, other), children));
    }
  }]);
  return Slide;
}(_react.default.Component);

Slide.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A single child content element.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),

  /**
   * Direction the child node will enter from.
   */
  direction: _propTypes.default.oneOf(['left', 'right', 'up', 'down']),

  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: _propTypes.default.bool,

  /**
   * @ignore
   */
  onEnter: _propTypes.default.func,

  /**
   * @ignore
   */
  onEntering: _propTypes.default.func,

  /**
   * @ignore
   */
  onExit: _propTypes.default.func,

  /**
   * @ignore
   */
  onExited: _propTypes.default.func,

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * @ignore
   */
  theme: _propTypes.default.object.isRequired,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })])
} : {};
Slide.defaultProps = {
  direction: 'down',
  timeout: {
    enter: _transitions.duration.enteringScreen,
    exit: _transitions.duration.leavingScreen
  }
};

var _default = (0, _withTheme.default)()((0, _reactLifecyclesCompat.polyfill)(Slide));

exports.default = _default;