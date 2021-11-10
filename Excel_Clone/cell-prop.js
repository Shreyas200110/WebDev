let collectedSheetDB = [];
let sheetDB = [];

addSheetBtn.click();

// for(let i = 0; i < rows; i++){
//     let gridRow = [];
//     for(let j = 0; j < cols; j++){
//         let cellProp = {
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontColor: "#000000",
//             BGColor: "#000000",
//             fontFamily: "monospace",
//             fontSize: "14",
//             value: "",
//             formula: "",
//             children: [],
//         }
//         gridRow.push(cellProp);
//     }
//     sheetDB.push(gridRow);
// }

// selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BG-color-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let alignment = document.querySelectorAll(".alignment");
let leftalign = alignment[0];
let centeralign = alignment[1];
let rightalign = alignment[2];

//EventListeners on cell Properties
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    if(cellPropObj.bold == false){
        cellPropObj.bold = true; // Data change
        cell.style.fontWeight = "bold";  // UI change(1) --> actually changing the font weight
        bold.style.backgroundColor = "#d1d8e0";  // UI change(2)
    }
    else{
        cellPropObj.bold = false;
        cell.style.fontWeight = "normal";
        bold.style.backgroundColor = "#ecf0f1";
    }
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    if(cellPropObj.italic == false){
        cellPropObj.italic = true;
        cell.style.fontStyle = "italic";
        italic.style.backgroundColor = "#d1d8e0";
    }
    else{
        cellPropObj.italic = false;
        cell.style.fontStyle = "normal";
        italic.style.backgroundColor = "#ecf0f1";
    }
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    if(cellPropObj.underline == false){
        cellPropObj.underline = true;
        cell.style.textDecoration = "underline";
        underline.style.backgroundColor = "#d1d8e0";
    }
    else{
        cellPropObj.underline = false;
        cell.style.textDecoration = "none";
        underline.style.backgroundColor = "#ecf0f1";
    }
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    cellPropObj.fontSize = fontSize.value;
    cell.style.fontSize = fontSize.value + "px";
    fontSize.value = cellPropObj.fontSize;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    cellPropObj.fontFamily = fontFamily.value;
    cell.style.fontFamily = fontFamily.value
    fontFamily.value = cellPropObj.fontFamily;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    console.log(fontColor.value);
    cellPropObj.fontColor = fontColor.value;
    cell.style.color = fontColor.value;
    fontColor.value = cellPropObj.fontColor;
})

BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    cellPropObj.BGColor = BGcolor.value;
    cell.style.backgroundColor = BGcolor.value;
    BGcolor.value = cellPropObj.BGColor;
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
        
        let alignValue = e.target.classList[0];
        cellPropObj.alignment = alignValue
        cell.style.textAlign = alignValue;

        switch(alignValue) {
            case  "left" :
                leftalign.style.backgroundColor = "#d1d8e0";
                centeralign.style.backgroundColor = "#ecf0f1";
                rightalign.style.backgroundColor = "#ecf0f1";
                break;
            case "center" :
                leftalign.style.backgroundColor = "#ecf0f1";
                centeralign.style.backgroundColor = "#d1d8e0";
                rightalign.style.backgroundColor = "#ecf0f1";
                break;
            case "right" :
                leftalign.style.backgroundColor = "#ecf0f1";
                centeralign.style.backgroundColor = "#ecf0f1";
                rightalign.style.backgroundColor = "#d1d8e0";
                break;
        }
    })
})

let allCells = document.querySelectorAll(".single-cell");
for(let i = 0; i < allCells.length; i++){
    setUIProperties(allCells[i]);
}


// Function To set the UI properties for each cell
function setUIProperties(cell){
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rowIdx, colIdx] = getRowAndColIdxUsingAddress(address);
        let cellPropObj = sheetDB[rowIdx][colIdx];
    
        // Apply cell Properties
        cell.style.fontWeight = cellPropObj.bold ? "bold" : "normal";
        cell.style.fontStyle = cellPropObj.italic ? "italic" : "normal";
        cell.style.textDecoration = cellPropObj.underline ? "underline" : "none";
        cell.style.fontSize = cellPropObj.fontSize + "px";
        cell.style.fontFamily = cellPropObj.fontFamily;
        cell.style.color = cellPropObj.fontColor;    
        cell.style.backgroundColor = cellPropObj.BGColor;
        cell.style.textAlign = cellPropObj.alignment;

        // Apply properties UI Props container
        bold.style.backgroundColor = cellPropObj.bold ? "#d1d8e0" : "#ecf0f1";
        italic.style.backgroundColor = cellPropObj.italic ? "#d1d8e0" : "#ecf0f1";
        underline.style.backgroundColor = cellPropObj.underline ? "#d1d8e0" : "#ecf0f1";
        
        alignValue = cellPropObj.alignment;
        switch(alignValue) {
            case  "left" :
                leftalign.style.backgroundColor = "#d1d8e0";
                centeralign.style.backgroundColor = "#ecf0f1";
                rightalign.style.backgroundColor = "#ecf0f1";
                break;
            case "center" :
                leftalign.style.backgroundColor = "#ecf0f1";
                centeralign.style.backgroundColor = "#d1d8e0";
                rightalign.style.backgroundColor = "#ecf0f1";
                break;
            case "right" :
                leftalign.style.backgroundColor = "#ecf0f1";
                centeralign.style.backgroundColor = "#ecf0f1";
                rightalign.style.backgroundColor = "#d1d8e0";
                break;
        }

        cell.style.fontFamily = cellPropObj.fontFamily;
        fontFamily.value = cellPropObj.fontFamily;
        fontSize.value = cellPropObj.fontSize;
        formulaBar.value = cellPropObj.formula;
        // cell.innerText = cellPropObj.value;
    })
}

function getCellAndCellPropUsingAddress(address){
    let [rowIdx, colIdx] = getRowAndColIdxUsingAddress(address);
     let cell = document.querySelector(`.single-cell[rid="${rowIdx}"][cid="${colIdx}"]`);
     let cellPropObj = sheetDB[rowIdx][colIdx];

     return [cell, cellPropObj];
}

function getRowAndColIdxUsingAddress(address){
    let rowIdx = (Number) (address.slice(1) - 1);
    let colIdx = (Number)(address.slice(0, 1).charCodeAt(0) - 65);

    return [rowIdx, colIdx];
}
