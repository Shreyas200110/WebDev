let fs = require("fs");
let path = require("path");

let input = process.argv.slice(2);
let optionArr = [];
let filesArr = [];

for(let i = 0; i < input.length; i++){
    if(input[i].charAt(0) == "-"){
        optionArr.push(input[i]);
    }
    else if(fs.existsSync(input[i]) == true){
        filesArr.push(input[i]);
    }
    else{
        console.log("Path not found : ", input[i]);
        return;
    }  
}

let content = "";
for(let i = 0; i < filesArr.length; i++){
    if(i == filesArr.length - 1){
        content += fs.readFileSync(filesArr[i]);
    }else{
        content += fs.readFileSync(filesArr[i]) + "\n";
    }
}

// If we need to only print the contents of multiple files
if(optionArr.length == 0){
    console.log(content);
    return;
}

let isbDone = false;
let isnDone = false;

// All the options will be explored
for(let option = 0; option < optionArr.length; option++){

    let contentArr = content.split("\n");

    // -s command which converts multiple line breaks into a single line break;
    if(optionArr[option] == "-s"){
    
        for(let i = 0; i < contentArr.length; i++){
            if(contentArr[i] == "" && contentArr[i - 1] == ""){
                contentArr[i] = null;
            }
            else if(contentArr[i] == "" && contentArr[i - 1] == null){
                contentArr[i] = null;
            }
        }
    
        let tempArr = [];
    
        for(let i = 0; i < contentArr.length; i++){
            if(contentArr[i] != null){
                tempArr.push(contentArr[i]);
            }
        }
    
        contentArr = tempArr;
        content = contentArr.join("\n");
    }
    
    // -n command which gives numbering to all the lines of the content
    else if(optionArr[option] == "-n"){
        if(isbDone == true){
            continue;
        }
        isnDone = true;

        let str = "";
        for(let i = 0; i < contentArr.length; i++){
            if(i == contentArr.length - 1){
                str += i + 1 + ". " + contentArr[i];
            }else{
                str += i + 1 + ". " + contentArr[i] + "\n";
            }
        }

        content = str;
    }
    
    // -b command which gives numbering to only non-empty lines 
    else if(optionArr[option] == "-b"){
        if(isnDone == true){
            continue;
        }
        isbDone = true;

        let str = "";
        let count = 1;
        for(let i = 0; i < contentArr.length; i++){
            if(contentArr[i] != ""){
                if(i == contentArr.length - 1){
                    str += count + ". " + contentArr[i];
                    count++;
                }else{
                    str += count + ". " + contentArr[i] + "\n";
                    count++;
                }
            }else{
                if(i == contentArr.length - 1){
                    str += contentArr[i];
                }
                else{
                    str += contentArr[i] + "\n";
                }
            }
        }
        content = str;
    }
}

// Finally the output will be printed
console.log(content);
