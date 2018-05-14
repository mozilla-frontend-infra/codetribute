import {show, showf, noop, moop} from './internal/fn';
import {isFunction} from './internal/is';
import {error, typeError, invalidArgument, invalidContext, invalidFuture} from './internal/throw';
import {FL, $$type} from './internal/const';
import interpreter from './internal/interpreter';
import {empty as emptyList, cons} from './internal/list';
import type from 'sanctuary-type-identifiers';

function throwRejection(x){
  error('Future#value was called on a rejected Future\n  Actual: Future.reject(' + show(x) + ')');
}

export function Future(computation){
  if(!isFunction(computation)) invalidArgument('Future', 0, 'be a Function', computation);
  return new Computation(computation);
}

export function isFuture(x){
  return x instanceof Future || type(x) === $$type;
}

Future['@@type'] = $$type;

Future.prototype[FL.ap] = function Future$FL$ap(other){
  return other._ap(this);
};

Future.prototype[FL.map] = function Future$FL$map(mapper){
  return this._map(mapper);
};

Future.prototype[FL.bimap] = function Future$FL$bimap(lmapper, rmapper){
  return this._bimap(lmapper, rmapper);
};

Future.prototype[FL.chain] = function Future$FL$chain(mapper){
  return this._chain(mapper);
};

Future.prototype.ap = function Future$ap(other){
  if(!isFuture(this)) invalidContext('Future#ap', this);
  if(!isFuture(other)) invalidFuture('Future#ap', 0, other);
  return this._ap(other);
};

Future.prototype.map = function Future$map(mapper){
  if(!isFuture(this)) invalidContext('Future#map', this);
  if(!isFunction(mapper)) invalidArgument('Future#map', 0, 'to be a Function', mapper);
  return this._map(mapper);
};

Future.prototype.bimap = function Future$bimap(lmapper, rmapper){
  if(!isFuture(this)) invalidContext('Future#bimap', this);
  if(!isFunction(lmapper)) invalidArgument('Future#bimap', 0, 'to be a Function', lmapper);
  if(!isFunction(rmapper)) invalidArgument('Future#bimap', 1, 'to be a Function', rmapper);
  return this._bimap(lmapper, rmapper);
};

Future.prototype.chain = function Future$chain(mapper){
  if(!isFuture(this)) invalidContext('Future#chain', this);
  if(!isFunction(mapper)) invalidArgument('Future#chain', 0, 'to be a Function', mapper);
  return this._chain(mapper);
};

Future.prototype.mapRej = function Future$mapRej(mapper){
  if(!isFuture(this)) invalidContext('Future#mapRej', this);
  if(!isFunction(mapper)) invalidArgument('Future#mapRej', 0, 'to be a Function', mapper);
  return this._mapRej(mapper);
};

Future.prototype.chainRej = function Future$chainRej(mapper){
  if(!isFuture(this)) invalidContext('Future#chainRej', this);
  if(!isFunction(mapper)) invalidArgument('Future#chainRej', 0, 'to be a Function', mapper);
  return this._chainRej(mapper);
};

Future.prototype.race = function Future$race(other){
  if(!isFuture(this)) invalidContext('Future#race', this);
  if(!isFuture(other)) invalidFuture('Future#race', 0, other);
  return this._race(other);
};

Future.prototype.both = function Future$both(other){
  if(!isFuture(this)) invalidContext('Future#both', this);
  if(!isFuture(other)) invalidFuture('Future#both', 0, other);
  return this._both(other);
};

Future.prototype.and = function Future$and(other){
  if(!isFuture(this)) invalidContext('Future#and', this);
  if(!isFuture(other)) invalidFuture('Future#and', 0, other);
  return this._and(other);
};

Future.prototype.or = function Future$or(other){
  if(!isFuture(this)) invalidContext('Future#or', this);
  if(!isFuture(other)) invalidFuture('Future#or', 0, other);
  return this._or(other);
};

Future.prototype.swap = function Future$swap(){
  if(!isFuture(this)) invalidContext('Future#ap', this);
  return this._swap();
};

Future.prototype.fold = function Future$fold(lmapper, rmapper){
  if(!isFuture(this)) invalidContext('Future#ap', this);
  if(!isFunction(lmapper)) invalidArgument('Future#fold', 0, 'to be a Function', lmapper);
  if(!isFunction(rmapper)) invalidArgument('Future#fold', 1, 'to be a Function', rmapper);
  return this._fold(lmapper, rmapper);
};

