"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _chai = require("chai");

var _brcast = _interopRequireDefault(require("brcast"));

var _themeListener = _interopRequireWildcard(require("./themeListener"));

describe('themeListener', function () {
  it('should be able to get the initial state', function () {
    var broadcast = (0, _brcast.default)();
    var initialState = {};
    broadcast.setState(initialState);

    _chai.assert.strictEqual(_themeListener.default.initial((0, _defineProperty2.default)({}, _themeListener.CHANNEL, broadcast)), initialState);
  });
  it('should not complain if the context is not defined', function () {
    _chai.assert.strictEqual(_themeListener.default.initial({}), null);
  });
  it('should be able to subscribe to the event stream', function (done) {
    var broadcast = (0, _brcast.default)();
    var initialState = {};
    var secondState = {};
    broadcast.setState(initialState);

    _themeListener.default.subscribe((0, _defineProperty2.default)({}, _themeListener.CHANNEL, broadcast), function (state) {
      _chai.assert.strictEqual(state, secondState);

      done();
    });

    broadcast.setState(secondState);
  });
});