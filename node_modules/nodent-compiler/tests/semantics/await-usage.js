
async function test() {
	return "t" ;
}

async function go() {
	var s = await test() ?"a":"b" ;
	s = s+(await test() && "c") ;
	s = s+(await test() || "d") ;
	s = s+("e" && await test() ) ;
	s = s+("f" || await test()) ;
	s = s + (s?await test():"g") ;
	s = s + (s?"h":await test()) ;
	return s=="acttfth" ;
}

return await go() ;