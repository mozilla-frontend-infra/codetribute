async function abc(x) {
	if (x) {
		throw "def" ;
	}
	return "abc" ;
};

async function test1(x) {
	return abc(x) ;
}

var tests = [
    test1,
	async function(x) {
		return await abc(x) ;
	},
	async function(x) {
		return test1(x) ;
	},
	function(x) {
		return abc(x) ;
	},
	function(x) {
		return test1(x) ;
	}
];

async function go() {
	var passes = 0 ;
	for (var i=0; i<tests.length; i++) {
		for (var j=0; j<2; j++) {
			try {
				var k = await tests[i](j) ;
				if (k==="abc")
					passes += 1 ;
			} catch(ex) {
				if (ex==="def")
					passes += 1 ;
			}
		}
		
	}
	return passes==tests.length*2  ;
}

async function wrapMap() {
	var m = [], fns = tests.map(function(f){ return f()}) ;
	for (var i=0; i<fns.length; i++) {
		m[i] = await fns[i] ;
	}
	return m.every(function(x){return x==="abc"}) ;
}

return (await go() & await wrapMap())==true ;
