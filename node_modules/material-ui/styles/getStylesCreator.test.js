"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _chai = require("chai");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _getStylesCreator = _interopRequireDefault(require("./getStylesCreator"));

describe('getStylesCreator', function () {
  var name = 'name';
  var stylesCreator = (0, _getStylesCreator.default)({
    root: {
      color: 'black',
      '&:hover': {
        color: 'red',
        borderRadius: 0
      }
    }
  });
  it('should be able to get the styles', function () {
    var styles = stylesCreator.create({});

    _chai.assert.deepEqual(styles, {
      root: {
        color: 'black',
        '&:hover': {
          color: 'red',
          borderRadius: 0
        }
      }
    });
  });
  describe('overrides', function () {
    before(function () {
      _consoleErrorMock.default.spy();
    });
    after(function () {
      _consoleErrorMock.default.reset();
    });
    it('should be able to overrides some rules, deep', function () {
      var theme = {
        overrides: (0, _defineProperty2.default)({}, name, {
          root: {
            color: 'white',
            '&:hover': {
              borderRadius: 2,
              backgroundColor: 'black'
            }
          }
        })
      };
      var styles = stylesCreator.create(theme, name);

      _chai.assert.deepEqual(styles, {
        root: {
          color: 'white',
          '&:hover': {
            color: 'red',
            borderRadius: 2,
            backgroundColor: 'black'
          }
        }
      });
    });
    it('should warn on wrong usage', function () {
      var theme = {
        overrides: (0, _defineProperty2.default)({}, name, {
          bubu: {
            color: 'white'
          }
        })
      };
      stylesCreator.create(theme, name);

      _chai.assert.strictEqual(_consoleErrorMock.default.callCount(), 1);

      _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Fix the `bubu` key of `theme\.overrides\.name`/);
    });
    it('should support jss-expand', function () {
      var stylesCreator2 = (0, _getStylesCreator.default)({
        root: {
          padding: [8, 16]
        }
      });
      var theme = {
        overrides: (0, _defineProperty2.default)({}, name, {
          root: {
            padding: [20, 10]
          }
        })
      };
      var styles = stylesCreator2.create(theme, name);

      _chai.assert.deepEqual(styles, {
        root: {
          padding: [20, 10]
        }
      });
    });
  });
});