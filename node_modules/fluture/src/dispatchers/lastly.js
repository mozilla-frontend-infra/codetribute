import {isFuture} from '../core';
import {partial1} from '../internal/fn';
import {invalidFuture} from '../internal/throw';

function lastly$right(right, left){
  if(!isFuture(left)) invalidFuture('Future.finally', 1, left);
  return left.finally(right);
}

export function lastly(right, left){
  if(!isFuture(right)) invalidFuture('Future.finally', 0, right);
  if(arguments.length === 1) return partial1(lastly$right, right);
  return lastly$right(right, left);
}
