"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _getThemeProps = _interopRequireDefault(require("./getThemeProps"));

describe('getThemeProps', function () {
  it('should ignore empty theme', function () {
    var props = (0, _getThemeProps.default)({
      theme: {},
      name: 'MuiFoo'
    });

    _chai.assert.deepEqual(props, {});
  });
  it('should ignore different component', function () {
    var props = (0, _getThemeProps.default)({
      theme: {
        props: {
          MuiBar: {
            disableRipple: true
          }
        }
      },
      name: 'MuiFoo'
    });

    _chai.assert.deepEqual(props, {});
  });
  it('should return the properties', function () {
    var props = (0, _getThemeProps.default)({
      theme: {
        props: {
          MuiFoo: {
            disableRipple: true
          }
        }
      },
      name: 'MuiFoo'
    });

    _chai.assert.deepEqual(props, {
      disableRipple: true
    });
  });
});