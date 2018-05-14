"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _chai = require("chai");

var _createMuiTheme = _interopRequireDefault(require("./createMuiTheme"));

var _colors = require("../colors");

describe('createMuiTheme', function () {
  it('should have a palette', function () {
    var muiTheme = (0, _createMuiTheme.default)();

    _chai.assert.strictEqual((0, _typeof2.default)(_createMuiTheme.default), 'function', 'should be a function');

    _chai.assert.ok(muiTheme.palette, 'should have a palette');
  });
  it('should have the custom palette', function () {
    var muiTheme = (0, _createMuiTheme.default)({
      palette: {
        primary: {
          main: _colors.deepOrange[500]
        },
        secondary: {
          main: _colors.green.A400
        }
      }
    });

    _chai.assert.strictEqual(muiTheme.palette.primary.main, _colors.deepOrange[500], 'should have a palette');

    _chai.assert.strictEqual(muiTheme.palette.secondary.main, _colors.green.A400, 'should have a palette');
  });
  it('should allow providing a partial structure', function () {
    var muiTheme = (0, _createMuiTheme.default)({
      transitions: {
        duration: {
          shortest: 150
        }
      }
    });

    _chai.assert.notStrictEqual(muiTheme.transitions.duration.shorter, undefined);
  });
  describe('shadows', function () {
    it('should provide the default array', function () {
      var muiTheme = (0, _createMuiTheme.default)();

      _chai.assert.strictEqual(muiTheme.shadows[2], '0px 1px 5px 0px rgba(0, 0, 0, 0.2),' + '0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)');
    });
    it('should override the array as expected', function () {
      var shadows = ['none', 1, 1, 1, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 10, 10, 10, 11, 11];
      var muiTheme = (0, _createMuiTheme.default)({
        shadows: shadows
      });

      _chai.assert.strictEqual(muiTheme.shadows, shadows);
    });
  });
});