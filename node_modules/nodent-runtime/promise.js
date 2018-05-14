"use strict";

/* This is minimal implementation of the Nodent runtime that _requires_ external support for Promise, either as a 
 * platform-supplied global, or by setting $asyncbind.Promise once the runtime is loaded but before it is called,eg:
 * 
 * 		var _asyncRuntime = require('nodent-runtime/promise') ;
 * 		_asyncRuntime.$asyncbind.Promise = MyPromiseImpl ;
 *
 * $asyncbind has multiple uses, depending on the parameter list. 'this' is always a function to be bound
 */

function $asyncbind(self,catcher) {
    "use strict";
    var resolver = this;
    switch (catcher) {
    case true:
    case 0:
        return new ($asyncbind.Promise)(self);
    case undefined:
        return function boundThen() {
        		return resolver.apply(self,arguments);
    		}
    default:
        return function(){
            try {
                return resolver.apply(self,arguments);
            } catch(ex) {
                return catcher(ex);
            }
        }
    }
} ;

function $asyncspawn(promiseProvider,self) {
    if (!(this instanceof Function)) return ;
    var genF = this ;
    return new promiseProvider(function enough(resolve, reject) {
        var gen = genF.call(self, resolve, reject);
        function step(fn,arg) {
            var next;
            try {
                next = fn.call(gen,arg);
                if(next.done) {
                    if (next.value !== resolve) {
                        if (next.value && next.value===next.value.then)
                            return next.value(resolve,reject) ;
                        resolve && resolve(next.value);
                        resolve = null ;
                    }
                    return;
                }

                if (next.value.then) {
                    next.value.then(function(v) {
                        step(gen.next,v);
                    }, function(e) {
                        step(gen.throw,e);
                    });
                } else {
                    step(gen.next,next.value);
                }
            } catch(e) {
                reject && reject(e);
                reject = null ;
                return;
            }
        }
        step(gen.next);
    });
}

function trampoline(t,x,s,e,u){
    return function b(q) {
        while (q) {
            if (q.then) {
                q = q.then(b, e) ;
                return u?undefined:q;
            }
            try {
                if (q.pop) {
                    if (q.length)
                      return q.pop() ? x.call(t) : q;
                    q = s;
                 } else
                    q = q.call(t)
            } catch (r) {
                return e(r);
            }
        }
    }
};

/*$asyncbind.LazyThenable = $asyncbind.EagerThenable = $asyncbind.Thenable = */
try {
	$asyncbind.Promise = Promise;
} catch (ex) {
	// No global Promise is defined - maybe the caller will set one.
}
$asyncbind.trampoline = trampoline ;

// Export async bindings
module.exports = {
    $asyncbind:$asyncbind,
    $asyncspawn:$asyncspawn
};
