let path = require("path");
let fs = require("fs");

function fn(input, space){
    let check = fs.lstatSync(input).isFile();
    
    if(check == true){
        console.log(space + "|--" + path.basename(input));
    }
    else{
        console.log(space + "|___" + path.basename(input));
        let content = fs.readdirSync(input);
        
        for(let i = 0; i < content.length; i++){
            fn(path.join(input, content[i]), space + "\t");
        }
    }
}


module.exports = {
    fxn : fn
}