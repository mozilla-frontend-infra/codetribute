import {Core} from './core';
import {show, showf, partial1, partial2, partial3} from './internal/fn';
import {isFunction} from './internal/is';
import {invalidArgument} from './internal/throw';

export function EncaseN(fn, a, b, c){
  this._fn = fn;
  this._a = a;
  this._b = b;
  this._c = c;
}

EncaseN.prototype = Object.create(Core);

EncaseN.prototype._fork = function EncaseN$3$fork(rej, res){
  var open = true;
  this._fn(this._a, this._b, this._c, function EncaseN$3$done(err, val){
    if(open){
      open = false;
      err ? rej(err) : res(val);
    }
  });
  return function EncaseN$3$cancel(){ open = false };
};

EncaseN.prototype.toString = function EncaseN$3$toString(){
  return 'Future.encaseN3('
       + showf(this._fn)
       + ', '
       + show(this._a)
       + ', '
       + show(this._b)
       + ', '
       + show(this._c)
       + ')';
};

export function encaseN3(f, x, y, z){
  if(!isFunction(f)) invalidArgument('Future.encaseN3', 0, 'be a function', f);

  switch(arguments.length){
    case 1: return partial1(encaseN3, f);
    case 2: return partial2(encaseN3, f, x);
    case 3: return partial3(encaseN3, f, x, y);
    default: return new EncaseN(f, x, y, z);
  }
}
