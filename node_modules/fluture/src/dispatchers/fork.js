import {isFuture} from '../core';
import {partial1, partial2} from '../internal/fn';
import {isFunction} from '../internal/is';
import {invalidArgument, invalidFuture} from '../internal/throw';

function fork$f$g(f, g, m){
  if(!isFuture(m)) invalidFuture('Future.fork', 2, m);
  return m._fork(f, g);
}

function fork$f(f, g, m){
  if(!isFunction(g)) invalidArgument('Future.fork', 1, 'be a function', g);
  if(arguments.length === 2) return partial2(fork$f$g, f, g);
  return fork$f$g(f, g, m);
}

export function fork(f, g, m){
  if(!isFunction(f)) invalidArgument('Future.fork', 0, 'be a function', f);
  if(arguments.length === 1) return partial1(fork$f, f);
  if(arguments.length === 2) return fork$f(f, g);
  return fork$f(f, g, m);
}
