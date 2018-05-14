export function isFunction(f){
  return typeof f === 'function';
}

export function isThenable(m){
  return m instanceof Promise || Boolean(m) && isFunction(m.then);
}

export function isBoolean(f){
  return typeof f === 'boolean';
}

export function isNumber(f){
  return typeof f === 'number';
}

export function isUnsigned(n){
  return (n === Infinity || isNumber(n) && n > 0 && n % 1 === 0);
}

export function isObject(o){
  return o !== null && typeof o === 'object';
}

export function isIterator(i){
  return isObject(i) && isFunction(i.next);
}

export function isArray(x){
  return Array.isArray(x);
}
