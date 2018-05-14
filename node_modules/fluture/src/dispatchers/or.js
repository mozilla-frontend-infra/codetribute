import {isFuture} from '../core';
import {partial1} from '../internal/fn';
import {invalidFuture} from '../internal/throw';

function or$left(left, right){
  if(!isFuture(right)) invalidFuture('Future.or', 1, right);
  return left.or(right);
}

export function or(left, right){
  if(!isFuture(left)) invalidFuture('Future.or', 0, left);
  if(arguments.length === 1) return partial1(or$left, left);
  return or$left(left, right);
}
