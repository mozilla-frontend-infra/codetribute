"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _createBreakpoints = _interopRequireDefault(require("./createBreakpoints"));

describe('createBreakpoints', function () {
  var breakpoints;
  before(function () {
    breakpoints = (0, _createBreakpoints.default)({});
  });
  describe('up', function () {
    it('should work for xs', function () {
      _chai.assert.strictEqual(breakpoints.up('xs'), '@media (min-width:0px)');
    });
    it('should work for md', function () {
      _chai.assert.strictEqual(breakpoints.up('md'), '@media (min-width:960px)');
    });
  });
  describe('down', function () {
    it('should work', function () {
      _chai.assert.strictEqual(breakpoints.down('sm'), '@media (max-width:959.95px)');
    });
    it('should work for md', function () {
      _chai.assert.strictEqual(breakpoints.down('md'), '@media (max-width:1279.95px)');
    });
    it('should use the specified key if it is not a recognized breakpoint', function () {
      _chai.assert.strictEqual(breakpoints.down(600), '@media (max-width:599.95px)');
    });
    it('should apply to all sizes for xl', function () {
      _chai.assert.strictEqual(breakpoints.down('xl'), '@media (min-width:0px)');
    });
  });
  describe('between', function () {
    it('should work', function () {
      _chai.assert.strictEqual(breakpoints.between('sm', 'md'), '@media (min-width:600px) and (max-width:1279.95px)');
    });
    it('on xl should call up', function () {
      _chai.assert.strictEqual(breakpoints.between('lg', 'xl'), '@media (min-width:1280px)');
    });
  });
  describe('only', function () {
    it('should work', function () {
      _chai.assert.strictEqual(breakpoints.only('md'), '@media (min-width:960px) and (max-width:1279.95px)');
    });
    it('on xl should call up', function () {
      _chai.assert.strictEqual(breakpoints.only('xl'), '@media (min-width:1920px)');
    });
  });
  describe('width', function () {
    it('should work', function () {
      _chai.assert.strictEqual(breakpoints.width('md'), 960);
    });
  });
});