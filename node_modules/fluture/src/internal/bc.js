/* istanbul ignore file: environment-specific */

/* eslint-disable no-undef */
export const scope = typeof self === 'object' ? self :
                     typeof global === 'object' ? global :
                     typeof window === 'object' ? window :
                     {};
/* eslint-enable no-undef */

export const setImmediate = typeof scope.setImmediate === 'function' ?
                            scope.setImmediate :
                            function setImmediate(f, x){ return setTimeout(f, 0, x) };
