'use strict';

var acorn = require("acorn");
var treeSurgeon = require('nodent-transform') ;
var outputCode = require('./output') ;

var alreadyInstalledPlugin = false ;

function acornParse(code,config) {
    var comments = [] ;
    var options = {
        ecmaVersion:9,
        allowHashBang:true,
        allowReturnOutsideFunction:true,
        allowImportExportEverywhere:true,
        locations:true,
        onComment:comments
    } ;

    if (config)
        for (var k in config)
            if (k !== 'noNodentExtensions' && k != 'onParserInstallation')
                options[k] = config[k] ;

    if (!(config && config.noNodentExtensions) || parseInt(acorn.version) < 4) {
        if (!alreadyInstalledPlugin) {
            if (parseInt(acorn.version) < 4)
                console.warn("Nodent: Warning - noNodentExtensions option requires acorn >=v4.x. Extensions installed.") ;
            require('acorn-es7-plugin')(acorn) ;
            if (config && config.onParserInstallation) config.onParserInstallation(acorn) ;
            alreadyInstalledPlugin = true ;
        }
        options.plugins = options.plugins || {} ;
        options.plugins.asyncawait = {asyncExits:true, awaitAnywhere:true} ;
    }

    var ast = acorn.parse(code,options) ;

    // attach comments to the most tightly containing node
    treeSurgeon.treeWalker(ast,function(node,descend,path){
        descend() ;
        while (comments.length && node.loc &&
            (node.loc.start.line >= comments[0].loc.start.line && node.loc.end.line>=comments[0].loc.end.line)) {
            node.$comments = node.$comments||[] ;
            node.$comments.push(comments.shift()) ;
        }
    }) ;
    return ast ;
}

function parse(code) {
	return acornParse(code, {
      noNodentExtensions:true, // The partial parser only ever parses vanilla JS
      locations:false,
      ranges:false,
      onComment:null
    }) ;
}	

function printNode(n) {
    if (!n) return '' ;
    if (Array.isArray(n))
        return n.map(printNode).join("|\n");
    try {
        return outputCode(n) ; //+"\t//@"+Object.keys(n).filter(function(k){ return k[0]==='$'}).map(function(k){ return k+":"+n[k] });
    } catch (ex) {
        return ex.message + ": " + (n && n.type);
    }
} ;

/* Utils */
function copyObj(a){
    var o = {} ;
    a.forEach(function(b){
        if (b && typeof b==='object')
            for (var k in b)
                o[k] = b[k]  ;
    }) ;
    return o ;
}

function btoa(str) {
    var buffer ;
    if (str instanceof Buffer) {
        buffer = str;
    } else {
    		if (Buffer.from) {
    	        buffer = Buffer.from(str.toString(), 'binary');
    		} else {
    	        buffer = new Buffer(str.toString(), 'binary');
    		}
    }

    return buffer.toString('base64');
}

function noLogger(){}

/* NodentCompiler prototypes, that refer to 'this' */
function compile(code,origFilename,__sourceMapping,opts) {
    if (typeof __sourceMapping==="object" && opts===undefined)
        opts = __sourceMapping ;

    opts = opts || {} ;

    // Fill in any default codeGen options
    for (var k in NodentCompiler.initialCodeGenOpts) {
        if (!(k in opts))
            opts[k] = NodentCompiler.initialCodeGenOpts[k] ;
    }

    var pr = this.parse(code,origFilename,null,opts);
    this.transform(pr,opts,{
		parse: parse,						// Parse a JS fragment into an AST
		printNode: printNode,				// Print a node as JS source
		logger:this.logger || noLogger		// Log a warning
    }) ;
    this.prettyPrint(pr,opts) ;
    return pr ;
}

function prettyPrint(pr,opts) {
    var map ;
    var filepath = pr.filename ? pr.filename.split("/") :["anonymous"] ;
    var filename = filepath.pop() ;

    var out = outputCode(pr.ast,(opts && opts.sourcemap)?{map:{
        startLine: opts.mapStartLine || 0,
        file: filename+"(original)",
        sourceMapRoot: filepath.join("/"),
        sourceContent: pr.origCode
    }}:null, pr.origCode) ;

    if (opts && opts.sourcemap){
        try {
            var mapUrl = "" ;
            var jsmap = out.map.toJSON();
            if (jsmap) {
                // require an expression to defeat browserify
                var SourceMapConsumer = require('source-map').SourceMapConsumer;
                pr.sourcemap = jsmap ;
                this.smCache[pr.filename] = {map:jsmap,smc:new SourceMapConsumer(jsmap)} ;
                mapUrl = "\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,"
                    +btoa(JSON.stringify(jsmap))+"\n" ;
            }
            pr.code = out.code+mapUrl ;
        } catch (ex) {
            pr.code = out ;
        }
    } else {
        pr.code = out ;
    }
    return pr ;
}

