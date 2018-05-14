async function x1(y) {
    function done() {
        try {
            if (!y)
                throw "a";
             async return y;
        } catch (ex) {
             async return ex;
        }
    }
    return done() ;
}

async function x2(y) {
    function done() {
        try {
            if (!y)
                 async throw "b";
             async return y;
        } catch (ex) {
             async return ex;
        }
    }

    return done() ;
}

  var s ;
  try {
      s = await x1('c');
      s += await x2('d');
      s += await x1();
      s += await x2();
  } catch (ex) {
      s += ex;
  }
  return s === 'cdab' ;