Future.prototype.finally = function Future$finally(other){
  if(!isFuture(this)) invalidContext('Future#finally', this);
  if(!isFuture(other)) invalidFuture('Future#finally', 0, other);
  return this._finally(other);
};

Future.prototype.lastly = function Future$lastly(other){
  if(!isFuture(this)) invalidContext('Future#lastly', this);
  if(!isFuture(other)) invalidFuture('Future#lastly', 0, other);
  return this._finally(other);
};

Future.prototype.fork = function Future$fork(rej, res){
  if(!isFuture(this)) invalidContext('Future#fork', this);
  if(!isFunction(rej)) invalidArgument('Future#fork', 0, 'to be a Function', rej);
  if(!isFunction(res)) invalidArgument('Future#fork', 0, 'to be a Function', res);
  return this._fork(rej, res);
};

Future.prototype.value = function Future$value(res){
  if(!isFuture(this)) invalidContext('Future#value', this);
  if(!isFunction(res)) invalidArgument('Future#value', 0, 'to be a Function', res);
  return this._fork(throwRejection, res);
};

Future.prototype.done = function Future$done(callback){
  if(!isFuture(this)) invalidContext('Future#done', this);
  if(!isFunction(callback)) invalidArgument('Future#done', 0, 'to be a Function', callback);
  return this._fork(function Future$done$rej(x){ callback(x) },
                    function Future$done$res(x){ callback(null, x) });
};

Future.prototype.promise = function Future$promise(){
  var _this = this;
  return new Promise(function Future$promise$computation(res, rej){
    _this._fork(rej, res);
  });
};

Future.prototype.isRejected = function Future$isRejected(){
  return false;
};

Future.prototype.isResolved = function Future$isResolved(){
  return false;
};

Future.prototype.isSettled = function Future$isSettled(){
  return this.isRejected() || this.isResolved();
};

Future.prototype.extractLeft = function Future$extractLeft(){
  return [];
};

Future.prototype.extractRight = function Future$extractRight(){
  return [];
};

export var Core = Object.create(Future.prototype);

Core._ap = function Core$ap(other){
  return new Sequence(this)._ap(other);
};

Core._map = function Core$map(mapper){
  return new Sequence(this)._map(mapper);
};

Core._bimap = function Core$bimap(lmapper, rmapper){
  return new Sequence(this)._bimap(lmapper, rmapper);
};

Core._chain = function Core$chain(mapper){
  return new Sequence(this)._chain(mapper);
};

Core._mapRej = function Core$mapRej(mapper){
  return new Sequence(this)._mapRej(mapper);
};

Core._chainRej = function Core$chainRej(mapper){
  return new Sequence(this)._chainRej(mapper);
};

Core._race = function Core$race(other){
  return new Sequence(this)._race(other);
};

Core._both = function Core$both(other){
  return new Sequence(this)._both(other);
};

Core._and = function Core$and(other){
  return new Sequence(this)._and(other);
};

Core._or = function Core$or(other){
  return new Sequence(this)._or(other);
};

Core._swap = function Core$swap(){
  return new Sequence(this)._swap();
};

Core._fold = function Core$fold(lmapper, rmapper){
  return new Sequence(this)._fold(lmapper, rmapper);
};

Core._finally = function Core$finally(other){
  return new Sequence(this)._finally(other);
};

function check$fork(f, c){
  if(!(f === undefined || (isFunction(f) && f.length === 0))) typeError(
    'Future expected its computation to return a nullary function or void'
    + '\n  Actual: ' + show(f) + '\n  From calling: ' + showf(c)
  );
}

export function Computation(computation){
  this._computation = computation;
}

Computation.prototype = Object.create(Core);

Computation.prototype._fork = function Computation$_fork(rej, res){
  var open = true;
  var cancel = this._computation(function Computation$rej(x){
    if(open){
      open = false;
      rej(x);
    }
  }, function Computation$res(x){
    if(open){
      open = false;
      res(x);
    }
  });
  check$fork(cancel, this._computation);

  return function Computation$cancel(){
    if(open){
      open = false;
      cancel && cancel();
    }
  };
};

