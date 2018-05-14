import {isFuture} from '../core';
import {invalidFuture} from '../internal/throw';

export function promise(m){
  if(!isFuture(m)) invalidFuture('Future.promise', 0, m);
  return m.promise();
}
