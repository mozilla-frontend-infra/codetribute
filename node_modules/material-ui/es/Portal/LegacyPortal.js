import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from 'dom-helpers/ownerDocument';
import exactProp from '../utils/exactProp';

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}
/**
 * @ignore - internal component.
 *
 * This module will soon be gone. We should drop it as soon as react@15.x support stop.
 */


class LegacyPortal extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), Object.defineProperty(this, "getMountNode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {
        return this.mountNode;
      }
    }), Object.defineProperty(this, "mountOverlayTarget", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {
        if (!this.overlayTarget) {
          this.overlayTarget = document.createElement('div');
          this.mountNode = getContainer(this.props.container, getOwnerDocument(this).body);
          this.mountNode.appendChild(this.overlayTarget);
        }
      }
    }), Object.defineProperty(this, "unmountOverlayTarget", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {
        if (this.overlayTarget) {
          this.mountNode.removeChild(this.overlayTarget);
          this.overlayTarget = null;
        }

        this.mountNode = null;
      }
    }), Object.defineProperty(this, "unrenderOverlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {
        if (this.overlayTarget) {
          ReactDOM.unmountComponentAtNode(this.overlayTarget);
          this.overlayInstance = null;
        }
      }
    }), Object.defineProperty(this, "renderOverlay", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: () => {
        const overlay = this.props.children;
        this.mountOverlayTarget();
        const initialRender = !this.overlayInstance;
        this.overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(this, overlay, this.overlayTarget, () => {
          if (initialRender && this.props.onRendered) {
            this.props.onRendered();
          }
        });
      }
    }), _temp;
  }

  componentDidMount() {
    this.mounted = true;
    this.renderOverlay();
  }

  componentDidUpdate(prevProps) {
    if (this.overlayTarget && prevProps.container !== this.props.container) {
      this.mountNode.removeChild(this.overlayTarget);
      this.mountNode = getContainer(this.props.container, getOwnerDocument(this).body);
      this.mountNode.appendChild(this.overlayTarget);
    }

    this.renderOverlay();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unrenderOverlay();
    this.unmountOverlayTarget();
  }
  /**
   * @public
   */


  render() {
    return null;
  }

}

LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.element.isRequired,
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  onRendered: PropTypes.func
} : {};
LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? exactProp(LegacyPortal.propTypes, 'LegacyPortal') : {};
export default LegacyPortal;