Computation.prototype.toString = function Computation$toString(){
  return 'Future(' + showf(this._computation) + ')';
};

export function Rejected(value){
  this._value = value;
}

Rejected.prototype = Object.create(Core);

Rejected.prototype._ap = moop;
Rejected.prototype._map = moop;
Rejected.prototype._chain = moop;
Rejected.prototype._race = moop;
Rejected.prototype._both = moop;
Rejected.prototype._and = moop;

Rejected.prototype._or = function Rejected$or(other){
  return other;
};

Rejected.prototype._finally = function Rejected$finally(other){
  return other._and(this);
};

Rejected.prototype._swap = function Rejected$swap(){
  return new Resolved(this._value);
};

Rejected.prototype._fork = function Rejected$_fork(rej){
  rej(this._value);
  return noop;
};

Rejected.prototype.isRejected = function Rejected$isRejected(){
  return true;
};

Rejected.prototype.extractLeft = function Rejected$extractLeft(){
  return [this._value];
};

Rejected.prototype.toString = function Rejected$toString(){
  return 'Future.reject(' + show(this._value) + ')';
};

export function reject(x){
  return new Rejected(x);
}

export function Resolved(value){
  this._value = value;
}

Resolved.prototype = Object.create(Core);

Resolved.prototype._race = moop;
Resolved.prototype._mapRej = moop;
Resolved.prototype._or = moop;

Resolved.prototype._and = function Resolved$and(other){
  return other;
};

Resolved.prototype._both = function Resolved$both(other){
  var left = this._value;
  return other._map(function Resolved$both$mapper(right){
    return [left, right];
  });
};

Resolved.prototype._swap = function Resolved$swap(){
  return new Rejected(this._value);
};

Resolved.prototype._finally = function Resolved$finally(other){
  var value = this._value;
  return other._map(function Resolved$finally$mapper(){
    return value;
  });
};

Resolved.prototype._fork = function _fork(rej, res){
  res(this._value);
  return noop;
};

Resolved.prototype.isResolved = function Resolved$isResolved(){
  return true;
};

Resolved.prototype.extractRight = function Resolved$extractRight(){
  return [this._value];
};

Resolved.prototype.toString = function Resolved$toString(){
  return 'Future.of(' + show(this._value) + ')';
};

export function of(x){
  return new Resolved(x);
}

function Never(){
  this._isNever = true;
}

Never.prototype = Object.create(Future.prototype);

Never.prototype._ap = moop;
Never.prototype._map = moop;
Never.prototype._bimap = moop;
Never.prototype._chain = moop;
Never.prototype._mapRej = moop;
Never.prototype._chainRej = moop;
Never.prototype._both = moop;
Never.prototype._or = moop;
Never.prototype._swap = moop;
Never.prototype._fold = moop;
Never.prototype._finally = moop;

Never.prototype._race = function Never$race(other){
  return other;
};

Never.prototype._fork = function Never$_fork(){
  return noop;
};

Never.prototype.toString = function Never$toString(){
  return 'Future.never';
};

export var never = new Never();

export function isNever(x){
  return isFuture(x) && x._isNever === true;
}

function Eager(future){
  var _this = this;
  _this.rej = noop;
  _this.res = noop;
  _this.rejected = false;
  _this.resolved = false;
  _this.value = null;
  _this.cancel = future._fork(function Eager$reject(x){
    _this.value = x;
    _this.rejected = true;
    _this.cancel = noop;
    _this.rej(x);
  }, function Eager$resolve(x){
    _this.value = x;
    _this.resolved = true;
    _this.cancel = noop;
    _this.res(x);
  });
}

Eager.prototype = Object.create(Core);

Eager.prototype._fork = function Eager$_fork(rej, res){
  if(this.rejected) rej(this.value);
  else if(this.resolved) res(this.value);
  else{
    this.rej = rej;
    this.res = res;
  }
  return this.cancel;
};

function check$ap(f){
  return isFunction(f) ? f : typeError(
    'Future#ap expects its first argument to be a Future of a Function'
    + '\n  Actual: Future.of(' + show(f) + ')'
  );
}

function check$chain(m, f, x){
  return isFuture(m) ? m : invalidFuture(
    'Future#chain',
    'the function it\'s given to return a Future',
    m,
    '\n  From calling: ' + showf(f) + '\n  With: ' + show(x)
  );
}

