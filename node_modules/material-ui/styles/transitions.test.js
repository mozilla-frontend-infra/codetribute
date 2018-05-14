"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _isNan = _interopRequireDefault(require("@babel/runtime/core-js/number/is-nan"));

var _chai = require("chai");

var _sinon = require("sinon");

var _transitions = _interopRequireWildcard(require("./transitions"));

describe('transitions', function () {
  var consoleErrorStub;
  beforeEach(function () {
    consoleErrorStub = (0, _sinon.stub)(console, 'error');
  });
  afterEach(function () {
    consoleErrorStub.restore();
  });
  describe('formatMs() function', function () {
    it('should round decimal digits and return formatted value', function () {
      var formattedValue = (0, _transitions.formatMs)(12.125);

      _chai.assert.strictEqual(formattedValue, '12ms');
    });
  });
  describe('isString() function', function () {
    it('should return false when passed undefined', function () {
      var value = (0, _transitions.isString)();

      _chai.assert.strictEqual(value, false);
    });
    it('should return false when not passed a string', function () {
      var value = (0, _transitions.isString)(1);

      _chai.assert.strictEqual(value, false);

      value = (0, _transitions.isString)({});

      _chai.assert.strictEqual(value, false);

      value = (0, _transitions.isString)([]);

      _chai.assert.strictEqual(value, false);
    });
    it('should return true when passed a string', function () {
      var value = (0, _transitions.isString)('');

      _chai.assert.strictEqual(value, true);

      value = (0, _transitions.isString)('test');

      _chai.assert.strictEqual(value, true);
    });
  });
  describe('isNumber() function', function () {
    it('should return false when passed undefined', function () {
      var value = (0, _transitions.isNumber)();

      _chai.assert.strictEqual(value, false);
    });
    it('should return false when not passed a number', function () {
      var value = (0, _transitions.isNumber)('');

      _chai.assert.strictEqual(value, false);

      value = (0, _transitions.isNumber)('test');

      _chai.assert.strictEqual(value, false);

      value = (0, _transitions.isNumber)({});

      _chai.assert.strictEqual(value, false);

      value = (0, _transitions.isNumber)([]);

      _chai.assert.strictEqual(value, false);
    });
    it('should return true when passed a number', function () {
      var value = (0, _transitions.isNumber)(1);

      _chai.assert.strictEqual(value, true);

      value = (0, _transitions.isNumber)(1.5);

      _chai.assert.strictEqual(value, true);
    });
  });
  describe('create() function', function () {
    it('should create default transition without arguments', function () {
      var transition = _transitions.default.create();

      _chai.assert.strictEqual(transition, "all ".concat(_transitions.duration.standard, "ms ").concat(_transitions.easing.easeInOut, " 0ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should take string props as a first argument', function () {
      var transition = _transitions.default.create('color');

      _chai.assert.strictEqual(transition, "color ".concat(_transitions.duration.standard, "ms ").concat(_transitions.easing.easeInOut, " 0ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should also take array of props as first argument', function () {
      var options = {
        delay: 20
      };

      var multiple = _transitions.default.create(['color', 'size'], options);

      var single1 = _transitions.default.create('color', options);

      var single2 = _transitions.default.create('size', options);

      var expected = "".concat(single1, ",").concat(single2);

      _chai.assert.strictEqual(multiple, expected);

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should warn when first argument is of bad type', function () {
      // $FlowIgnore
      _transitions.default.create(5554); // $FlowIgnore


      _transitions.default.create({});

      _chai.assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });
    it('should optionally accept number "duration" option in second argument', function () {
      var transition = _transitions.default.create('font', {
        duration: 500
      });

      _chai.assert.strictEqual(transition, "font 500ms ".concat(_transitions.easing.easeInOut, " 0ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should optionally accept string "duration" option in second argument', function () {
      var transition = _transitions.default.create('font', {
        duration: '500ms'
      });

      _chai.assert.strictEqual(transition, "font 500ms ".concat(_transitions.easing.easeInOut, " 0ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should round decimal digits of "duration" prop to whole numbers', function () {
      var transition = _transitions.default.create('font', {
        duration: 12.125
      });

      _chai.assert.strictEqual(transition, "font 12ms ".concat(_transitions.easing.easeInOut, " 0ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should warn when bad "duration" option type', function () {
      // $FlowIgnore
      _transitions.default.create('font', {
        duration: null
      }); // $FlowIgnore


      _transitions.default.create('font', {
        duration: {}
      });

      _chai.assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });
    it('should optionally accept string "easing" option in second argument', function () {
      var transition = _transitions.default.create('transform', {
        easing: _transitions.easing.sharp
      });

      _chai.assert.strictEqual(transition, "transform ".concat(_transitions.duration.standard, "ms ").concat(_transitions.easing.sharp, " 0ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should warn when bad "easing" option type', function () {
      // $FlowIgnore
      _transitions.default.create('transform', {
        easing: 123
      }); // $FlowIgnore


      _transitions.default.create('transform', {
        easing: {}
      });

      _chai.assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });
    it('should optionally accept number "delay" option in second argument', function () {
      var transition = _transitions.default.create('size', {
        delay: 150
      });

      _chai.assert.strictEqual(transition, "size ".concat(_transitions.duration.standard, "ms ").concat(_transitions.easing.easeInOut, " 150ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should optionally accept string "delay" option in second argument', function () {
      var transition = _transitions.default.create('size', {
        delay: '150ms'
      });

      _chai.assert.strictEqual(transition, "size ".concat(_transitions.duration.standard, "ms ").concat(_transitions.easing.easeInOut, " 150ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should round decimal digits of "delay" prop to whole numbers', function () {
      var transition = _transitions.default.create('size', {
        delay: 1.547
      });

      _chai.assert.strictEqual(transition, "size ".concat(_transitions.duration.standard, "ms ").concat(_transitions.easing.easeInOut, " 2ms"));

      _chai.assert.strictEqual(consoleErrorStub.callCount, 0, 'Wrong number of calls of warning()');
    });
    it('should warn when bad "delay" option type', function () {
      // $FlowIgnore
      _transitions.default.create('size', {
        delay: null
      }); // $FlowIgnore


      _transitions.default.create('size', {
        delay: {}
      });

      _chai.assert.strictEqual(consoleErrorStub.callCount, 2, 'Wrong number of calls of warning()');
    });
    it('should warn when passed unrecognized option', function () {
      _transitions.default.create('size', {
        fffds: 'value'
      });

      _chai.assert.strictEqual(consoleErrorStub.callCount, 1, 'Wrong number of calls of warning()');
    });
    it('should return zero when not passed arguments', function () {
      var zeroHeightDuration = _transitions.default.getAutoHeightDuration();

      _chai.assert.strictEqual(zeroHeightDuration, 0);
    });
    it('should return zero when passed undefined', function () {
      var zeroHeightDuration = _transitions.default.getAutoHeightDuration(undefined);

      _chai.assert.strictEqual(zeroHeightDuration, 0);
    });
    it('should return zero when passed null', function () {
      var zeroHeightDuration = _transitions.default.getAutoHeightDuration(null);

      _chai.assert.strictEqual(zeroHeightDuration, 0);
    });
    it('should return NaN when passed a negative number', function () {
      var zeroHeightDurationNegativeOne = _transitions.default.getAutoHeightDuration(-1);

      _chai.assert.strictEqual((0, _isNan.default)(zeroHeightDurationNegativeOne), true);

      var zeroHeightDurationSmallNegative = _transitions.default.getAutoHeightDuration(-0.000001);

      _chai.assert.strictEqual((0, _isNan.default)(zeroHeightDurationSmallNegative), true);

      var zeroHeightDurationBigNegative = _transitions.default.getAutoHeightDuration(-100000);

      _chai.assert.strictEqual((0, _isNan.default)(zeroHeightDurationBigNegative), true);
    });
    it('should return values for pre-calculated positive examples', function () {
      var zeroHeightDuration = _transitions.default.getAutoHeightDuration(14);

      _chai.assert.strictEqual(zeroHeightDuration, 159);

      zeroHeightDuration = _transitions.default.getAutoHeightDuration(100);

      _chai.assert.strictEqual(zeroHeightDuration, 239);

      zeroHeightDuration = _transitions.default.getAutoHeightDuration(0.0001);

      _chai.assert.strictEqual(zeroHeightDuration, 46);

      zeroHeightDuration = _transitions.default.getAutoHeightDuration(100000);

      _chai.assert.strictEqual(zeroHeightDuration, 6685);
    });
  });
});