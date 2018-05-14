"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _colorManipulator = require("./colorManipulator");

describe('utils/colorManipulator', function () {
  beforeEach(function () {
    _consoleErrorMock.default.spy();
  });
  afterEach(function () {
    _consoleErrorMock.default.reset();
  });
  describe('recomposeColor', function () {
    it('converts a decomposed rgb color object to a string` ', function () {
      _chai.assert.strictEqual((0, _colorManipulator.recomposeColor)({
        type: 'rgb',
        values: [255, 255, 255]
      }), 'rgb(255, 255, 255)');
    });
    it('converts a decomposed rgba color object to a string` ', function () {
      _chai.assert.strictEqual((0, _colorManipulator.recomposeColor)({
        type: 'rgba',
        values: [255, 255, 255, 0.5]
      }), 'rgba(255, 255, 255, 0.5)');
    });
    it('converts a decomposed hsl color object to a string` ', function () {
      _chai.assert.strictEqual((0, _colorManipulator.recomposeColor)({
        type: 'hsl',
        values: [100, 50, 25]
      }), 'hsl(100, 50%, 25%)');
    });
    it('converts a decomposed hsla color object to a string` ', function () {
      _chai.assert.strictEqual((0, _colorManipulator.recomposeColor)({
        type: 'hsla',
        values: [100, 50, 25, 0.5]
      }), 'hsla(100, 50%, 25%, 0.5)');
    });
  });
  describe('convertHexToRGB', function () {
    it('converts a short hex color to an rgb color` ', function () {
      _chai.assert.strictEqual((0, _colorManipulator.convertHexToRGB)('#9f3'), 'rgb(153, 255, 51)');
    });
    it('converts a long hex color to an rgb color` ', function () {
      _chai.assert.strictEqual((0, _colorManipulator.convertHexToRGB)('#A94FD3'), 'rgb(169, 79, 211)');
    });
  });
  describe('decomposeColor', function () {
    it('converts an rgb color string to an object with `type` and `value` keys', function () {
      var _decomposeColor = (0, _colorManipulator.decomposeColor)('rgb(255, 255, 255)'),
          type = _decomposeColor.type,
          values = _decomposeColor.values;

      _chai.assert.strictEqual(type, 'rgb');

      _chai.assert.deepEqual(values, [255, 255, 255]);
    });
    it('converts an rgba color string to an object with `type` and `value` keys', function () {
      var _decomposeColor2 = (0, _colorManipulator.decomposeColor)('rgba(255, 255, 255, 0.5)'),
          type = _decomposeColor2.type,
          values = _decomposeColor2.values;

      _chai.assert.strictEqual(type, 'rgba');

      _chai.assert.deepEqual(values, [255, 255, 255, 0.5]);
    });
    it('converts an hsl color string to an object with `type` and `value` keys', function () {
      var _decomposeColor3 = (0, _colorManipulator.decomposeColor)('hsl(100, 50%, 25%)'),
          type = _decomposeColor3.type,
          values = _decomposeColor3.values;

      _chai.assert.strictEqual(type, 'hsl');

      _chai.assert.deepEqual(values, [100, 50, 25]);
    });
    it('converts an hsla color string to an object with `type` and `value` keys', function () {
      var _decomposeColor4 = (0, _colorManipulator.decomposeColor)('hsla(100, 50%, 25%, 0.5)'),
          type = _decomposeColor4.type,
          values = _decomposeColor4.values;

      _chai.assert.strictEqual(type, 'hsla');

      _chai.assert.deepEqual(values, [100, 50, 25, 0.5]);
    });
  });
  describe('getContrastRatio', function () {
    it('returns a ratio for black : white', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getContrastRatio)('#000', '#FFF'), 21);
    });
    it('returns a ratio for black : black', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getContrastRatio)('#000', '#000'), 1);
    });
    it('returns a ratio for white : white', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getContrastRatio)('#FFF', '#FFF'), 1);
    });
    it('returns a ratio for dark-grey : light-grey', function () {
      _chai.assert.approximately((0, _colorManipulator.getContrastRatio)('#707070', '#E5E5E5'), 3.93, 0.01);
    });
    it('returns a ratio for black : light-grey', function () {
      _chai.assert.approximately((0, _colorManipulator.getContrastRatio)('#000', '#888'), 5.92, 0.01);
    });
  });
  describe('getLuminance', function () {
    it('returns a valid luminance for rgb white', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('rgba(0, 0, 0)'), 0);

      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('rgb(0, 0, 0)'), 0);
    });
    it('returns a valid luminance for rgb white', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('rgba(255, 255, 255)'), 1);

      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('rgb(255, 255, 255)'), 1);
    });
    it('returns a valid luminance for rgb mid-grey', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('rgba(127, 127, 127)'), 0.212);

      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('rgb(127, 127, 127)'), 0.212);
    });
    it('returns a valid luminance for an rgb color', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('rgb(255, 127, 0)'), 0.364);
    });
    it('returns a valid luminance from an hsl color', function () {
      _chai.assert.strictEqual((0, _colorManipulator.getLuminance)('hsl(100, 100%, 50%)'), 0.5);
    });
    it('throw on invalid colors', function () {
      _chai.assert.throw(function () {
        (0, _colorManipulator.getLuminance)('black');
      }, 'unsupported `black` color');
    });
  });
  describe('emphasize', function () {
    it('lightens a dark rgb color with the coefficient provided', function () {
      _chai.assert.strictEqual((0, _colorManipulator.emphasize)('rgb(1, 2, 3)', 0.4), (0, _colorManipulator.lighten)('rgb(1, 2, 3)', 0.4));
    });
    it('darkens a light rgb color with the coefficient provided', function () {
      _chai.assert.strictEqual((0, _colorManipulator.emphasize)('rgb(250, 240, 230)', 0.3), (0, _colorManipulator.darken)('rgb(250, 240, 230)', 0.3));
    });
    it('lightens a dark rgb color with the coefficient 0.15 by default', function () {
      _chai.assert.strictEqual((0, _colorManipulator.emphasize)('rgb(1, 2, 3)'), (0, _colorManipulator.lighten)('rgb(1, 2, 3)', 0.15));
    });
    it('darkens a light rgb color with the coefficient 0.15 by default', function () {
      _chai.assert.strictEqual((0, _colorManipulator.emphasize)('rgb(250, 240, 230)'), (0, _colorManipulator.darken)('rgb(250, 240, 230)', 0.15));
    });
  });
  describe('fade', function () {
    it('converts an rgb color to an rgba color with the value provided', function () {
      _chai.assert.strictEqual((0, _colorManipulator.fade)('rgb(1, 2, 3)', 0.4), 'rgba(1, 2, 3, 0.4)');
    });
    it('updates an rgba color with the alpha value provided', function () {
      _chai.assert.strictEqual((0, _colorManipulator.fade)('rgba(255, 0, 0, 0.2)', 0.5), 'rgba(255, 0, 0, 0.5)');
    });
    it('converts an hsl color to an hsla color with the value provided', function () {
      _chai.assert.strictEqual((0, _colorManipulator.fade)('hsl(0, 100%, 50%)', 0.1), 'hsla(0, 100%, 50%, 0.1)');
    });
    it('updates an hsla color with the alpha value provided', function () {
      _chai.assert.strictEqual((0, _colorManipulator.fade)('hsla(0, 100%, 50%, 0.2)', 0.5), 'hsla(0, 100%, 50%, 0.5)');
    });
    it('throw on invalid colors', function () {
      _chai.assert.throw(function () {
        (0, _colorManipulator.fade)('white', 0.4);
      }, 'unsupported `white` color');
    });
  });
  describe('darken', function () {
    it("doesn't modify rgb black", function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(0, 0, 0)', 0.1), 'rgb(0, 0, 0)');
    });
    it("doesn't overshoot if an above-range coefficient is supplied", function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(0, 127, 255)', 1.5), 'rgb(0, 0, 0)');

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);
    });
    it("doesn't overshoot if a below-range coefficient is supplied", function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(0, 127, 255)', -0.1), 'rgb(0, 127, 255)');

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);
    });
    it('darkens rgb white to black when coefficient is 1', function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(255, 255, 255)', 1), 'rgb(0, 0, 0)');
    });
    it('retains the alpha value in an rgba color', function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(0, 0, 0, 0.5)', 0.1), 'rgb(0, 0, 0, 0.5)');
    });
    it('darkens rgb white by 10% when coefficient is 0.1', function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(255, 255, 255)', 0.1), 'rgb(229, 229, 229)');
    });
    it('darkens rgb red by 50% when coefficient is 0.5', function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(255, 0, 0)', 0.5), 'rgb(127, 0, 0)');
    });
    it('darkens rgb grey by 50% when coefficient is 0.5', function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(127, 127, 127)', 0.5), 'rgb(63, 63, 63)');
    });
    it("doesn't modify rgb colors when coefficient is 0", function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('rgb(255, 255, 255)', 0), 'rgb(255, 255, 255)');
    });
    it('darkens hsl red by 50% when coefficient is 0.5', function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('hsl(0, 100%, 50%)', 0.5), 'hsl(0, 100%, 25%)');
    });
    it("doesn't modify hsl colors when coefficient is 0", function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('hsl(0, 100%, 50%)', 0), 'hsl(0, 100%, 50%)');
    });
    it("doesn't modify hsl colors when l is 0%", function () {
      _chai.assert.strictEqual((0, _colorManipulator.darken)('hsl(0, 50%, 0%)', 0.5), 'hsl(0, 50%, 0%)');
    });
  });
  describe('lighten', function () {
    it("doesn't modify rgb white", function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(255, 255, 255)', 0.1), 'rgb(255, 255, 255)');
    });
    it("doesn't overshoot if an above-range coefficient is supplied", function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(0, 127, 255)', 1.5), 'rgb(255, 255, 255)');

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);
    });
    it("doesn't overshoot if a below-range coefficient is supplied", function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(0, 127, 255)', -0.1), 'rgb(0, 127, 255)');

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);
    });
    it('lightens rgb black to white when coefficient is 1', function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(0, 0, 0)', 1), 'rgb(255, 255, 255)');
    });
    it('retains the alpha value in an rgba color', function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(255, 255, 255, 0.5)', 0.1), 'rgb(255, 255, 255, 0.5)');
    });
    it('lightens rgb black by 10% when coefficient is 0.1', function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(0, 0, 0)', 0.1), 'rgb(25, 25, 25)');
    });
    it('lightens rgb red by 50% when coefficient is 0.5', function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(255, 0, 0)', 0.5), 'rgb(255, 127, 127)');
    });
    it('lightens rgb grey by 50% when coefficient is 0.5', function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(127, 127, 127)', 0.5), 'rgb(191, 191, 191)');
    });
    it("doesn't modify rgb colors when coefficient is 0", function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('rgb(127, 127, 127)', 0), 'rgb(127, 127, 127)');
    });
    it('lightens hsl red by 50% when coefficient is 0.5', function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('hsl(0, 100%, 50%)', 0.5), 'hsl(0, 100%, 75%)');
    });
    it("doesn't modify hsl colors when coefficient is 0", function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('hsl(0, 100%, 50%)', 0), 'hsl(0, 100%, 50%)');
    });
    it("doesn't modify hsl colors when `l` is 100%", function () {
      _chai.assert.strictEqual((0, _colorManipulator.lighten)('hsl(0, 50%, 100%)', 0.5), 'hsl(0, 50%, 100%)');
    });
  });
});