import {Core, isFuture} from './core';
import {noop} from './internal/fn';
import {invalidFuture} from './internal/throw';

var Cold = Cached.Cold = 0;
var Pending = Cached.Pending = 1;
var Rejected = Cached.Rejected = 2;
var Resolved = Cached.Resolved = 3;

export function Queued(rej, res){
  this[Rejected] = rej;
  this[Resolved] = res;
}

export function Cached(pure){
  this._pure = pure;
  this.reset();
}

Cached.prototype = Object.create(Core);

Cached.prototype.isRejected = function Cached$isRejected(){
  return this._state === Rejected;
};

Cached.prototype.isResolved = function Cached$isResolved(){
  return this._state === Resolved;
};

Cached.prototype.extractLeft = function Cached$extractLeft(){
  return this.isRejected() ? [this._value] : [];
};

Cached.prototype.extractRight = function Cached$extractRight(){
  return this.isResolved() ? [this._value] : [];
};

Cached.prototype._addToQueue = function Cached$addToQueue(rej, res){
  var _this = this;
  if(_this._state > Pending) return noop;
  var i = _this._queue.push(new Queued(rej, res)) - 1;
  _this._queued = _this._queued + 1;

  return function Cached$removeFromQueue(){
    if(_this._state > Pending) return;
    _this._queue[i] = undefined;
    _this._queued = _this._queued - 1;
    if(_this._queued === 0) _this.reset();
  };
};

Cached.prototype._drainQueue = function Cached$drainQueue(){
  if(this._state <= Pending) return;
  if(this._queued === 0) return;
  var queue = this._queue;
  var length = queue.length;
  var state = this._state;
  var value = this._value;

  for(var i = 0; i < length; i++){
    queue[i] && queue[i][state](value);
    queue[i] = undefined;
  }

  this._queue = undefined;
  this._queued = 0;
};

Cached.prototype.reject = function Cached$reject(reason){
  if(this._state > Pending) return;
  this._value = reason;
  this._state = Rejected;
  this._drainQueue();
};

Cached.prototype.resolve = function Cached$resolve(value){
  if(this._state > Pending) return;
  this._value = value;
  this._state = Resolved;
  this._drainQueue();
};

Cached.prototype.run = function Cached$run(){
  var _this = this;
  if(_this._state > Cold) return;
  _this._state = Pending;
  _this._cancel = _this._pure._fork(
    function Cached$fork$rej(x){ _this.reject(x) },
    function Cached$fork$res(x){ _this.resolve(x) }
  );
};

Cached.prototype.reset = function Cached$reset(){
  if(this._state === Cold) return;
  if(this._state > Pending) this._cancel();
  this._cancel = noop;
  this._queue = [];
  this._queued = 0;
  this._value = undefined;
  this._state = Cold;
};

Cached.prototype._fork = function Cached$_fork(rej, res){
  var cancel = noop;

  switch(this._state){
    case Pending: cancel = this._addToQueue(rej, res); break;
    case Rejected: rej(this._value); break;
    case Resolved: res(this._value); break;
    default: cancel = this._addToQueue(rej, res); this.run();
  }

  return cancel;
};

Cached.prototype.toString = function Cached$toString(){
  return 'Future.cache(' + this._pure.toString() + ')';
};

export function cache(m){
  if(!isFuture(m)) invalidFuture('Future.cache', 0, m);
  return new Cached(m);
}
