for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
        let cell = document.querySelector(`.single-cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) =>{
            let address = addressBar.value;
            let [rowIdx, colIdx] = getRowAndColIdxUsingAddress(address);
            let cellPropObj = sheetDB[rowIdx][colIdx];

            if(cellPropObj.value == cell.innerText){
                return;
            }
            else{
                // If data is modified by  hardCoding(Directly changing the cell value then now its formula will be blank. Also now it is no more dependent on its parent, So we need to remove this cell from its parent children list. Also we need to update the value of the childrens that were dependent on this modified cell)
                cellPropObj.value = cell.innerText;
                removeChildFromParent(cellPropObj.formula);
                cellPropObj.formula = "";
                updateChildrenCells(address);
            }
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) =>{
    let inputformula = formulaBar.value;
    if(e.key === "Enter" && inputformula){
        let address = addressBar.value;
        let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
        let oldFormula = cellPropObj.formula;
        if(inputformula != oldFormula){
            removeChildFromParent(oldFormula);
        }

        addChildToGraphComponent(inputformula, address);
        // Check formula is cyclic or not then only evaluate the value of that formula
        let cycleResponse = isGraphCyclic(graphComponentMatrix);
        if(cycleResponse){
            // Now we need to remove the parent child relation that we added to the graphComponentMatrix. But the graph is cyclic, so now we will remove that relation again and return
            // alert("Your Formula is Cyclic. Change the Formula....");
    
            let response = confirm("Your Formula is Cyclic. Do You want to trace your cycle ?");

            while(response === true){
                await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
                response = confirm("Your Formula is Cyclic. Do You want to trace your cycle ?");
            }
            removeChildFromGraphComponent(inputformula, address);
            return;
        }

        //If not cyclic then now we can evaluate the value
        let evaluatedValue = evaluateFormula(inputformula);
        addChildToParent(inputformula);
        setUIForFormulaBar(inputformula, evaluatedValue, address);

        updateChildrenCells(address);
    }
})

function updateChildrenCells(parentAddress){
    let [parentCell, parentCellPropObj] = getCellAndCellPropUsingAddress(parentAddress);
    let childrens = parentCellPropObj.children;
    
    for(let i = 0; i < childrens.length; i++){
        let childAddress = childrens[i];
        let [childCell, childCellPropObj] = getCellAndCellPropUsingAddress(childAddress);
        let updatedValue = evaluateFormula(childCellPropObj.formula);
        setUIForFormulaBar(childCellPropObj.formula, updatedValue, childAddress);
        updateChildrenCells(childAddress);
    }
}

function evaluateFormula(formula){
    let formulaArr = formula.split(" ");
    for(let i = 0; i < formulaArr.length; i++){
        let asciiValue = formulaArr[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell, cellPropObj] = getCellAndCellPropUsingAddress(formulaArr[i]);
            formulaArr[i] = cellPropObj.value;
        }
    }
    formula = formulaArr.join(" ");
    return eval(formula);
}

function setUIForFormulaBar(formula, evaluatedValue, address){
    let [cell, cellPropObj] = getCellAndCellPropUsingAddress(address);
    cell.innerText = evaluatedValue;
    cellPropObj.value = evaluatedValue;
    cellPropObj.formula = formula;
}

function addChildToParent(formula){
    let child = addressBar.value; // Because this is the cell for which the formula is being evaluated and hence this is the active cell.. So this is the child and if we find any parent in its formula then we can add this cell to parent's children arr
    let formulaArr = formula.split(" ");
    for(let i = 0; i < formulaArr.length; i++){
        let asciiValue = formulaArr[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentcell, parentcellPropObj] = getCellAndCellPropUsingAddress(formulaArr[i]);
            parentcellPropObj.children.push(child);
        }
    }
}

function removeChildFromParent(formula){
    let child = addressBar.value; // Because this is the cell for which the formula is being evaluated and hence this is the active cell.. So this is the child and if we find any parent in its formula then we can add this cell to parent's children arr
    let formulaArr = formula.split(" ");
    for(let i = 0; i < formulaArr.length; i++){
        let asciiValue = formulaArr[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentcell, parentcellPropObj] = getCellAndCellPropUsingAddress(formulaArr[i]);

            let idx = parentcellPropObj.children.indexOf(child);
            parentcellPropObj.children.splice(idx, 1);
        }
    }
}

function addChildToGraphComponent(formula, childAddress){
    let [crid, ccid] = getRowAndColIdxUsingAddress(childAddress);
    let formulaArr = formula.split(" ");
    for(let i = 0; i < formulaArr.length; i++){
        let asciiValue = formulaArr[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid, pcid] = getRowAndColIdxUsingAddress(formulaArr[i]);
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

function removeChildFromGraphComponent(formula, childAddress){
    let [crid, ccid] = getRowAndColIdxUsingAddress(childAddress);
    let formulaArr = formula.split(" ");

    for(let i = 0; i < formulaArr.length; i++){
        let asciiValue = formulaArr[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid, pcid] = getRowAndColIdxUsingAddress(formulaArr[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}