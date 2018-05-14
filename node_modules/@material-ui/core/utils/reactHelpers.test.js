"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _reactHelpers = require("./reactHelpers");

var _ = require("../");

var _ref = _react.default.createElement("div", null);

describe('utils/reactHelpers.js', function () {
  describe('isMuiElement', function () {
    it('should match static muiName property', function () {
      var Component = function Component() {
        return null;
      };

      Component.muiName = 'Component';

      _chai.assert.strictEqual((0, _reactHelpers.isMuiElement)(_react.default.createElement(Component, null), ['Component']), true);

      _chai.assert.strictEqual((0, _reactHelpers.isMuiElement)(_ref, ['Input']), false);

      _chai.assert.strictEqual((0, _reactHelpers.isMuiElement)(null, ['SvgIcon']), false);

      _chai.assert.strictEqual((0, _reactHelpers.isMuiElement)('TextNode', ['SvgIcon']), false);
    });
    it('should be truthy for matching components', function () {
      [[_.Input, 'Input'], [_.ListItemAvatar, 'ListItemAvatar'], [_.ListItemSecondaryAction, 'ListItemSecondaryAction'], [_.SvgIcon, 'SvgIcon']].forEach(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
            Component = _ref3[0],
            muiName = _ref3[1];

        _chai.assert.strictEqual((0, _reactHelpers.isMuiElement)(_react.default.createElement(Component, null), [muiName]), true);
      });
    });
  });
  describe('isMuiComponent', function () {
    it('should match static muiName property', function () {
      [[_.Input, 'Input'], [_.ListItemAvatar, 'ListItemAvatar'], [_.ListItemSecondaryAction, 'ListItemSecondaryAction'], [_.SvgIcon, 'SvgIcon']].forEach(function (_ref4) {
        var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
            Component = _ref5[0],
            muiName = _ref5[1];

        _chai.assert.strictEqual((0, _reactHelpers.isMuiComponent)(Component, [muiName]), true);
      });
    });
  });
});