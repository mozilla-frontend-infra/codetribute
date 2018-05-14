async function nop(x) { return x }

var resolve, p = new Promise(function(r){resolve=r}), s = [], n = 0 ;
var four = [0,1,2,3] ;

function later(f){
	n += 1 ;
	setTimeout(function(){
		f(s) ;
		n -= 1 ;
		if (n==0)
			resolve(s.join("-")) ;
	},0) ;
}

async function w(done) {
    var res = [] ;
    var i,j ;
    outer: for (i of four) {
        inner: for (j in four) {
            await nop() ;
            res.push(i,j);
            if (i<=j)
                break inner ;
            later(function(s) {s.push(i+j)}) ;
        }
    }
    return res.join("") ;
}

async function x(done) {
    var res = [] ;
    var i,j ;
    outer: for (i of four) {
        inner: for (j in four) {
            await nop() ;
            res.push(i,j);
            if (i<=j)
                continue outer ;
            later(function(s) {s.push(i+j)}) ;
        }
    }
    return res.join("") ;
}

async function y(done) {
    var res = [] ;
    outer: for (const i of four) {
        inner: for (let j in four) {
            await nop() ;
            res.push(i,j);
            if (i<=j)
                break inner ;
            later(function(s) {s.push(i+j)}) ;
        }
    }
    return res.join("") ;
}

async function z(done) {
    var res = [] ;
    outer: for (let i of four) {
        inner: for (const j in four) {
            await nop() ;
            res.push(i,j);
            if (i<=j)
                continue outer ;
            later(function(s) {s.push(i+j)}) ;
        }
    }
    return res.join("") ;
}

var ar = await z()+await y()+await x()+await w() ;
return p.then(function(r,x){
	return ar+r ;
}) ;
