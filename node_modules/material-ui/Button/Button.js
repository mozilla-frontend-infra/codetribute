"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _colorManipulator = require("../styles/colorManipulator");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _helpers = require("../utils/helpers");

// @inheritedComponent ButtonBase
var styles = function styles(theme) {
  return {
    root: (0, _objectSpread2.default)({}, theme.typography.button, {
      lineHeight: '1.4em',
      // Improve readability for multiline button.
      boxSizing: 'border-box',
      minWidth: theme.spacing.unit * 11,
      minHeight: 36,
      padding: "".concat(theme.spacing.unit, "px ").concat(theme.spacing.unit * 2, "px"),
      borderRadius: 2,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['background-color', 'box-shadow'], {
        duration: theme.transitions.duration.short
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          backgroundColor: 'transparent'
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }),
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    },
    flatPrimary: {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    flatSecondary: {
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: (0, _colorManipulator.fade)(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    colorInherit: {
      color: 'inherit'
    },
    raised: {
      color: theme.palette.getContrastText(theme.palette.grey[300]),
      backgroundColor: theme.palette.grey[300],
      boxShadow: theme.shadows[2],
      '&$focusVisible': {
        boxShadow: theme.shadows[6]
      },
      '&:active': {
        boxShadow: theme.shadows[8]
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.action.disabledBackground
      },
      '&:hover': {
        backgroundColor: theme.palette.grey.A100,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.grey[300]
        },
        '&$disabled': {
          backgroundColor: theme.palette.action.disabledBackground
        }
      }
    },
    raisedPrimary: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main
        }
      }
    },
    raisedSecondary: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main
        }
      }
    },
    focusVisible: {},
    disabled: {},
    fab: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      fontSize: 24,
      height: 56,
      boxShadow: theme.shadows[6],
      '&:active': {
        boxShadow: theme.shadows[12]
      }
    },
    mini: {
      width: 40,
      height: 40
    },
    sizeSmall: {
      padding: "".concat(theme.spacing.unit - 1, "px ").concat(theme.spacing.unit, "px"),
      minWidth: theme.spacing.unit * 8,
      minHeight: 32,
      fontSize: theme.typography.pxToRem(13)
    },
    sizeLarge: {
      padding: "".concat(theme.spacing.unit, "px ").concat(theme.spacing.unit * 3, "px"),
      minWidth: theme.spacing.unit * 14,
      minHeight: 40,
      fontSize: theme.typography.pxToRem(15)
    },
    fullWidth: {
      width: '100%'
    }
  };
};

exports.styles = styles;

function Button(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      disabled = props.disabled,
      disableFocusRipple = props.disableFocusRipple,
      fullWidth = props.fullWidth,
      focusVisibleClassName = props.focusVisibleClassName,
      mini = props.mini,
      size = props.size,
      variant = props.variant,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "focusVisibleClassName", "mini", "size", "variant"]);
  var fab = variant === 'fab';
  var raised = variant === 'raised';
  var flat = !raised && !fab;
  var className = (0, _classnames.default)(classes.root, (_classNames = {}, (0, _defineProperty2.default)(_classNames, classes.raised, raised || fab), (0, _defineProperty2.default)(_classNames, classes.fab, fab), (0, _defineProperty2.default)(_classNames, classes.mini, fab && mini), (0, _defineProperty2.default)(_classNames, classes.colorInherit, color === 'inherit'), (0, _defineProperty2.default)(_classNames, classes.flatPrimary, flat && color === 'primary'), (0, _defineProperty2.default)(_classNames, classes.flatSecondary, flat && color === 'secondary'), (0, _defineProperty2.default)(_classNames, classes.raisedPrimary, !flat && color === 'primary'), (0, _defineProperty2.default)(_classNames, classes.raisedSecondary, !flat && color === 'secondary'), (0, _defineProperty2.default)(_classNames, classes["size".concat((0, _helpers.capitalize)(size))], size !== 'medium'), (0, _defineProperty2.default)(_classNames, classes.disabled, disabled), (0, _defineProperty2.default)(_classNames, classes.fullWidth, fullWidth), _classNames), classNameProp);
  return _react.default.createElement(_ButtonBase.default, (0, _extends2.default)({
    className: className,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: (0, _classnames.default)(classes.focusVisible, focusVisibleClassName)
  }, other), _react.default.createElement("span", {
    className: classes.label
  }, children));
}

Button.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the button.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes.default.oneOf(['default', 'inherit', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * If `true`, the button will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: _propTypes.default.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: _propTypes.default.string,

  /**
   * If `true`, and `variant` is `'fab'`, will use mini floating action button styling.
   */
  mini: _propTypes.default.bool,

  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),

  /**
   * @ignore
   */
  type: _propTypes.default.string,

  /**
   * The type of button.
   */
  variant: _propTypes.default.oneOf(['flat', 'raised', 'fab'])
} : {};
Button.defaultProps = {
  color: 'default',
  disabled: false,
  disableFocusRipple: false,
  fullWidth: false,
  mini: false,
  size: 'medium',
  type: 'button',
  variant: 'flat'
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiButton'
})(Button);

exports.default = _default;