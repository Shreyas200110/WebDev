let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetCont = document.querySelector(".sheets-cont");

addSheetBtn.addEventListener("click", (e) => {
    let allSheets = document.querySelectorAll(".single-sheet");

    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "single-sheet");
    newSheet.setAttribute("id", allSheets.length);
    newSheet.innerHTML = `
        <div class="sheet-content">Sheet ${allSheets.length + 1}</div>
    `;

    sheetCont.appendChild(newSheet);
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(newSheet);
    newSheet.click();
    handleSheetRemoval(newSheet);
    newSheet.scrollIntoView();
})

function createSheetDB(){
    let sheetDB = [];

    for(let i = 0; i < rows; i++){
        let sheetRow = [];
        for(let j = 0; j < cols; j++){
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontColor: "#000000",
                BGColor: "#ecf0f1",
                fontFamily: "monospace",
                fontSize: "14",
                value: "",
                formula: "",
                children: [],
            }
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }  
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix = [];

    for(let i = 0; i < rows; i++){
        let row = [];
        for(let j =0; j < cols; j++){
            row.push([]); // Pushing columns i.e cells in a row array
        }
        graphComponentMatrix.push(row); // Pushing row in a graphComponent Database array
    }   
    collectedGraphComponent.push(graphComponentMatrix);
}

function handleSheetActiveness(sheet){
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
    })
}

function handleSheetDB(sheetIdx){
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProperties(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            let cellPropObj = sheetDB[i][j];
            let cell = document.querySelector(`.single-cell[rid="${i}"][cid="${j}"]`);
            cell.click();
            cell.innerText = cellPropObj.value;
        }
    }
    // By defalut click on first cell
    let firstCell = document.querySelector(".single-cell");
    firstCell.click();
}

function handleSheetUI(sheet){
    let allSheets = document.querySelectorAll(".single-sheet");
    for(let i = 0; i < allSheets.length; i++){
        allSheets[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e) => {
        if(e.button != 2) return;
        let allSheets = document.querySelectorAll(".single-sheet");
        if(allSheets.length == 1){
            alert("You need to have atleast one sheet!!");
            return;
        }
        let response = confirm("Your sheet will be deleted permanantly. Are You Sure ?");
        if(response == false) return;
        let sheetIdx = Number(sheet.getAttribute("id"));
        collectedSheetDB.splice(sheetIdx, 1);
        collectedGraphComponent.splice(sheetIdx, 1);

        // UI
        handleSheetUIRemoval(sheet);

        // By default DB to sheet 1 (active)
        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProperties();
    })
}

function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheets = document.querySelectorAll(".single-sheet");
    for(let i = 0; i < allSheets.length; i++){
        allSheets[i].setAttribute("id", i);
        let sheetName = allSheets[i].querySelector(".sheet-content");
        sheetName.innerText = `Sheet ${i + 1}`;
        allSheets[i].style.backgroundColor = "transparent";
    }
    allSheets[0].style.backgroundColor = "#ced6e0";
}