import {Core} from './core';
import {noop, show, showf, partial1, partial2, partial3} from './internal/fn';
import {isFunction} from './internal/is';
import {invalidArgument} from './internal/throw';

export function Encase3(fn, a, b, c){
  this._fn = fn;
  this._a = a;
  this._b = b;
  this._c = c;
}

Encase3.prototype = Object.create(Core);

Encase3.prototype._fork = function Encase3$fork(rej, res){
  var r;
  try{ r = this._fn(this._a, this._b, this._c) }catch(e){ rej(e); return noop }
  res(r);
  return noop;
};

Encase3.prototype.toString = function Encase3$toString(){
  return 'Future.encase3('
       + showf(this._fn)
       + ', '
       + show(this._a)
       + ', '
       + show(this._b)
       + ', '
       + show(this._c)
       + ')';
};

export function encase3(f, x, y, z){
  if(!isFunction(f)) invalidArgument('Future.encase3', 0, 'be a function', f);

  switch(arguments.length){
    case 1: return partial1(encase3, f);
    case 2: return partial2(encase3, f, x);
    case 3: return partial3(encase3, f, x, y);
    default: return new Encase3(f, x, y, z);
  }
}
