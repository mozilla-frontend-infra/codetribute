"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Portal = _interopRequireDefault(require("./Portal"));

var _LegacyPortal = _interopRequireDefault(require("./LegacyPortal"));

var _default = _reactDom.default.createPortal ? _Portal.default : _LegacyPortal.default;

exports.default = _default;