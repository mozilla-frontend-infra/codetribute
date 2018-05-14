(function(f) {

  'use strict';

  /*istanbul ignore next*/
  if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f();
  }else{
    self.inspectf = f();
  }

}(function() {

  'use strict';

  function checkn(n) {
    if(typeof n !== 'number') {
      throw new TypeError(
        'inspectf expects its first argument to be a number'
      );
    }
  }

  function checkf(f) {
    if(typeof f !== 'function') {
      throw new TypeError(
        'inspectf expects its second argument to be a function'
      );
    }
  }

  var RSPACE = /^ */;
  var RCODE = /\s*[^\s]/;
  var RTABS = /\t/g;
  var REOL = /\n\r?/;

  function isCode(line) {
    return RCODE.test(line);
  }

  function getPadding(line) {
    return line.match(RSPACE)[0].length;
  }

  function guessIndentation(lines) {
    var filtered = lines.filter(isCode);
    var paddings = filtered.map(getPadding);
    var depth = paddings.reduce(Math.min, Infinity);
    var tabsize = paddings
    .map(function(x) { return x - depth; })
    .find(function(x) { return x > 1; }) || 2;
    return {depth: depth, tabsize: tabsize};
  }

  function pad(n) {
    return (new Array(n + 1)).join(' ');
  }

  function show(f, indentation) {
    return f.toString().replace(RTABS, indentation);
  }

  function toLines(s) {
    return s.split(REOL);
  }

  function fixIndentation(lines, indentation) {
    var info = guessIndentation(lines.slice(1));
    var RPAD = new RegExp(pad(info.tabsize), 'g');
    return lines.map(function(line) {
      return line.slice(Math.min(info.depth, getPadding(line)))
      .replace(RPAD, '\t').replace(RTABS, indentation);
    }).join('\n');
  }

  return function inspectf(n, f) {
    checkn(n);

    if(arguments.length < 2) {
      return function inspectf$partial(f) { return inspectf(n, f); };
    }

    checkf(f);
    if(f.toString !== Function.prototype.toString) { return f.toString(); }
    var i = pad(n), shown = show(f, i), lines = toLines(shown, i);
    if(lines.length < 2) { return shown; }
    return fixIndentation(lines, i);
  };

}));
