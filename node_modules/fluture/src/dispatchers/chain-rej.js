import {isFuture} from '../core';
import {partial1} from '../internal/fn';
import {isFunction} from '../internal/is';
import {invalidArgument, invalidFuture} from '../internal/throw';

function chainRej$chainer(chainer, m){
  if(!isFuture(m)) invalidFuture('Future.chainRej', 1, m);
  return m.chainRej(chainer);
}

export function chainRej(chainer, m){
  if(!isFunction(chainer)) invalidArgument('Future.chainRej', 0, 'be a Function', chainer);
  if(arguments.length === 1) return partial1(chainRej$chainer, chainer);
  return chainRej$chainer(chainer, m);
}
