"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createRippleHandler(instance, eventName, action, cb) {
  return function handleEvent(event) {
    if (cb) {
      cb.call(instance, event);
    }

    if (event.defaultPrevented) {
      return false;
    }

    if (instance.ripple) {
      instance.ripple[action](event);
    }

    if (instance.props && typeof instance.props["on".concat(eventName)] === 'function') {
      instance.props["on".concat(eventName)](event);
    }

    return true;
  };
}

var _default = createRippleHandler;
exports.default = _default;