import {isFuture} from '../core';
import {partial1} from '../internal/fn';
import {invalidFuture} from '../internal/throw';

function both$left(left, right){
  if(!isFuture(right)) invalidFuture('Future.both', 1, right);
  return left.both(right);
}

export function both(left, right){
  if(!isFuture(left)) invalidFuture('Future.both', 0, left);
  if(arguments.length === 1) return partial1(both$left, left);
  return both$left(left, right);
}
