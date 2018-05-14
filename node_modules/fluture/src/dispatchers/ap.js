import Z from 'sanctuary-type-classes';
import {partial1} from '../internal/fn';
import {invalidArgument} from '../internal/throw';

function ap$mval(mval, mfunc){
  if(!Z.Apply.test(mfunc)) invalidArgument('Future.ap', 1, 'be an Apply', mfunc);
  return Z.ap(mval, mfunc);
}

export function ap(mval, mfunc){
  if(!Z.Apply.test(mval)) invalidArgument('Future.ap', 0, 'be an Apply', mval);
  if(arguments.length === 1) return partial1(ap$mval, mval);
  return ap$mval(mval, mfunc);
}
