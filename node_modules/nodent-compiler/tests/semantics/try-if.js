var s ;

async function breathe() {}

async function test(x) {
	if (x){
		try {
			await breathe(1); 
		} catch (ex) {
			throw ex ;
		}
		await breathe(3) ;
		s += "x" ;
	}
	s += "y" ;
	return 0 ;
}


s = "" ;
await test(0) ; 
await test(1);
return s=="yxy";
