let rows = 100;
let cols = 26;
let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

for(let i = 0; i < rows; i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);
}

for(let i = 0; i < cols; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}

for(let i = 0; i < rows; i++){
    let cellsRowCont = document.createElement("div");
    cellsRowCont.setAttribute("class", "cells-row-cont");
    for(let j = 0; j < cols; j++){
        let singleCell = document.createElement("div");
        singleCell.setAttribute("class", "single-cell");
        singleCell.setAttribute("contenteditable", "true");
        singleCell.setAttribute("spellcheck", false);
        singleCell.setAttribute("rid", i);
        singleCell.setAttribute("cid", j);
        cellsRowCont.appendChild(singleCell);
        addressBarDisplay(singleCell, i, j);
    }
    cellsCont.appendChild(cellsRowCont);
}

function addressBarDisplay(cell, i, j){
    cell.addEventListener("click", (e) => {
        let address = String.fromCharCode(65 + j) + (i + 1);
        addressBar.value = address;
    })
}