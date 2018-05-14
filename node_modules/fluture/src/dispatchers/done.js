import {isFuture} from '../core';
import {partial1} from '../internal/fn';
import {isFunction} from '../internal/is';
import {invalidArgument, invalidFuture} from '../internal/throw';

function done$callback(callback, m){
  if(!isFuture(m)) invalidFuture('Future.done', 1, m);
  return m.done(callback);
}

export function done(callback, m){
  if(!isFunction(callback)) invalidArgument('Future.done', 0, 'be a Function', callback);
  if(arguments.length === 1) return partial1(done$callback, callback);
  return done$callback(callback, m);
}
