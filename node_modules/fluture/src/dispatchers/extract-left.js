import {isFuture} from '../core';
import {invalidFuture} from '../internal/throw';

export function extractLeft(m){
  if(!isFuture(m)) invalidFuture('Future.extractLeft', 0, m);
  return m.extractLeft();
}
