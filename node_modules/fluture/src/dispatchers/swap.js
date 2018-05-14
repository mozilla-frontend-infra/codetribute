import {isFuture} from '../core';
import {invalidFuture} from '../internal/throw';

export function swap(m){
  if(!isFuture(m)) invalidFuture('Future.swap', 0, m);
  return m.swap();
}
