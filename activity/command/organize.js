let path = require("path");
let fs = require("fs");

let types = {
    media: ["mp4", "mkv", "jpg", "jpeg", "png"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function fn(input){
    let rPath = input;
    let content = fs.readdirSync(rPath);
    let organizedFolderPath = path.join(rPath, "Organized_Folder");
    fs.mkdirSync(organizedFolderPath);
    let mediaPath = path.join(organizedFolderPath, "Media");
    fs.mkdirSync(mediaPath);
    let archivesPath = path.join(organizedFolderPath, "Archives");
    fs.mkdirSync(archivesPath);
    let documentsPath = path.join(organizedFolderPath, "Documents");
    fs.mkdirSync(documentsPath);
    let appPath = path.join(organizedFolderPath, "Apps");
    fs.mkdirSync(appPath);
    let othersPath = path.join(organizedFolderPath, "Others");
    fs.mkdirSync(othersPath);
    

    for(let i = 0; i < content.length; i++){
        let file = content[i];
        let filePath = path.join(rPath, content[i]);
        let fileExt = path.extname(filePath);
        
        let srcPath = filePath;
        let dstPath;
        let found = false;

        for(let key in types){
            for(let j = 0; j < types[key].length; j++){
                let str = "." + types[key][j];

                if(str == fileExt){
                    
                    if(key == "media"){
                        dstPath = path.join(mediaPath,file);
                        console.log("file " + file + " : " + path.basename(rPath) + " -> Media");
                    }else if(key == "archives"){
                        dstPath = path.join(archivesPath,file);
                        console.log("file " + file + " : " + path.basename(rPath) + " -> Archives");
                    }else if(key == "documents"){
                        dstPath = path.join(documentsPath,file);
                        console.log("file " + file + " : " + path.basename(rPath) + " -> Documents");
                    }else if(key == "app"){
                        dstPath = path.join(appPath,file);
                        console.log("file " + file + " : " + path.basename(rPath) + " -> Apps");
                    }

                    fs.copyFileSync(srcPath, dstPath);
                    found = true;
                    break;
                
                }
            }
            if(found == true){
                break;
            }
        }

        if(found == false){
            dstPath = path.join(othersPath,file);
            fs.copyFileSync(srcPath, dstPath);
            console.log("file " + file + " : " + path.basename(rPath) + " -> Others");
        }
    }
}

module.exports = {
    fxn : fn
}