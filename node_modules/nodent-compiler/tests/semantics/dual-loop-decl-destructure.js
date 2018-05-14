async function nop(x) { return x }
var resolve,p = new Promise(function(r){resolve = r}) ;
for(let [a,b] = [-5,0]; b < 4; b++, a *= 2) {
	await nop() ;
	setTimeout(function(){
		if (b===3)
			resolve(a) ;
	}, 0);
}
return await p ;
