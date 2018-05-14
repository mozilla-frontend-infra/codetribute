import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import keycode from 'keycode';
import { polyfill } from 'react-lifecycles-compat';
import ownerWindow from '../utils/ownerWindow';
import withStyles from '../styles/withStyles';
import { listenForFocusKeys, detectFocusVisible } from '../utils/focusVisible';
import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler';
export const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none',
    // Reset
    '-webkit-appearance': 'none',
    // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.

    },
    '&$disabled': {
      pointerEvents: 'none',
      // Disable link interactions
      cursor: 'default'
    }
  },
  disabled: {},
  focusVisible: {}
};
/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */

class ButtonBase extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), Object.defineProperty(this, "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {}
    }), Object.defineProperty(this, "onFocusVisibleHandler", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: event => {
        this.keyDown = false;
        this.setState({
          focusVisible: true
        });

        if (this.props.onFocusVisible) {
          this.props.onFocusVisible(event);
        }
      }
    }), Object.defineProperty(this, "onRippleRef", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: node => {
        this.ripple = node;
      }
    }), Object.defineProperty(this, "ripple", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(this, "keyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: false
    }), Object.defineProperty(this, "button", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(this, "focusVisibleTimeout", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(this, "focusVisibleCheckTime", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 50
    }), Object.defineProperty(this, "focusVisibleMaxCheckTimes", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 5
    }), Object.defineProperty(this, "handleKeyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: event => {
        const {
          component,
          focusRipple,
          onKeyDown,
          onClick
        } = this.props;
        const key = keycode(event); // Check if key is already down to avoid repeats being counted as multiple activations

        if (focusRipple && !this.keyDown && this.state.focusVisible && this.ripple && key === 'space') {
          this.keyDown = true;
          event.persist();
          this.ripple.stop(event, () => {
            this.ripple.start(event);
          });
        }

        if (onKeyDown) {
          onKeyDown(event);
        } // Keyboard accessibility for non interactive elements


        if (event.target === event.currentTarget && component && component !== 'button' && (key === 'space' || key === 'enter')) {
          event.preventDefault();

          if (onClick) {
            onClick(event);
          }
        }
      }
    }), Object.defineProperty(this, "handleKeyUp", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: event => {
        if (this.props.focusRipple && keycode(event) === 'space' && this.ripple && this.state.focusVisible) {
          this.keyDown = false;
          event.persist();
          this.ripple.stop(event, () => this.ripple.pulsate(event));
        }

        if (this.props.onKeyUp) {
          this.props.onKeyUp(event);
        }
      }
    }), Object.defineProperty(this, "handleMouseDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createRippleHandler(this, 'MouseDown', 'start', () => {
        clearTimeout(this.focusVisibleTimeout);

        if (this.state.focusVisible) {
          this.setState({
            focusVisible: false
          });
        }
      })
    }), Object.defineProperty(this, "handleMouseUp", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createRippleHandler(this, 'MouseUp', 'stop')
    }), Object.defineProperty(this, "handleMouseLeave", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createRippleHandler(this, 'MouseLeave', 'stop', event => {
        if (this.state.focusVisible) {
          event.preventDefault();
        }
      })
    }), Object.defineProperty(this, "handleTouchStart", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createRippleHandler(this, 'TouchStart', 'start')
    }), Object.defineProperty(this, "handleTouchEnd", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createRippleHandler(this, 'TouchEnd', 'stop')
    }), Object.defineProperty(this, "handleTouchMove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createRippleHandler(this, 'TouchMove', 'stop')
    }), Object.defineProperty(this, "handleBlur", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: createRippleHandler(this, 'Blur', 'stop', () => {
        clearTimeout(this.focusVisibleTimeout);

        if (this.state.focusVisible) {
          this.setState({
            focusVisible: false
          });
        }
      })
    }), Object.defineProperty(this, "handleFocus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: event => {
        if (this.props.disabled) {
          return;
        } // Fix for https://github.com/facebook/react/issues/7769


        if (!this.button) {
          this.button = event.currentTarget;
        }

        event.persist();
        detectFocusVisible(this, this.button, () => {
          this.onFocusVisibleHandler(event);
        });

        if (this.props.onFocus) {
          this.props.onFocus(event);
        }
      }
    }), _temp;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.focusVisible === 'undefined') {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled
      };
    } // The blur won't fire when the disabled state is set on a focused input.
    // We need to book keep the focused state manually.


    if (!prevState.prevState && nextProps.disabled && prevState.focusVisible) {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled
      };
    }

    return {
      lastDisabled: nextProps.disabled
    };
  }

  componentDidMount() {
    this.button = ReactDOM.findDOMNode(this);
    listenForFocusKeys(ownerWindow(this.button));

    if (this.props.action) {
      this.props.action({
        focusVisible: () => {
          this.setState({
            focusVisible: true
          });
          this.button.focus();
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.focusRipple && !this.props.disableRipple && !prevState.focusVisible && this.state.focusVisible) {
      this.ripple.pulsate();
    }
  }

  componentWillUnmount() {
    this.button = null;
    clearTimeout(this.focusVisibleTimeout);
  }

  render() {
    const _props = this.props,
          {
      action,
      buttonRef,
      centerRipple,
      children,
      classes,
      className: classNameProp,
      component,
      disabled,
      disableRipple,
      focusRipple,
      focusVisibleClassName,
      onBlur,
      onFocus,
      onFocusVisible,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      tabIndex,
      TouchRippleProps,
      type
    } = _props,
          other = _objectWithoutProperties(_props, ["action", "buttonRef", "centerRipple", "children", "classes", "className", "component", "disabled", "disableRipple", "focusRipple", "focusVisibleClassName", "onBlur", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "type"]);

    const className = classNames(classes.root, {
      [classes.disabled]: disabled,
      [classes.focusVisible]: this.state.focusVisible,
      [focusVisibleClassName]: this.state.focusVisible
    }, classNameProp);
    const buttonProps = {};
    let ComponentProp = component;

    if (!ComponentProp) {
      if (other.href) {
        ComponentProp = 'a';
      } else {
        ComponentProp = 'button';
      }
    }

    if (ComponentProp === 'button') {
      buttonProps.type = type || 'button';
      buttonProps.disabled = disabled;
    } else {
      buttonProps.role = 'button';
    }

    return React.createElement(ComponentProp, _extends({
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchMove: this.handleTouchMove,
      onTouchStart: this.handleTouchStart,
      tabIndex: disabled ? '-1' : tabIndex,
      className: className,
      ref: buttonRef
    }, buttonProps, other), children, !disableRipple && !disabled ? React.createElement(TouchRipple, _extends({
      innerRef: this.onRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null);
  }

}

ButtonBase.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `focusVisible()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: PropTypes.func,

  /**
   * Use that property to pass a ref callback to the native button component.
   */
  buttonRef: PropTypes.func,

  /**
   * If `true`, the ripples will be centered.
   * They won't start at the cursor interaction position.
   */
  centerRipple: PropTypes.bool,

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * If `true`, the base button will be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * `disableRipple` must also be `false`.
   */
  focusRipple: PropTypes.bool,

  /**
   * This property can help a person know which element has the keyboard focus.
   * The class name will be applied when the element gain the focus throught a keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible feature](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rational for using this feature [is explain here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,

  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,

  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,

  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,

  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,

  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,

  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,

  /**
   * @ignore
   */
  role: PropTypes.string,

  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Properties applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,

  /**
   * @ignore
   */
  type: PropTypes.string
} : {};
ButtonBase.defaultProps = {
  centerRipple: false,
  disableRipple: false,
  focusRipple: false,
  tabIndex: '0',
  type: 'button'
};
export default withStyles(styles, {
  name: 'MuiButtonBase'
})(polyfill(ButtonBase));