function NodentCompiler(members) {
    this.covers = {} ;
    this._ident = NodentCompiler.prototype.version+"_"+Math.random() ;
    this.setOptions(members || {}) ;
}

NodentCompiler.prototype.smCache = {} ;

NodentCompiler.prototype.setOptions = function(members){
    this.log = members.log===false?noLogger:members.log||this.log;
    this.options = copyObj([this.options,members]) ;
    delete this.options.log ;
    return this ;
};

function parseCode(code,origFilename,__sourceMapping,opts) {
    if (typeof __sourceMapping==="object" && opts===undefined)
        opts = __sourceMapping ;

    var r = { origCode:code.toString(), filename:origFilename } ;
    try {
        r.ast = acornParse(r.origCode, opts && opts.parser) ;
        if (opts.babelTree) {
        		treeSurgeon.treeWalker(r.ast,function(node,descend,path){
                if (node.type==='Literal')
                    path[0].replace(treeSurgeon.babelLiteralNode(node.value)) ;
                else if (node.type==='Property') {
                    // Class/ObjectProperty in babel6
                    if (path[0].parent.type==='ClassBody'){
                        // There's no easy mapping here as it appears to be borderline in the specification?
                        // It's definitely a kind of ClassProperty tho....
                        node.type = 'ClassProperty' ;
                    } else {
                        node.type = 'ObjectProperty' ;
                    }
                }
                descend() ;
            }) ;
        }
        return r ;
    } catch (ex) {
        if (ex instanceof SyntaxError) {
            var l = r.origCode.substr(ex.pos-ex.loc.column) ;
            l = l.split("\n")[0] ;
            ex.message += " "+origFilename+" (nodent)\n"+l+"\n"+l.replace(/[\S ]/g,"-").substring(0,ex.loc.column)+"^" ;
            ex.stack = "" ;
        }
        throw ex ;
    }
}

NodentCompiler.prototype.version =  require("./package.json").version ;
NodentCompiler.prototype.isThenable = function(x) { return x && x instanceof Object && typeof x.then==="function"} ;
NodentCompiler.prototype.compile =  compile ;
// Exported ; but not to be used lightly!
NodentCompiler.prototype.parse = parseCode ;
NodentCompiler.prototype.prettyPrint =  prettyPrint ;
NodentCompiler.prototype.getDefaultCompileOptions = undefined ;
NodentCompiler.prototype.transform = treeSurgeon.transform ;
// asynchronize and printNode were previuosly defined in arboriculture, but they are
// are now (>3.2.0) pulled up into compiler so arboriculture.transform can be called from other 
// hosts such as babel 7
NodentCompiler.prototype.asynchronize = function asynchronize(pr, __sourceMapping, opts, logger) {
    try {
        return treeSurgeon.transform(pr, opts, {
	    		parse: parse,						// Parse a JS fragment into an AST
	    		printNode: printNode,				// Print a node as JS source
	    		logger:logger						// Log a warning
        }) ;
    } catch (ex) {
        if (ex instanceof SyntaxError) {
            var l = pr.origCode.substr(ex.pos - ex.loc.column);
            l = l.split("\n")[0];
            ex.message += " (nodent)\n" + l + "\n" + l.replace(/[\S ]/g, "-").substring(0, ex.loc.column) + "^";
            ex.stack = "";
        }
        throw ex;
    }
} ;
NodentCompiler.prototype.printNode = printNode ;

Object.defineProperty(NodentCompiler.prototype,"Promise",{
    get:function (){
        console.warn("Warning: nodent.Promise is deprecated. Use nodent.Thenable instead");
        return Thenable;
    },
    enumerable:false,
    configurable:false
}) ;

NodentCompiler.initialCodeGenOpts = {
    noRuntime:false,
    lazyThenables:false,
    es6target:false,
    noUseDirective:false,
    wrapAwait:null,
    mapStartLine:0,
    sourcemap:true,
    engine:false,
    parser:{sourceType:'script'},
    generatedSymbolPrefix:"$",
    $return:"$return",
    $error:"$error",
    $arguments:"$args",
    $Promise:"Promise",
    $asyncspawn:"$asyncspawn",
    $asyncbind:"$asyncbind",
    $makeThenable:'$makeThenable'
};

module.exports = NodentCompiler ;