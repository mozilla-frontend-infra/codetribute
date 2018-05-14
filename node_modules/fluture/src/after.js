import {Core, isNever, never} from './core';
import {show, partial1} from './internal/fn';
import {isUnsigned} from './internal/is';
import {invalidArgument} from './internal/throw';

function After$race(other){
  return other.isSettled()
       ? other
       : isNever(other)
       ? this
       : typeof other._time === 'number'
       ? other._time < this._time ? other : this
       : Core._race.call(this, other);
}

export function After(time, value){
  this._time = time;
  this._value = value;
}

After.prototype = Object.create(Core);

After.prototype._race = After$race;

After.prototype._swap = function After$swap(){
  return new RejectAfter(this._time, this._value);
};

After.prototype._fork = function After$_fork(rej, res){
  var id = setTimeout(res, this._time, this._value);
  return function After$cancel(){ clearTimeout(id) };
};

After.prototype.extractRight = function After$extractRight(){
  return [this._value];
};

After.prototype.toString = function After$toString(){
  return 'Future.after(' + show(this._time) + ', ' + show(this._value) + ')';
};

export function RejectAfter(time, value){
  this._time = time;
  this._value = value;
}

RejectAfter.prototype = Object.create(Core);

RejectAfter.prototype._race = After$race;

RejectAfter.prototype._swap = function RejectAfter$swap(){
  return new After(this._time, this._value);
};

RejectAfter.prototype._fork = function RejectAfter$_fork(rej){
  var id = setTimeout(rej, this._time, this._value);
  return function RejectAfter$cancel(){ clearTimeout(id) };
};

RejectAfter.prototype.extractLeft = function RejectAfter$extractLeft(){
  return [this._value];
};

RejectAfter.prototype.toString = function RejectAfter$toString(){
  return 'Future.rejectAfter(' + show(this._time) + ', ' + show(this._value) + ')';
};

function after$time(time, value){
  return time === Infinity ? never : new After(time, value);
}

export function after(time, value){
  if(!isUnsigned(time)) invalidArgument('Future.after', 0, 'be a positive integer', time);
  if(arguments.length === 1) return partial1(after$time, time);
  return after$time(time, value);
}

function rejectAfter$time(time, reason){
  return time === Infinity ? never : new RejectAfter(time, reason);
}

export function rejectAfter(time, reason){
  if(!isUnsigned(time)) invalidArgument('Future.rejectAfter', 0, 'be a positive integer', time);
  if(arguments.length === 1) return partial1(rejectAfter$time, time);
  return rejectAfter$time(time, reason);
}