function check$chainRej(m, f, x){
  return isFuture(m) ? m : invalidFuture(
    'Future#chainRej',
    'the function it\'s given to return a Future',
    m,
    '\n  From calling: ' + showf(f) + '\n  With: ' + show(x)
  );
}

export var Action = {
  rejected: function Action$rejected(x){ this.cancel(); return new Rejected(x) },
  resolved: function Action$resolved(x){ this.cancel(); return new Resolved(x) },
  run: function Action$run(){ return this },
  cancel: function Action$cancel(){}
};

export function ApAction(other){ this.other = other }
ApAction.prototype = Object.create(Action);

ApAction.prototype.resolved = function ApAction$resolved(f){
  check$ap(f);
  return this.other._map(function ApAction$resolved$mapper(x){ return f(x) });
};

ApAction.prototype.toString = function ApAction$toString(){
  return 'ap(' + this.other.toString() + ')';
};

export function MapAction(mapper){ this.mapper = mapper }
MapAction.prototype = Object.create(Action);

MapAction.prototype.resolved = function MapAction$resolved(x){
  return new Resolved(this.mapper(x));
};

MapAction.prototype.toString = function MapAction$toString(){
  return 'map(' + showf(this.mapper) + ')';
};

export function BimapAction(lmapper, rmapper){ this.lmapper = lmapper; this.rmapper = rmapper }
BimapAction.prototype = Object.create(Action);

BimapAction.prototype.rejected = function BimapAction$rejected(x){
  return new Rejected(this.lmapper(x));
};

BimapAction.prototype.resolved = function BimapAction$resolved(x){
  return new Resolved(this.rmapper(x));
};

BimapAction.prototype.toString = function BimapAction$toString(){
  return 'bimap(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
};

export function ChainAction(mapper){ this.mapper = mapper }
ChainAction.prototype = Object.create(Action);

ChainAction.prototype.resolved = function ChainAction$resolved(x){
  return check$chain(this.mapper(x), this.mapper, x);
};

ChainAction.prototype.toString = function ChainAction$toString(){
  return 'chain(' + showf(this.mapper) + ')';
};

export function MapRejAction(mapper){ this.mapper = mapper }
MapRejAction.prototype = Object.create(Action);

MapRejAction.prototype.rejected = function MapRejAction$rejected(x){
  return new Rejected(this.mapper(x));
};

MapRejAction.prototype.toString = function MapRejAction$toString(){
  return 'mapRej(' + showf(this.mapper) + ')';
};

export function ChainRejAction(mapper){ this.mapper = mapper }
ChainRejAction.prototype = Object.create(Action);

ChainRejAction.prototype.rejected = function ChainRejAction$rejected(x){
  return check$chainRej(this.mapper(x), this.mapper, x);
};

ChainRejAction.prototype.toString = function ChainRejAction$toString(){
  return 'chainRej(' + showf(this.mapper) + ')';
};

export function SwapAction(){}
SwapAction.prototype = Object.create(Action);

SwapAction.prototype.rejected = function SwapAction$rejected(x){
  return new Resolved(x);
};

SwapAction.prototype.resolved = function SwapAction$resolved(x){
  return new Rejected(x);
};

SwapAction.prototype.toString = function SwapAction$toString(){
  return 'swap()';
};

export function FoldAction(lmapper, rmapper){ this.lmapper = lmapper; this.rmapper = rmapper }
FoldAction.prototype = Object.create(Action);

FoldAction.prototype.rejected = function FoldAction$rejected(x){
  return new Resolved(this.lmapper(x));
};

FoldAction.prototype.resolved = function FoldAction$resolved(x){
  return new Resolved(this.rmapper(x));
};

FoldAction.prototype.toString = function FoldAction$toString(){
  return 'fold(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
};

export function FinallyAction(other){ this.other = other }
FinallyAction.prototype = Object.create(Action);

FinallyAction.prototype.rejected = function FinallyAction$rejected(x){
  return this.other._and(new Rejected(x));
};

FinallyAction.prototype.resolved = function FinallyAction$resolved(x){
  return this.other._map(function FoldAction$resolved$mapper(){ return x });
};

FinallyAction.prototype.cancel = function FinallyAction$cancel(){
  this.other._fork(noop, noop)();
};

