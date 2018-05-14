async function nop(x) {
    return x;
}

var count = 0, s = [] ;
var resolve ;
var p = new Promise(function(r){ resolve = r }) ;

loop:for (let [v,w] = [0,1];v < 25; v += await nop(w)) {
    await nop();
    v += 1;
    count += 1 ;
    setTimeout(function () {
        s.push(v, w);
        if (!--count)
        		resolve(s.join(",")) ;
    }, 0);
    if (v == 10) 
        continue loop;
    v += 1;
    w += 1;
}

return p;