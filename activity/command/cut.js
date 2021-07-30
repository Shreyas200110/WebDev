let fs = require("fs");
let path = require("path");

function fn(srcPath, dstPath){
    let fileBaseName = path.basename(srcPath);
    let completeDstPath = path.join(dstPath, fileBaseName);
    fs.copyFileSync(srcPath, completeDstPath);
    fs.unlinkSync(srcPath);
}

module.exports = {
    fxn : fn
}