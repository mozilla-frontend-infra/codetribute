"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactEventListener = _interopRequireDefault(require("react-event-listener"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var styles = {
  root: {
    boxSizing: 'border-box',
    flexShrink: 0
  },
  tile: {
    position: 'relative',
    display: 'block',
    // In case it's not renderd with a div.
    height: '100%',
    overflow: 'hidden'
  },
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%'
  },
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%'
  }
};
exports.styles = styles;

var GridListTile =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(GridListTile, _React$Component);

  function GridListTile() {
    var _ref;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, GridListTile);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref = GridListTile.__proto__ || (0, _getPrototypeOf.default)(GridListTile)).call.apply(_ref, [this].concat(args))), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "imgElement", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "handleResize", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: (0, _debounce.default)(function () {
        _this.fit();
      }, 166)
    }), Object.defineProperty((0, _assertThisInitialized2.default)(_this), "fit", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var imgElement = _this.imgElement;

        if (!imgElement) {
          return;
        }

        if (!imgElement.complete) {
          return;
        }

        if (imgElement.width / imgElement.height > imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight) {
          var _imgElement$classList, _imgElement$classList2;

          (_imgElement$classList = imgElement.classList).remove.apply(_imgElement$classList, (0, _toConsumableArray2.default)(_this.props.classes.imgFullWidth.split(' ')));

          (_imgElement$classList2 = imgElement.classList).add.apply(_imgElement$classList2, (0, _toConsumableArray2.default)(_this.props.classes.imgFullHeight.split(' ')));
        } else {
          var _imgElement$classList3, _imgElement$classList4;

          (_imgElement$classList3 = imgElement.classList).remove.apply(_imgElement$classList3, (0, _toConsumableArray2.default)(_this.props.classes.imgFullHeight.split(' ')));

          (_imgElement$classList4 = imgElement.classList).add.apply(_imgElement$classList4, (0, _toConsumableArray2.default)(_this.props.classes.imgFullWidth.split(' ')));
        }

        imgElement.removeEventListener('load', _this.fit);
      }
    }), _temp));
  }

  (0, _createClass2.default)(GridListTile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ensureImageCover();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.ensureImageCover();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: "ensureImageCover",
    value: function ensureImageCover() {
      if (!this.imgElement) {
        return;
      }

      if (this.imgElement.complete) {
        this.fit();
      } else {
        this.imgElement.addEventListener('load', this.fit);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          cols = _props.cols,
          Component = _props.component,
          rows = _props.rows,
          other = (0, _objectWithoutProperties2.default)(_props, ["children", "classes", "className", "cols", "component", "rows"]);
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _classnames.default)(classes.root, className)
      }, other), _react.default.createElement(_reactEventListener.default, {
        target: "window",
        onResize: this.handleResize
      }), _react.default.createElement("div", {
        className: classes.tile
      }, _react.default.Children.map(children, function (child) {
        if (child && child.type === 'img') {
          return _react.default.cloneElement(child, {
            key: 'img',
            ref: function ref(node) {
              _this2.imgElement = node;
            }
          });
        }

        return child;
      })));
    }
  }]);
  return GridListTile;
}(_react.default.Component);

GridListTile.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: _propTypes.default.node,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Width of the tile in number of grid cells.
   */
  cols: _propTypes.default.number,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * Height of the tile in number of grid cells.
   */
  rows: _propTypes.default.number
} : {};
GridListTile.defaultProps = {
  cols: 1,
  component: 'li',
  rows: 1
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiGridListTile'
})(GridListTile);

exports.default = _default;