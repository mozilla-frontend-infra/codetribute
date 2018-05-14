import Z from 'sanctuary-type-classes';
import inspectf from 'inspect-f';
import {setImmediate} from './bc';

export function noop(){}
export function moop(){ return this }
export var show = Z.toString;
export function padf(sf, s){ return s.replace(/^/gm, sf).replace(sf, '') }
export function showf(f){ return padf('  ', inspectf(2, f)) }

export function mapArray(xs, f){
  var l = xs.length, ys = new Array(l);
  for(var i = 0; i < l; i++) ys[i] = f(xs[i], i, xs);
  return ys;
}

export function partial1(f, a){
  return function bound1(b, c, d){
    switch(arguments.length){
      case 1: return f(a, b);
      case 2: return f(a, b, c);
      default: return f(a, b, c, d);
    }
  };
}

export function partial2(f, a, b){
  return function bound2(c, d){
    return arguments.length === 1 ? f(a, b, c) : f(a, b, c, d);
  };
}

export function partial3(f, a, b, c){
  return function bound3(d){
    return f(a, b, c, d);
  };
}

export function immediately(f){
  return function immediate(x){ return setImmediate(f, x) };
}
