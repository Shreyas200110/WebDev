let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");

let url = "https://github.com/topics";

request(url, cb);    // Made the request to the main page given to us.

function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else if(response.statusCode == 404){
        console.log("Page Not Found");
    }
    else{

        topicsPage(html);
    }
}

// Extracted the 3 technologies that are present on the main page given to us.
function topicsPage(html){
    let $ = cheerio.load(html);
    let topicsArr = $(".topic-box a");

    for(let i = 0; i < topicsArr.length; i++){
        let link = $(topicsArr[i]).attr("href");
        let fullLink = `https://github.com${link}`;
        
        // Made the request to the individual technology Page
        request(fullLink, cb1);
    }
}

function cb1(err, response, html){
    if(err){
        console.log(err);
    }
    else if(response.statusCode == 404){
        console.log("Page Not Found");
    }
    else{
        singleTopicPage(html);
    }
}


function singleTopicPage(html){
    let $ = cheerio.load(html);
    let name = $(".h1").text().trim();
    console.log(name);
    let folderPath = path.join(process.cwd(), name);

    //Made the folder with the name of that technology
    fs.mkdirSync(folderPath);
    
    // Extracted all the repositories from that technology page
    let allRepos = $("article .px-3 h3 a.text-bold");
    
    for(let i = 0; i < 8; i++){

        // Extracted the link for an individual repository
        let link = $(allRepos[i]).attr("href");

        // Extracted the name for that repository
        let repoName = $(allRepos[i]).text().trim();

        // Made the .json file with repository name
        let repoFilePath = path.join(folderPath, repoName + ".json");
        let input = [];
        input = JSON.stringify(input);
        fs.writeFileSync(repoFilePath, input);

        // Made the link for the issues page of that repository
        let fullLinkOfIssuesPage = `https://github.com${link}/issues`;

        // Made a request to the issues page of that repository
        request(fullLinkOfIssuesPage, cb2);


        // ************************************************************************
        // Had to write this callback function within this function as we need the repoFilePath variable
        // for the landing page function so that we can append the issues in the repoFilePath
        function cb2(err, response, html){
            if(err){
                console.log(err);
            }
            else if(response.statusCode == 404){
                console.log("Page Not Found");
            }
            else{
                landingPage(html);
            }
        }

        // This is the final issues page that we need to work upon
        function landingPage(html){
            let $ = cheerio.load(html);
            
            //Extracted the issues and appended in th .json file named repoFilePath 
            let issuesArr = $(".h4");
        
            for(let i = 0; i < issuesArr.length; i++){
                let issueLink = $(issuesArr[i]).attr("href");
        
                let content = fs.readFileSync(repoFilePath);
                let jsonData = JSON.parse(content);
                jsonData.push(issueLink);
                let jsonWritableData = JSON.stringify(jsonData);
                fs.writeFileSync(repoFilePath, jsonWritableData);
            }
        }
    }
}