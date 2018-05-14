import {isFuture} from '../core';
import {partial1, partial2} from '../internal/fn';
import {isFunction} from '../internal/is';
import {invalidArgument, invalidFuture} from '../internal/throw';

function fold$f$g(f, g, m){
  if(!isFuture(m)) invalidFuture('Future.fold', 2, m);
  return m.fold(f, g);
}

function fold$f(f, g, m){
  if(!isFunction(g)) invalidArgument('Future.fold', 1, 'be a function', g);
  if(arguments.length === 2) return partial2(fold$f$g, f, g);
  return fold$f$g(f, g, m);
}

export function fold(f, g, m){
  if(!isFunction(f)) invalidArgument('Future.fold', 0, 'be a function', f);
  if(arguments.length === 1) return partial1(fold$f, f);
  if(arguments.length === 2) return fold$f(f, g);
  return fold$f(f, g, m);
}
