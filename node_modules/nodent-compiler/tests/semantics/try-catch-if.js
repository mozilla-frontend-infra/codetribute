async function nop(x) { return x ; }

async function one() {
	var z = 0;
	try {
		z = 1;
		throw -1;
		z = 2;
	} catch (error) {
		z = error;
		if (true) {
			await nop() ;
		}
		z = 6;
	} finally {
		z = 7;
	}
	return z;
}

async function two() {
	var z = 0;
	try {
		z = 1;
		throw -2;
		z = 2;
	} catch (error) {
		z = error;
		await nop() ;
		z = 6;
	} finally {
		z = 7;
	}
	return z;
}

async function three() {
	var z = 0;
	try {
		z = 1;
		throw await nop(-3);
		z = 2;
	} catch (error) {
		z = error;
		if (true) {
			await nop() ;
		}
		z = 6;
	} finally {
		z = 7;
	}
	return z;
}

return await one()*await two()*await three() ;