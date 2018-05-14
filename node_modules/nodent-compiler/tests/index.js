var NodentCompiler = require('..') ;
var c = new NodentCompiler() ;

// On early node engines, Promise is not built in. If it's not, we try to use the
// implementation in nodent-runtime which is included as a dev-dependency since
// it's only used in this test script, and is not required by the compiler
global.$error = function(x) { console.log(x) };
require("nodent-runtime") ;

if (!('Promise' in global)){
	global.Promise = require("nodent-runtime/zousan")() ;
}
/* Test transformations */

var fs = require('fs') ;
var args = process.argv.slice(2) ;

var isVerbose = args.indexOf("--verbose")+1 ;
if (isVerbose) {
	args.splice(isVerbose-1,1) ;
}

var passed = 0, failed = 0, impossible = 0 ;
var complete, p = new Promise(function(r){ complete = r }) ;
var options = [
	{ sourcemap:false, promises: true, noRuntime: true },
	{ sourcemap:false, promises: true, noRuntime: false },
	{ sourcemap:false, generators:true },
	{ sourcemap:false, es7:true }
// NB: lazyThenable tests currently skipped as there are two known failues - nested-throw.js and dual-loop-decl-destructure-nest.js
//	{ sourcemap:false, es7:true, lazyThenables: true } 
] ;
var totalTests = args.length*options.length*2 ;

if (!Object.assign) {
	Object.assign = function(d,s) {
      Object.keys(s).forEach(function(k){
    	  	d[k] = s[k] ;
      });
	};
}

function check(file,sample,syncValue) {
	if (syncValue===undefined)
		throw new Error("undefined sync result") ;

	try {
		options.forEach(function(opts){
			var res = c.compile("return async function _(){"+sample+"}", null, Object.assign({},opts)) ;
			var fn = new Function(res.code)() ;
			fn().then(function(r){
				if (r===undefined)
					throw new Error("undefined async result") ;
				if (r === syncValue) {
					if (isVerbose)
						console.log("PASS",file, opts,"\nactual   : ",r,"\nexpected : ",syncValue) ;
					passed += 1 ;
				} else {
					console.log("FAIL",file, opts,"\nactual   : ",r,"\nexpected : ",syncValue) ;
					failed += 1 ;
				}
				if (passed+failed >= totalTests)
					complete() ;

			},function(x){
				console.log("REJECT",file,x.message,opts) ;
				failed += 1 ;
				if (passed+failed >= totalTests)
					complete() ;
			}) ;
		}) ;
	} catch (ex) {
		console.log("ERROR",file,ex.message) ;
		failed += 1 ;
		if (passed+failed >= totalTests)
			complete() ;
	}
}

function test(fileName,sample){
	try {
		var syncFn = new Function(sample.replace(/(async|await)/g," ")) ;
		var s = syncFn() ;
		if (s && s.then) 
			s.then(check.bind(null,fileName,sample),check.bind(null,fileName,sample)) ;
		else 
			check(fileName,sample,s) ;
	} catch(ex) {
		failed += options.length ;
		impossible += options.length ;
		console.log("FAIL",fileName,"requires a later version of nodejs",ex) ;
	}
}

for (var idx = 0; idx <args.length; idx++) {
	var fileName = args[idx] ;
	var code = fs.readFileSync(fileName).toString() ;
	test(fileName,"'"+fileName+"';\n\n"+code) ;
	test(fileName,"'use strict';\n\n'"+fileName+"';\n\n"+code) ;
} ;

p.then(function(){
	console.log(passed+" test(s) passed") ;
	failed && console.log(failed+" test(s) FAILED",impossible ? "(of which "+impossible+" expected a later version of node)":"") ; 
},$error) ;