async function nop(x) { return x }
var resolve,p = new Promise(function(r){resolve = r}) ;
var i = 0, x = 0, s = 1 ;
while (i<5) {
	const j = i+1 ;
	await nop() ;
	setTimeout(function(){
		x += 1 ;
		s *= j ;
		if (x===5) {
			resolve(s) ;
		}
	}, 0);
	i++ ;
}

return await p ;
