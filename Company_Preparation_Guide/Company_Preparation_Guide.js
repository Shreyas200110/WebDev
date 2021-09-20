const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")(); // Module for taking input from user
const path = require("path"); // Module for working with paths
const PDFDocument = require("pdfkit"); // Module for working with pdf files
const fs = require("fs"); // Module for working with files and folders 

// This is the main Scrapper function 
(async function Scrapper(){
    try{
        let browser = await puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args : ["--start-fullscreen"],
        });

        let pagesArr = await browser.pages();
        let page = pagesArr[0];
        await page.goto("https://practice.geeksforgeeks.org/explore/");

        await page.click(".cc-compliance");
        await page.click(".clearFilters");
        await page.click("#moreCompanies");    

        let inputObj = takeInputFromUser();

        let finalPageLink = makeUrl(inputObj);
        await page.goto(finalPageLink);

        await autoScroll(page);

        let questionNamesArr = await page.$$(`span[style="display:block;font-size: 20px !important"]`);
        let linksArr = await page.$$(`a[style="position: absolute;top: 0;left: 0;height: 100%;width: 100%;z-index:1;pointer:cursor;"]`);
        
        for(let i = 0; i < questionNamesArr.length; i++){
            let question = await page.evaluate(getContentInTextForm, questionNamesArr[i]);
            let link = await page.evaluate(getContentLink, linksArr[i]);
    
            questionNamesArr[i] = question.trim();
            linksArr[i] = link.trim();
        }

        writePDFDocument(inputObj, questionNamesArr, linksArr);
    }
    catch(err){
        console.log(err);
    }
})();

// For getting content in text form with the help of selector
function getContentInTextForm(element) {
    return element.textContent;
}

// To get the link prensent in anchor tag
function getContentLink(element) {
    return element.getAttribute("href");
}


// This function has been used to scroll the page
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 300);
        });
    });
}

// This function takes input from user with the help of "prompt-sync" Module 
function takeInputFromUser(){
    let companyYesOrNo = prompt("Do You want to select any Specific comapany (Yes / No) ? ");
    let companyName = "";
    if(companyYesOrNo == "Yes"){
        companyName = prompt("Okay...Enter company Name - ")
    }
    else{
        companyName = null;
    }

    let difficultyYesOrNo = prompt("Do you want the questions of any specific difficulty level (Yes / No) ? ");
    let difficulty = "";

    if(difficultyYesOrNo == "Yes"){
        difficulty = prompt("Okay...Enter difficulty level - ");
    }
    else{
        difficulty = null;
    }

    let topicYesOrNo = prompt("Do you want the questions of any specific Topic (Yes / No) ? ");
    let topic = "";

    if(topicYesOrNo == "Yes"){
        topic = prompt("Okay...Enter the topic - ");
    }
    else{
        topic = null;
    }

    let obj = {
        companyName : companyName,
        difficulty : difficulty,
        topic : topic,
    }

    return obj;
}

// Converts the input given by user into the final URL that we need to land upon
function makeUrl(inputObj){
    companyName = inputObj.companyName;
    topicTag = inputObj.topic;
    difficulty = inputObj.difficulty;

    let url = "https://practice.geeksforgeeks.org/explore/?"
    if(topicTag != null){
        url += "category%5B%5D=" + topicTag + "&";
    }


    if(companyName != null){
        url += "company%5B%5D=" + companyName + "&";
    }


    if(difficulty != null){
        if(difficulty == "School"){
            difficulty = -2;
        }else if(difficulty == "Basic"){
            difficulty = -1;
        }else if(difficulty == "Easy"){
            difficulty = 0;
        }else if(difficulty == "Medium"){
            difficulty = 1;
        }else if(difficulty == "Hard"){
            difficulty = 2;
        }

        url = url + "difficulty%5B%5D=" + difficulty;
    }

    return url;
}

// This function is used to write the scrapped data into a ".pdf" file
function writePDFDocument(inputObj, questionNamesArr, linksArr) {

    let pdfDoc = new PDFDocument;
    let locationPath = "";

    if(inputObj.companyName == null){
        let name = "Preparation_Guide";
        locationPath = path.join(process.cwd(), name);
    }
    else{
        companyNameExt = 'Preparation_Guide_' + inputObj.companyName + '.pdf';
        locationPath = path.join(process.cwd(), companyNameExt);
    }

    pdfDoc.pipe(fs.createWriteStream(locationPath));

    if(inputObj.companyName == null){
        pdfDoc.text('Important Questions', { align: 'center'});
        
    }
    else{
        pdfDoc.text('Important Questions to prepare for ' + inputObj.companyName, { align: 'center'});
    }
    pdfDoc.moveDown(1);

    if(inputObj.topic != null){
        pdfDoc.text("Topic : " + inputObj.topic, { align: 'center'});
        pdfDoc.moveDown(1);
    }

    if(inputObj.difficulty != null){
        pdfDoc.text("Difficulty : " + inputObj.difficulty, { align: 'center'});
        pdfDoc.moveDown(1);
    }   
    
    pdfDoc.fillColor('#399191');
    for(let i = 0; i < questionNamesArr.length; i++){
        pdfDoc.text(i + 1 + ".  " + questionNamesArr[i], {
            width: 500,
            link: linksArr[i]
        });
    }
    pdfDoc.end();
}  