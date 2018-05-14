import {isFuture} from '../core';
import {invalidFuture} from '../internal/throw';

export function extractRight(m){
  if(!isFuture(m)) invalidFuture('Future.extractRight', 0, m);
  return m.extractRight();
}