FinallyAction.prototype.toString = function FinallyAction$toString(){
  return 'finally(' + this.other.toString() + ')';
};

export function AndAction(other){ this.other = other }
AndAction.prototype = Object.create(Action);

AndAction.prototype.resolved = function AndAction$resolved(){
  return this.other;
};

AndAction.prototype.toString = function AndAction$toString(){
  return 'and(' + this.other.toString() + ')';
};

export function OrAction(other){ this.other = other }
OrAction.prototype = Object.create(Action);

OrAction.prototype.rejected = function OrAction$rejected(){
  return this.other;
};

OrAction.prototype.toString = function OrAction$toString(){
  return 'or(' + this.other.toString() + ')';
};

export function RaceAction(other){ this.other = other }
RaceAction.prototype = Object.create(Action);

RaceAction.prototype.run = function RaceAction$run(early){
  return new RaceActionState(early, new Eager(this.other));
};

RaceAction.prototype.toString = function RaceAction$toString(){
  return 'race(' + this.other.toString() + ')';
};

export function BothAction(other){ this.other = other }
BothAction.prototype = Object.create(Action);

BothAction.prototype.resolved = function BothAction$resolved(x){
  return this.other._map(function BothAction$resolved$mapper(y){ return [x, y] });
};

BothAction.prototype.run = function BothAction$run(early){
  return new BothActionState(early, new Eager(this.other));
};

BothAction.prototype.toString = function BothAction$toString(){
  return 'both(' + this.other.toString() + ')';
};

export function RaceActionState(early, other){
  var _this = this;
  _this.other = other;
  _this.cancel = other._fork(
    function RaceActionState$rej(x){ early(new Rejected(x), _this) },
    function RaceActionState$res(x){ early(new Resolved(x), _this) }
  );
}

RaceActionState.prototype = Object.create(RaceAction.prototype);

export function BothActionState(early, other){
  var _this = this;
  _this.other = other;
  _this.cancel = other._fork(
    function BothActionState$rej(x){ early(new Rejected(x), _this) },
    noop
  );
}

BothActionState.prototype = Object.create(BothAction.prototype);

export function Sequence(spawn, actions){
  this._spawn = spawn;
  this._actions = actions || emptyList;
}

Sequence.prototype = Object.create(Future.prototype);

Sequence.prototype._transform = function Sequence$_transform(action){
  return new Sequence(this._spawn, cons(action, this._actions));
};

Sequence.prototype._ap = function Sequence$ap(other){
  return this._transform(new ApAction(other));
};

Sequence.prototype._map = function Sequence$map(mapper){
  return this._transform(new MapAction(mapper));
};

Sequence.prototype._bimap = function Sequence$bimap(lmapper, rmapper){
  return this._transform(new BimapAction(lmapper, rmapper));
};

Sequence.prototype._chain = function Sequence$chain(mapper){
  return this._transform(new ChainAction(mapper));
};

Sequence.prototype._mapRej = function Sequence$mapRej(mapper){
  return this._transform(new MapRejAction(mapper));
};

Sequence.prototype._chainRej = function Sequence$chainRej(mapper){
  return this._transform(new ChainRejAction(mapper));
};

Sequence.prototype._race = function Sequence$race(other){
  return isNever(other) ? this : this._transform(new RaceAction(other));
};

Sequence.prototype._both = function Sequence$both(other){
  return this._transform(new BothAction(other));
};

Sequence.prototype._and = function Sequence$and(other){
  return this._transform(new AndAction(other));
};

Sequence.prototype._or = function Sequence$or(other){
  return this._transform(new OrAction(other));
};

Sequence.prototype._swap = function Sequence$swap(){
  return this._transform(new SwapAction);
};

Sequence.prototype._fold = function Sequence$fold(lmapper, rmapper){
  return this._transform(new FoldAction(lmapper, rmapper));
};

Sequence.prototype._finally = function Sequence$finally(other){
  return this._transform(new FinallyAction(other));
};

Sequence.prototype._fork = interpreter;

Sequence.prototype.toString = function Sequence$toString(){
  var str = '', tail = this._actions;

  while(!tail.isEmpty){
    str = '.' + tail.head.toString() + str;
    tail = tail.tail;
  }

  return this._spawn.toString() + str;
};
