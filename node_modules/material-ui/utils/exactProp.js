"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exactProp;
exports.specialProperty = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.
var specialProperty = "exact-prop: \u200B";
exports.specialProperty = specialProperty;

function exactProp(propTypes, componentNameInError) {
  return (0, _objectSpread3.default)({}, propTypes, (0, _defineProperty2.default)({}, specialProperty, function (props) {
    var unknownProps = (0, _keys.default)(props).filter(function (prop) {
      return !propTypes.hasOwnProperty(prop);
    });

    if (unknownProps.length > 0) {
      return new TypeError("".concat(componentNameInError, ": unknown props found: ").concat(unknownProps.join(', '), ". Please remove the unknown properties."));
    }

    return null;
  }));
}