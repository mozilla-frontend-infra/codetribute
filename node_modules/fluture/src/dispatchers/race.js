import {isFuture} from '../core';
import {partial1} from '../internal/fn';
import {invalidFuture} from '../internal/throw';

function race$right(right, left){
  if(!isFuture(left)) invalidFuture('Future.race', 1, left);
  return left.race(right);
}

export function race(right, left){
  if(!isFuture(right)) invalidFuture('Future.race', 0, right);
  if(arguments.length === 1) return partial1(race$right, right);
  return race$right(right, left);
}
