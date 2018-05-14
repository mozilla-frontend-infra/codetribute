import {Core} from './core';
import {noop, showf} from './internal/fn';
import {isFunction} from './internal/is';
import {invalidArgument} from './internal/throw';

export function Attempt(fn){
  this._fn = fn;
}

Attempt.prototype = Object.create(Core);

Attempt.prototype._fork = function Attempt$fork(rej, res){
  var r;
  try{ r = this._fn() }catch(e){ rej(e); return noop }
  res(r);
  return noop;
};

Attempt.prototype.toString = function Attempt$toString(){
  return 'Future.try(' + showf(this._fn) + ')';
};

export function attempt(f){
  if(!isFunction(f)) invalidArgument('Future.try', 0, 'be a function', f);
  return new Attempt(f);
}
