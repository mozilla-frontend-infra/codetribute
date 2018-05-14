"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _createPalette = _interopRequireDefault(require("./createPalette"));

var _createTypography = _interopRequireDefault(require("./createTypography"));

describe('createTypography', function () {
  var palette;
  before(function () {
    palette = (0, _createPalette.default)({});
  });
  it('should create a material design typography according to spec', function () {
    var typography = (0, _createTypography.default)(palette, {});

    _chai.assert.strictEqual(typography.fontSize, 14);
  });
  it('should create a typography with custom fontSize', function () {
    var typography = (0, _createTypography.default)(palette, {
      fontSize: 15
    });

    _chai.assert.strictEqual(typography.fontSize, 15);
  });
  it('should accept a function', function () {
    var typography = (0, _createTypography.default)(palette, function (paletteCurrent) {
      _chai.assert.strictEqual(palette, paletteCurrent);

      return {
        fontSize: 15
      };
    });

    _chai.assert.strictEqual(typography.fontSize, 15);
  });
  it('should accept a custom font size', function () {
    var typography = (0, _createTypography.default)(palette, {
      fontSize: 16
    });

    _chai.assert.strictEqual(typography.body1.fontSize, '1rem', 'should be 16px');
  });
  it('should create a typography with a custom baseFontSize', function () {
    var typography = (0, _createTypography.default)(palette, {
      htmlFontSize: 10
    });

    _chai.assert.strictEqual(typography.display4.fontSize, '11.2rem');
  });
  it('should create a typography with custom display4', function () {
    var customFontSize = '18px';
    var typography = (0, _createTypography.default)(palette, {
      display4: {
        fontSize: customFontSize
      }
    });

    _chai.assert.strictEqual(typography.display4.fontSize, customFontSize);
  });
});