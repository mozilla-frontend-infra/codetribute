/*eslint consistent-return: 0*/

import {Core, isFuture} from './core';
import {isFunction, isIterator} from './internal/is';
import {isIteration} from './internal/iteration';
import {show, showf, noop} from './internal/fn';
import {invalidArgument, typeError, invalidFuture} from './internal/throw';
import {Undetermined, Synchronous, Asynchronous} from './internal/timing';

function check$iterator(g){
  return isIterator(g) ? g : invalidArgument(
    'Future.do', 0, 'return an iterator, maybe you forgot the "*"', g
  );
}

function check$iteration(o){
  if(!isIteration(o)) typeError(
    'Future.do was given an invalid generator:'
    + ' Its iterator did not return a valid iteration from iterator.next()'
    + '\n  Actual: ' + show(o)
  );
  if(o.done || isFuture(o.value)) return o;
  return invalidFuture(
    'Future.do',
    'the iterator to produce only valid Futures',
    o.value,
    '\n  Tip: If you\'re using a generator, make sure you always yield a Future'
  );
}

export function Go(generator){
  this._generator = generator;
}

Go.prototype = Object.create(Core);

Go.prototype._fork = function Go$_fork(rej, res){

  var iterator = check$iterator(this._generator());

  var timing = Undetermined, cancel = noop, state, value;

  function resolved(x){
    value = x;
    if(timing === Asynchronous) return drain();
    timing = Synchronous;
    state = check$iteration(iterator.next(value));
  }

  function drain(){
    state = check$iteration(iterator.next(value));

    while(!state.done){
      timing = Undetermined;
      cancel = state.value._fork(rej, resolved);

      if(timing !== Synchronous){
        timing = Asynchronous;
        return;
      }
    }

    res(state.value);
  }

  drain();

  return function Go$cancel(){ cancel() };

};

Go.prototype.toString = function Go$toString(){
  return 'Future.do(' + showf(this._generator) + ')';
};

export function go(generator){
  if(!isFunction(generator)) invalidArgument('Future.do', 0, 'be a Function', generator);
  return new Go(generator);
}
