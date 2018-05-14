import {Core} from './core';
import {show, showf, immediately} from './internal/fn';
import {isThenable, isFunction} from './internal/is';
import {invalidArgument, typeError} from './internal/throw';

function check$promise(p, f){
  return isThenable(p) ? p : typeError(
    'Future.tryP expects the function it\'s given to return a Promise/Thenable'
    + '\n  Actual: ' + show(p) + '\n  From calling: ' + showf(f)
  );
}

export function TryP(fn){
  this._fn = fn;
}

TryP.prototype = Object.create(Core);

TryP.prototype._fork = function TryP$fork(rej, res){
  var open = true;
  check$promise(this._fn(), this._fn).then(immediately(function TryP$res(x){
    if(open){
      open = false;
      res(x);
    }
  }), immediately(function TryP$rej(x){
    if(open){
      open = false;
      rej(x);
    }
  }));
  return function TryP$cancel(){ open = false };
};

TryP.prototype.toString = function TryP$toString(){
  return 'Future.tryP(' + show(this._fn) + ')';
};

export function tryP(f){
  if(!isFunction(f)) invalidArgument('Future.tryP', 0, 'be a function', f);
  return new TryP(f);
}
