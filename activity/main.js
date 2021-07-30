let input = process.argv.slice(2);
let helpObj = require("./command/help");
let organiseObj = require("./command/organize");
let treeObj = require("./command/tree");
let copyObj = require("./command/copy");
let cutObj = require("./command/cut");

if(input[0] == "help"){
    helpObj.fxn();
}

if(input[0] == "organize"){
    organiseObj.fxn(input[1]);
}

if(input[0] == "tree"){
    treeObj.fxn(input[1], "");
}

if(input[0] == "copy"){
    copyObj.fxn(input[1], input[2]);
}

if(input[0] == "cut"){
    cutObj.fxn(input[1], input[2]);
}