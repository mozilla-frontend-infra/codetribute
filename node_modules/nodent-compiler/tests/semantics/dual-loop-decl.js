async function nop(x) { return x }

const list = [ 'a','b','c' ];

var count = list.length ;
var resolve ;
var p = new Promise(function(r){ resolve = r }) ;
var s = "" ;
for(let v of list) {
	await nop() ;
	setTimeout(function(){
		s += v ;
		count-- ;
		if (count<=0)
			resolve(s) ;
	}, 0);
}
return p ;

