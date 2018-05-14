async function inc(x) {
	return x+1 ;
};

async function test() {
	var s = "" ;
	for (var i=0; i<10; i++) {
		if (i*i >= 30) {
			s += "break"+i+" " ;
			break ;
		}
		if (i*i >= 9) {
			s += "big"+i+" " ;
			continue ;
		}
		s += await inc(i)+"-"+i*i+" " ;
	}

	for (i=0; i<10; i++) {
		if (i >= 5) {
			return s+"ret" ;
		}
		s += await inc(i)+"-"+i*i+" " ;
	}
	s += "ok" ;
	return s ;
}

return test() ;