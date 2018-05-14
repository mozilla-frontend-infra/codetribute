"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _consoleErrorMock = _interopRequireDefault(require("test/utils/consoleErrorMock"));

var _createGenerateClassName = _interopRequireDefault(require("./createGenerateClassName"));

describe('createGenerateClassName', function () {
  describe('counter', function () {
    it('should increment a scoped counter', function () {
      var rule = {
        key: 'root'
      };
      var generateClassName1 = (0, _createGenerateClassName.default)();

      _chai.assert.strictEqual(generateClassName1(rule), 'root-1');

      _chai.assert.strictEqual(generateClassName1(rule), 'root-2');

      var generateClassName2 = (0, _createGenerateClassName.default)();

      _chai.assert.strictEqual(generateClassName2(rule), 'root-1');
    });
  });
  it('should escape parenthesis', function () {
    var generateClassName = (0, _createGenerateClassName.default)();

    _chai.assert.strictEqual(generateClassName({
      key: 'root'
    }, {
      options: {
        classNamePrefix: 'pure(MuiButton)',
        jss: {}
      }
    }), 'pure-MuiButton--root-1');
  });
  it('should escape spaces', function () {
    var generateClassName = (0, _createGenerateClassName.default)();

    _chai.assert.strictEqual(generateClassName({
      key: 'root'
    }, {
      options: {
        classNamePrefix: 'foo bar',
        jss: {}
      }
    }), 'foo-bar-root-1');
  });
  describe('options: dangerouslyUseGlobalCSS', function () {
    it('should use a global class name', function () {
      var generateClassName = (0, _createGenerateClassName.default)({
        dangerouslyUseGlobalCSS: true
      });

      _chai.assert.strictEqual(generateClassName({
        key: 'root'
      }, {
        options: {
          classNamePrefix: 'MuiButton',
          jss: {}
        }
      }), 'MuiButton-root');

      _chai.assert.strictEqual(generateClassName({
        key: 'root'
      }, {
        options: {
          classNamePrefix: 'Button',
          jss: {}
        }
      }), 'Button-root-2');
    });
    it('should default to a non deterministic name', function () {
      var generateClassName = (0, _createGenerateClassName.default)({
        dangerouslyUseGlobalCSS: true
      });

      _chai.assert.strictEqual(generateClassName({
        key: 'root'
      }), 'root-1');
    });
  });
  describe('formatting', function () {
    it('should take the sheet meta in development if available', function () {
      var rule = {
        key: 'root'
      };
      var styleSheet = {
        options: {
          classNamePrefix: 'Button'
        }
      };
      var generateClassName = (0, _createGenerateClassName.default)();

      _chai.assert.strictEqual(generateClassName(rule, styleSheet), 'Button-root-1');
    });
    it('should use a base 10 representation', function () {
      var rule = {
        key: 'root'
      };
      var generateClassName = (0, _createGenerateClassName.default)();

      _chai.assert.strictEqual(generateClassName(rule), 'root-1');

      _chai.assert.strictEqual(generateClassName(rule), 'root-2');

      _chai.assert.strictEqual(generateClassName(rule), 'root-3');

      _chai.assert.strictEqual(generateClassName(rule), 'root-4');

      _chai.assert.strictEqual(generateClassName(rule), 'root-5');

      _chai.assert.strictEqual(generateClassName(rule), 'root-6');

      _chai.assert.strictEqual(generateClassName(rule), 'root-7');

      _chai.assert.strictEqual(generateClassName(rule), 'root-8');

      _chai.assert.strictEqual(generateClassName(rule), 'root-9');

      _chai.assert.strictEqual(generateClassName(rule), 'root-10');
    });
    describe('production', function () {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        return;
      }

      var nodeEnv;
      var env = process.env;
      before(function () {
        nodeEnv = env.NODE_ENV;
        env.NODE_ENV = 'production';

        _consoleErrorMock.default.spy();
      });
      after(function () {
        env.NODE_ENV = nodeEnv;

        _consoleErrorMock.default.reset();
      });
      it('should output a short representation', function () {
        var rule = {
          key: 'root'
        };
        var generateClassName = (0, _createGenerateClassName.default)();

        _chai.assert.strictEqual(generateClassName(rule), 'jss1');
      });
      it('should work with global CSS', function () {
        var rule = {
          key: 'root'
        };
        var generateClassName = (0, _createGenerateClassName.default)({
          dangerouslyUseGlobalCSS: true
        });

        _chai.assert.strictEqual(generateClassName(rule), 'jss1');
      });
      it('should warn', function () {
        (0, _createGenerateClassName.default)();
        (0, _createGenerateClassName.default)();

        _chai.assert.strictEqual(_consoleErrorMock.default.callCount() > 0, true);

        _chai.assert.match(_consoleErrorMock.default.args()[0][0], /Material-UI: we have detected more than needed creation of the/);
      });
    });
  });
});