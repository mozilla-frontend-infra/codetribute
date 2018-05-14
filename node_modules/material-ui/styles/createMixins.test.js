"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _chai = require("chai");

var _createMixins = _interopRequireDefault(require("./createMixins"));

var _createMuiTheme = _interopRequireDefault(require("./createMuiTheme"));

describe('createMixins', function () {
  it('should be able to override the breakpoint', function () {
    var theme = (0, _createMuiTheme.default)();
    var mixins = (0, _createMixins.default)(theme.breakpoints, theme.spacing, {});
    var mixin = mixins.gutters((0, _defineProperty2.default)({
      display: 'flex'
    }, theme.breakpoints.up('sm'), {
      paddingLeft: 1
    }));

    _chai.assert.deepEqual(mixin, {
      '@media (min-width:600px)': {
        paddingLeft: 1,
        paddingRight: 24
      },
      display: 'flex',
      paddingLeft: 16,
      paddingRight: 16
    });
  });
});