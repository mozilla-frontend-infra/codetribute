import {Core} from './core';
import {show, showf, partial1} from './internal/fn';
import {isFunction} from './internal/is';
import {invalidArgument} from './internal/throw';

export function EncaseN(fn, a){
  this._fn = fn;
  this._a = a;
}

EncaseN.prototype = Object.create(Core);

EncaseN.prototype._fork = function EncaseN$fork(rej, res){
  var open = true;
  this._fn(this._a, function EncaseN$done(err, val){
    if(open){
      open = false;
      err ? rej(err) : res(val);
    }
  });
  return function EncaseN$cancel(){ open = false };
};

EncaseN.prototype.toString = function EncaseN$toString(){
  return 'Future.encaseN(' + showf(this._fn) + ', ' + show(this._a) + ')';
};

export function encaseN(f, x){
  if(!isFunction(f)) invalidArgument('Future.encaseN', 0, 'be a function', f);
  if(arguments.length === 1) return partial1(encaseN, f);
  return new EncaseN(f, x);
}
