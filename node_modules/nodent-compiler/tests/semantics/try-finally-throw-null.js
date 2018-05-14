async function f() {
	if (true) {
		try {
			await Promise.resolve() ;
		} finally {
			throw "x";
		}
	}
}

try {
	return await f() ;
} catch (ex) {
	return "error:"+ex ;
}
//return f.toString()

