'use strict';

var concurrify = require('../');
var expect = require('chai').expect;
var Z = require('sanctuary-type-classes');
var type = require('sanctuary-type-identifiers');
var FL = require('fantasy-land');
var $$type = '@@type';
var Identity = function(x){
  var id = {x: x, constructor: Identity};
  id[FL.ap] = function(mf){ return Identity(mf.x(x)) };
  id[FL.map] = function(f){ return Identity(f(x)) };
  return id;
};

Identity[FL.of] = Identity;
Identity[$$type] = 'my/Identity@1';

var mockZero = Identity('zero');

function mockAlt(a, b){ return b }

function mockAp(mx, mf){ return mx[FL.ap](mf) }

describe('concurrify', function(){

  var noop = function(){};

  it('throws when the first argument is not an Applicative Repr', function(){
    ['', {}, noop, String, Boolean].forEach(function(x){
      var f = function(){ concurrify(x, mockZero, mockAlt, mockAp) };
      expect(f).to.throw(TypeError, /represent an Applicative/);
    });
  });

  it('throws when the second argument is not represented by the first', function(){
    ['', {}, null, 0].forEach(function(x){
      var f = function(){ concurrify(Identity, x, mockAlt, mockAp) };
      expect(f).to.throw(TypeError, /Identity/);
    });
  });

  it('throws when the third argument is not a function', function(){
    ['', {}, null, 0].forEach(function(x){
      var f = function(){ concurrify(Identity, mockZero, x, mockAp) };
      expect(f).to.throw(TypeError, /be a function/);
    });
  });

  it('throws when the third argument is not binary', function(){
    [noop, function(a){return a}].forEach(function(x){
      var f = function(){ concurrify(Identity, mockZero, x, mockAp) };
      expect(f).to.throw(TypeError, /be binary/);
    });
  });

  it('throws when the fourth argument is not a function', function(){
    ['', {}, null, 0].forEach(function(x){
      var f = function(){ concurrify(Identity, mockZero, mockAlt, x) };
      expect(f).to.throw(TypeError, /be a function/);
    });
  });

  it('throws when the fourth argument is not binary', function(){
    [noop, function(a){return a}].forEach(function(x){
      var f = function(){ concurrify(Identity, mockZero, mockAlt, x) };
      expect(f).to.throw(TypeError, /be binary/);
    });
  });

  it('returns a new TypeRepr when given valid input', function(){
    var actual = concurrify(Identity, mockZero, mockAlt, mockAp);
    expect(actual).to.be.a('function');
    expect(actual).to.have.property($$type);
    expect(actual).to.have.property(FL.of);
  });

  describe('TypeRepr', function(){

    var ConcurrentIdentity = concurrify(Identity, mockZero, mockAlt, mockAp);

    it('throws when the first argument is not represented by Identity', function(){
      ['', {}, noop, String, Boolean].forEach(function(x){
        var f = function(){ ConcurrentIdentity(x) };
        expect(f).to.throw(TypeError);
      });
    });

    it('creates Alternatives which are instances of itself', function(){
      var actual = ConcurrentIdentity(Z.of(Identity, 1));
      expect(actual).to.satisfy(Z.Alternative.test);
      expect(actual).to.be.an.instanceof(ConcurrentIdentity);
    });

    it('reports being a ConcurrentIdentity from the same vendor and vendor', function(){
      var m = ConcurrentIdentity(Z.of(Identity, 1));
      expect(type(m)).to.equal('my/ConcurrentIdentity@1');
    });

    describe('.' + FL.of, function(){

      it('creates a ConcurrentIdentity of an Identity of the input', function(){
        var actual = ConcurrentIdentity[FL.of]('hello');
        expect(actual).to.be.an.instanceof(ConcurrentIdentity);
        expect(actual.sequential.constructor).to.equal(Identity);
        expect(actual.sequential.x).to.equal('hello');
      });

    });

    describe('.' + FL.zero, function(){

      it('creates a ConcurrentIdentity of the return value of zero', function(){
        var actual = ConcurrentIdentity[FL.zero]();
        expect(actual).to.be.an.instanceof(ConcurrentIdentity);
        expect(actual.sequential.constructor).to.equal(Identity);
        expect(actual.sequential.x).to.equal('zero');
      });

    });

    describe('#' + FL.map, function(){

      it('throws when invoked out of context', function(){
        var m = ConcurrentIdentity[FL.of](1);
        ['', {}, noop, String, Boolean].forEach(function(x){
          var f = function(){ m[FL.map].call(x) };
          expect(f).to.throw(TypeError, /context/);
        });
      });

      it('throws when called without a function', function(){
        var m = ConcurrentIdentity[FL.of](1);
        ['', {}, null, 0].forEach(function(x){
          var f = function(){ m[FL.map](x) };
          expect(f).to.throw(TypeError, /be a function/);
        });
      });

      it('delegates to the inner map', function(done){
        var mapper = function(){};
        var id = Identity(1);

        id[FL.map] = function(f){
          expect(f).to.equal(mapper);
          expect(this).to.equal(id);
          done();
        };

        var cid = ConcurrentIdentity(id);
        cid[FL.map](mapper);
      });

      it('behaves like map', function(){
        var m = ConcurrentIdentity[FL.of](1);
        var m1 = m[FL.map](function(x){ return x + 1 });
        expect(m1.sequential.x).to.equal(2);
      });

    });

    describe('#' + FL.ap, function(){

      it('throws when invoked out of context', function(){
        var m = ConcurrentIdentity[FL.of](1);
        ['', {}, noop, String, Boolean].forEach(function(x){
          var f = function(){ m[FL.ap].call(x) };
          expect(f).to.throw(TypeError, /context/);
        });
      });

      it('throws when called without a ConcurrentIdentity', function(){
        var m = ConcurrentIdentity[FL.of](1);
        ['', {}, null, 0, noop].forEach(function(x){
          var f = function(){ m[FL.ap](x) };
          expect(f).to.throw(TypeError, /ConcurrentIdentity/);
        });
      });

      it('delegates to the given ap', function(done){
        var x = 1;
        var f = function(x){return x};
        var idx = Identity(x);
        var idf = Identity(f);
        var mockAp = function(a, b){
          expect(a).to.equal(idx);
          expect(b).to.equal(idf);
          done();
        };
        var ConcurrentIdentity = concurrify(Identity, mockZero, mockAlt, mockAp);
        var cidx = ConcurrentIdentity(idx);
        var cidf = ConcurrentIdentity(idf);
        cidx[FL.ap](cidf);
      });

    });

    describe('#' + FL.alt, function(){

      it('throws when invoked out of context', function(){
        var m = ConcurrentIdentity[FL.of](1);
        ['', {}, noop, String, Boolean].forEach(function(x){
          var f = function(){ m[FL.alt].call(x) };
          expect(f).to.throw(TypeError, /context/);
        });
      });

      it('throws when called without a ConcurrentIdentity', function(){
        var m = ConcurrentIdentity[FL.of](1);
        ['', {}, null, 0, noop].forEach(function(x){
          var f = function(){ m[FL.alt](x) };
          expect(f).to.throw(TypeError, /ConcurrentIdentity/);
        });
      });

      it('delegates to the given alt', function(done){
        var x = 1;
        var f = function(x){return x};
        var idx = Identity(x);
        var idf = Identity(f);
        var mockAlt = function(a, b){
          expect(a).to.equal(idx);
          expect(b).to.equal(idf);
          done();
        };
        var ConcurrentIdentity = concurrify(Identity, mockZero, mockAlt, mockAp);
        var cidx = ConcurrentIdentity(idx);
        var cidf = ConcurrentIdentity(idf);
        cidx[FL.alt](cidf);
      });

    });

    describe('#toString', function(){

      var inner = Z.of(Identity, 1);
      var m = ConcurrentIdentity(inner);

      it('throws when invoked out of context', function(){
        ['', {}, noop, String, Boolean].forEach(function(x){
          var f = function(){ m.toString.call(x) };
          expect(f).to.throw(TypeError, /context/);
        });
      });

      it('returns a string representation of the data-structure', function(){
        expect(m.toString()).to.equal('ConcurrentIdentity(' + Z.toString(inner) + ')');
      });

    });

  });

});
