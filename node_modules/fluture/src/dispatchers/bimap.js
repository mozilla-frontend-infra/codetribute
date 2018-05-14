import Z from 'sanctuary-type-classes';
import {partial1, partial2} from '../internal/fn';
import {isFunction} from '../internal/is';
import {invalidArgument} from '../internal/throw';

function bimap$lmapper$rmapper(lmapper, rmapper, m){
  if(!Z.Bifunctor.test(m)) invalidArgument('Future.bimap', 2, 'be a Bifunctor', m);
  return Z.bimap(lmapper, rmapper, m);
}

function bimap$lmapper(lmapper, rmapper, m){
  if(!isFunction(rmapper)) invalidArgument('Future.bimap', 1, 'be a Function', rmapper);
  if(arguments.length === 2) return partial2(bimap$lmapper$rmapper, lmapper, rmapper);
  return bimap$lmapper$rmapper(lmapper, rmapper, m);
}

export function bimap(lmapper, rmapper, m){
  if(!isFunction(lmapper)) invalidArgument('Future.bimap', 0, 'be a Function', lmapper);
  if(arguments.length === 1) return partial1(bimap$lmapper, lmapper);
  if(arguments.length === 2) return bimap$lmapper(lmapper, rmapper);
  return bimap$lmapper(lmapper, rmapper, m);
}
