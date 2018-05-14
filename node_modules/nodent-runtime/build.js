var runtime = require('./runtime') ;

var fs = require('fs') ;
var destFile = __dirname+'/dist/index.js' ;
fs.writeFileSync(destFile,
    runtime.$asyncbind.toString()+"\n"+
    runtime.$asyncspawn.toString()+"\n"+
    "$asyncbind();$asyncspawn();\n"+
    "module.exports = { $asyncbind: $asyncbind, $asyncspawn:$asyncspawn };\n");

console.log("## Built "+destFile) ;