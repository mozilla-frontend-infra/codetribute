function doStuff(x) { 
	var p = new Promise(function(resolve,reject){ setTimeout(function(){reject(x)},1)}) ;
	p.catch(function(){}) ;
	throw p ;
}

async function test() {
	var s = "" ;
	try {
		await doStuff("abc");
	} catch (e) {
		s = s+e ;
	}
	try {
		await doStuff("def");
	} catch (e) {
		s = s+e ;
	}
	return s=="abcdef" ;
};

return test() ;