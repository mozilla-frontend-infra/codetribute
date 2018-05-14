"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _createPalette = _interopRequireWildcard(require("./createPalette"));

var _colors = require("../colors");

var _colorManipulator = require("../styles/colorManipulator");

describe('createPalette()', function () {
  before(function () {
    _consoleErrorMock.default.spy();
  });
  after(function () {
    _consoleErrorMock.default.reset();
  });
  it('should create a material design palette according to spec', function () {
    var palette = (0, _createPalette.default)({});

    _chai.assert.strictEqual(palette.primary.main, _colors.indigo[500], 'should use indigo[500] as the default primary main color');

    _chai.assert.strictEqual(palette.primary.light, _colors.indigo[300], 'should use indigo[300] as the default primary light color');

    _chai.assert.strictEqual(palette.primary.dark, _colors.indigo[700], 'should use indigo[700] as the default primary dark color');

    _chai.assert.strictEqual(palette.primary.contrastText, _createPalette.dark.text.primary, 'should use dark.text.primary as the default primary contrastText color');

    _chai.assert.strictEqual(palette.secondary.main, _colors.pink.A400, 'should use pink.A400 as the default secondary main color');

    _chai.assert.strictEqual(palette.secondary.light, _colors.pink.A200, 'should use pink.A200 as the default secondary light color');

    _chai.assert.strictEqual(palette.secondary.dark, _colors.pink.A700, 'should use pink.A700 as the default secondary dark color');

    _chai.assert.strictEqual(palette.secondary.contrastText, _createPalette.dark.text.primary, 'should use dark.text.primary as the default secondary contrastText color');

    _chai.assert.strictEqual(palette.error.main, _colors.red[500], 'should use red[500] as the default error main color');

    _chai.assert.strictEqual(palette.error.light, _colors.red[300], 'should use red[300] as the default error light color');

    _chai.assert.strictEqual(palette.error.dark, _colors.red[700], 'should use red[700] as the default error dark color');

    _chai.assert.strictEqual(palette.text, _createPalette.light.text, 'should use light theme text for a light theme by default');
  });
  it('should create a palette with Material colors', function () {
    var palette = (0, _createPalette.default)({
      primary: _colors.deepOrange,
      secondary: _colors.green,
      error: _colors.pink
    });

    _chai.assert.strictEqual(palette.primary.main, _colors.deepOrange[500], 'should use deepOrange[500] as the primary main color');

    _chai.assert.strictEqual(palette.primary.light, _colors.deepOrange[300], 'should use deepOrange[300] as the primary light color');

    _chai.assert.strictEqual(palette.primary.dark, _colors.deepOrange[700], 'should use deepOrange[700] as the primary dark color');

    _chai.assert.strictEqual(palette.secondary.main, _colors.green.A400, 'should use green.A400 as the secondary main color');

    _chai.assert.strictEqual(palette.secondary.light, _colors.green.A200, 'should use green.A200 as the secondary light color');

    _chai.assert.strictEqual(palette.secondary.dark, _colors.green.A700, 'should use green.A700 as the secondary dark color');

    _chai.assert.strictEqual(palette.error.main, _colors.pink[500], 'should use pink[500] as the error main color');

    _chai.assert.strictEqual(palette.error.light, _colors.pink[300], 'should use pink[300] as the error light color');

    _chai.assert.strictEqual(palette.error.dark, _colors.pink[700], 'should use pink[700] as the error dark color');

    _chai.assert.strictEqual(palette.text, _createPalette.light.text, 'should use light theme text');
  });
  it('should create a palette with custom colors', function () {
    var palette = (0, _createPalette.default)({
      primary: {
        main: _colors.deepOrange[500],
        light: _colors.deepOrange[300],
        dark: _colors.deepOrange[700],
        contrastText: '#ffffff'
      },
      secondary: {
        main: _colors.green.A400,
        light: _colors.green.A200,
        dark: _colors.green.A700,
        contrastText: '#000000'
      },
      error: {
        main: _colors.pink[500],
        light: _colors.pink[300],
        dark: _colors.pink[700],
        contrastText: '#00ff00'
      }
    });

    _chai.assert.strictEqual(palette.primary.main, _colors.deepOrange[500], 'should use deepOrange[500] as the primary main color');

    _chai.assert.strictEqual(palette.primary.light, _colors.deepOrange[300], 'should use deepOrange[300] as the primary light color');

    _chai.assert.strictEqual(palette.primary.dark, _colors.deepOrange[700], 'should use deepOrange[700] as the primary dark color');

    _chai.assert.strictEqual(palette.primary.contrastText, '#ffffff', 'should use #ffffff as the secondary contrastText color');

    _chai.assert.strictEqual(palette.secondary.main, _colors.green.A400, 'should use green.A400 as the secondary main color');

    _chai.assert.strictEqual(palette.secondary.light, _colors.green.A200, 'should use green.A200 as the secondary light color');

    _chai.assert.strictEqual(palette.secondary.dark, _colors.green.A700, 'should use green.A700 as the secondary dark color');

    _chai.assert.strictEqual(palette.secondary.contrastText, '#000000', 'should use #000000 as the secondary contrastText color');

    _chai.assert.strictEqual(palette.error.main, _colors.pink[500], 'should use pink[500] as the error main color');

    _chai.assert.strictEqual(palette.error.light, _colors.pink[300], 'should use pink[300] as the error light color');

    _chai.assert.strictEqual(palette.error.dark, _colors.pink[700], 'should use pink[700] as the error dark color');

    _chai.assert.strictEqual(palette.error.contrastText, '#00ff00', 'should use #00ff00 as the error contrastText color');

    _chai.assert.strictEqual(palette.text, _createPalette.light.text, 'should use light theme text');
  });
  it('should calculate light and dark colors if not provided', function () {
    var palette = (0, _createPalette.default)({
      primary: {
        main: _colors.deepOrange[500]
      },
      secondary: {
        main: _colors.green.A400
      },
      error: {
        main: _colors.pink[500]
      }
    });

    _chai.assert.strictEqual(palette.primary.main, _colors.deepOrange[500], 'should use deepOrange[500] as the primary main color');

    _chai.assert.strictEqual(palette.primary.light, (0, _colorManipulator.lighten)(_colors.deepOrange[500], 0.2), 'should use lighten(deepOrange[500], 0.2) as the primary light color');

    _chai.assert.strictEqual(palette.primary.dark, (0, _colorManipulator.darken)(_colors.deepOrange[500], 0.3), 'should use darken(deepOrange[500], 0.3) as the primary dark color');

    _chai.assert.strictEqual(palette.secondary.main, _colors.green.A400, 'should use green.A400 as the secondary main color');

    _chai.assert.strictEqual(palette.secondary.light, (0, _colorManipulator.lighten)(_colors.green.A400, 0.2), 'should use lighten(green.A400, 0.2) as the secondary light color');

    _chai.assert.strictEqual(palette.secondary.dark, (0, _colorManipulator.darken)(_colors.green.A400, 0.3), 'should use darken(green.A400, 0.3) as the secondary dark color');

    _chai.assert.strictEqual(palette.error.main, _colors.pink[500], 'should use pink[500] as the error main color');

    _chai.assert.strictEqual(palette.error.light, (0, _colorManipulator.lighten)(_colors.pink[500], 0.2), 'should use lighten(pink[500], 0.2) as the error light color');

    _chai.assert.strictEqual(palette.error.dark, (0, _colorManipulator.darken)(_colors.pink[500], 0.3), 'should use darken(pink[500], 0.3) as the error dark color');
  });
  it('should calculate light and dark colors using the provided tonalOffset', function () {
    var palette = (0, _createPalette.default)({
      primary: {
        main: _colors.deepOrange[500]
      },
      secondary: {
        main: _colors.green.A400
      },
      error: {
        main: _colors.red[500]
      },
      tonalOffset: 0.1
    }); // primary

    _chai.assert.strictEqual(palette.primary.main, _colors.deepOrange[500], 'should use deepOrange[500] as the primary main color');

    _chai.assert.strictEqual(palette.primary.light, (0, _colorManipulator.lighten)(_colors.deepOrange[500], 0.1), 'should use lighten(deepOrange[500], 0.1) as the primary light color');

    _chai.assert.strictEqual(palette.primary.dark, (0, _colorManipulator.darken)(_colors.deepOrange[500], 0.15), 'should use darken(deepOrange[500], 0.1) as the primary dark color'); // secondary


    _chai.assert.strictEqual(palette.secondary.main, _colors.green.A400, 'should use green.A400 as the secondary main color');

    _chai.assert.strictEqual(palette.secondary.light, (0, _colorManipulator.lighten)(_colors.green.A400, 0.1), 'should use lighten(green.A400, 0.1) as the secondary light color');

    _chai.assert.strictEqual(palette.secondary.dark, (0, _colorManipulator.darken)(_colors.green.A400, 0.15), 'should use darken(green.A400, 0.1) as the secondary dark color'); // error


    _chai.assert.strictEqual(palette.error.main, _colors.red[500], 'should use red[500] as the error main color');

    _chai.assert.strictEqual(palette.error.light, (0, _colorManipulator.lighten)(_colors.red[500], 0.1), 'should use lighten(red[500], 0.1) as the error light color');

    _chai.assert.strictEqual(palette.error.dark, (0, _colorManipulator.darken)(_colors.red[500], 0.15), 'should use darken(red[500], 0.1) as the error dark color');
  });
  it('should calculate contrastText using the provided contrastThreshold', function () {
    var palette = (0, _createPalette.default)({
      contrastThreshold: 7
    });

    _chai.assert.strictEqual(palette.primary.contrastText, _createPalette.light.text.primary, 'should use dark.text.primary as the default primary contrastText color');

    _chai.assert.strictEqual(palette.secondary.contrastText, _createPalette.light.text.primary, 'should use dark.text.primary as the default secondary contrastText color');
  });
  it('should create a dark palette', function () {
    var palette = (0, _createPalette.default)({
      type: 'dark'
    });

    _chai.assert.strictEqual(palette.primary.main, _colors.indigo[500], 'should use indigo as the default primary color');

    _chai.assert.strictEqual(palette.secondary.main, _colors.pink.A400, 'should use pink as the default secondary color');

    _chai.assert.strictEqual(palette.text, _createPalette.dark.text, 'should use dark theme text');

    _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 0);
  });
  it('should throw an exception when an invalid type is specified', function () {
    (0, _createPalette.default)({
      type: 'foo'
    });

    _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);

    _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Material-UI: the palette type `foo` is not supported/);
  });
});