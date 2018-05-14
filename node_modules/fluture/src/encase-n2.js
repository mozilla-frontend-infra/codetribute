import {Core} from './core';
import {show, showf, partial1, partial2} from './internal/fn';
import {isFunction} from './internal/is';
import {invalidArgument} from './internal/throw';

export function EncaseN2(fn, a, b){
  this._fn = fn;
  this._a = a;
  this._b = b;
}

EncaseN2.prototype = Object.create(Core);

EncaseN2.prototype._fork = function EncaseN2$fork(rej, res){
  var open = true;
  this._fn(this._a, this._b, function EncaseN2$done(err, val){
    if(open){
      open = false;
      err ? rej(err) : res(val);
    }
  });
  return function EncaseN2$cancel(){ open = false };
};

EncaseN2.prototype.toString = function EncaseN2$toString(){
  return 'Future.encaseN2(' + showf(this._fn) + ', ' + show(this._a) + ', ' + show(this._b) + ')';
};

export function encaseN2(f, x, y){
  if(!isFunction(f)) invalidArgument('Future.encaseN2', 0, 'be a function', f);

  switch(arguments.length){
    case 1: return partial1(encaseN2, f);
    case 2: return partial2(encaseN2, f, x);
    default: return new EncaseN2(f, x, y);
  }
}
