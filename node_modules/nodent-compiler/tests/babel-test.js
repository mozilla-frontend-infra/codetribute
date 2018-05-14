/* Test transformation by Babel;*/

var fs = require('fs') ;
var babylon = require('@babel/babylon');
var generate = require('@babel/babel-generator').default;
var visitKeys = require('@babel/babel-types').VISITOR_KEYS;

var _asyncRuntime = require('nodent-runtime/promise');
function printNode(ast) {
    return generate(ast,{}).code ;
}

function parse(code) {
	return babylon.parse(code,{
		allowImportExportEverywhere:true,
		allowReturnOutsideFunction:true,
		allowSuperOutsideMethod:true
	}).program ;
}

var transform = require('nodent-transform').transform ;

for (var idx = 2; idx <process.argv.length; idx++) (function(){
	var fileName = process.argv[idx] ;
	var sample = '(async function _(){ '+fs.readFileSync(fileName).toString()+'})';

	try {
		var ast = parse(sample);

		var newAst = transform({
			// Input: the ast and filename
			filename:fileName,
			ast:ast
		},{
			// Code generation options
			es6target:false,
			babelTree:true,
			engine:false,
			generators:false,
			promises:true,
			lazyThenables:false,
			wrapAwait:true,
			noRuntime:false,
			$runtime:'_asyncRuntime',
		    generatedSymbolPrefix:"$",
		    $return:"$return",
		    $error:"$error",
		    $arguments:"$args",
		    $Promise:"Promise",
		    $asyncspawn:"$asyncspawn",
		    $asyncbind:"$asyncbind",
		    $makeThenable:'$makeThenable'
		},
		{
			// Helpers for the transformer:
			parse: parse,						// Parse a JS fragment into an AST
			printNode: printNode,				// Print a node as JS source
			logger:console.log.bind(console)		// Log a warning
		}).ast ;

		//console.log(printNode(newAst))
		
		Promise.all([sample,printNode(ast),printNode(newAst)].map(function(code) {
			return eval(code)()
		})).then(
			function(r) { console.log(fileName,r && r[0]==r[1] && r[1]==r[2]) },
			function(ex) { console.log(fileName,ex) }
		) ;

	} catch (ex) {
		console.log(fileName,ex) ;
	}
})();