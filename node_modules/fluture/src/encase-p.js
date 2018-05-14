import {Core} from './core';
import {show, showf, immediately, partial1} from './internal/fn';
import {isThenable, isFunction} from './internal/is';
import {invalidArgument, typeError} from './internal/throw';

function check$promise(p, f, a){
  return isThenable(p) ? p : typeError(
    'Future.encaseP expects the function it\'s given to return a Promise/Thenable'
    + '\n  Actual: ' + (show(p)) + '\n  From calling: ' + (showf(f))
    + '\n  With: ' + (show(a))
  );
}

export function EncaseP(fn, a){
  this._fn = fn;
  this._a = a;
}

EncaseP.prototype = Object.create(Core);

EncaseP.prototype._fork = function EncaseP$fork(rej, res){
  var _fn = this._fn;
  var _a = this._a;
  var open = true;
  check$promise(_fn(_a), _fn, _a).then(immediately(function EncaseP$res(x){
    if(open){
      open = false;
      res(x);
    }
  }), immediately(function EncaseP$rej(x){
    if(open){
      open = false;
      rej(x);
    }
  }));
  return function EncaseP$cancel(){ open = false };
};

EncaseP.prototype.toString = function EncaseP$toString(){
  return 'Future.encaseP(' + showf(this._fn) + ', ' + show(this._a) + ')';
};

export function encaseP(f, x){
  if(!isFunction(f)) invalidArgument('Future.encaseP', 0, 'be a function', f);
  if(arguments.length === 1) return partial1(encaseP, f);
  return new EncaseP(f, x);
}
