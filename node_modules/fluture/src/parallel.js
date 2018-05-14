import {Core, Resolved, isFuture} from './core';
import {invalidArgument, invalidFuture} from './internal/throw';
import {noop, show, mapArray, partial1} from './internal/fn';
import {isUnsigned, isArray} from './internal/is';

function check$parallel(m, i){
  return isFuture(m) ? m : invalidFuture(
    'Future.parallel',
    'its second argument to be an array of valid Futures. '
  + 'The value at position ' + i + ' in the array is not a Future',
    m
  );
}

export function Parallel(max, futures){
  this._futures = futures;
  this._length = futures.length;
  this._max = Math.min(this._length, max);
}

Parallel.prototype = Object.create(Core);

Parallel.prototype._fork = function Parallel$_fork(rej, res){

  var _futures = this._futures, _length = this._length, _max = this._max;
  var cancels = new Array(_length), out = new Array(_length);
  var cursor = 0, running = 0, blocked = false;

  function Parallel$cancel(){
    cursor = _length;
    for(var n = 0; n < _length; n++) cancels[n] && cancels[n]();
  }

  function Parallel$run(idx){
    running++;
    cancels[idx] = _futures[idx]._fork(function Parallel$rej(reason){
      cancels[idx] = noop;
      Parallel$cancel();
      rej(reason);
    }, function Parallel$res(value){
      cancels[idx] = noop;
      out[idx] = value;
      running--;
      if(cursor === _length && running === 0) res(out);
      else if(blocked) Parallel$drain();
    });
  }

  function Parallel$drain(){
    blocked = false;
    while(cursor < _length && running < _max) Parallel$run(cursor++);
    blocked = true;
  }

  Parallel$drain();

  return Parallel$cancel;

};

Parallel.prototype.toString = function Parallel$toString(){
  return 'Future.parallel(' + this._max + ', ' + show(this._futures) + ')';
};

var emptyArray = new Resolved([]);

function parallel$max(max, xs){
  if(!isArray(xs)) invalidArgument('Future.parallel', 1, 'be an array', xs);
  var futures = mapArray(xs, check$parallel);
  return futures.length === 0 ? emptyArray : new Parallel(max, futures);
}

export function parallel(max, xs){
  if(!isUnsigned(max)) invalidArgument('Future.parallel', 0, 'be a positive integer', max);
  if(arguments.length === 1) return partial1(parallel$max, max);
  return parallel$max(max, xs);
}
