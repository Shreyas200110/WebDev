function colorPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse){
    let [srcr, srcc] = cycleResponse;
    let visited = [];
    let dfsVisited = [];
    for(let i = 0; i < rows; i++){
        let row = [];
        for(let j =0; j < cols; j++){
            row.push(false);
        }
        visited.push(row);
        dfsVisited.push(row);
    }

    let response = await isComponentCyclicTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
    if(response == true) return Promise.resolve(true);

    return Promise.resolve(false);
}

async function isComponentCyclicTracePath(graphComponentMatrix, si, sj, visited, dfsVisited){
    visited[si][sj] = true;
    dfsVisited[si][sj] = true;

    let cell = document.querySelector(`.single-cell[rid="${si}"][cid="${sj}"]`);
    cell.style.backgroundColor = "lightblue";
    await colorPromise();

    for(let i = 0; i < graphComponentMatrix[si][sj].length; i++){
        let [cRow, cCol] = graphComponentMatrix[si][sj][i];
        
        if(visited[cRow][cCol] == false){
            let response = await isComponentCyclicTracePath(graphComponentMatrix, cRow, cCol, visited, dfsVisited);
            if(response == true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        }
        else if(visited[cRow][cCol] == true && dfsVisited[cRow][cCol] == true){
            let cyclicCell = document.querySelector(`.single-cell[rid="${cRow}"][cid="${cCol}"]`);
    
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();

            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();

            cell.style.backgroundColor = "transparent";
            await colorPromise();

            return Promise.resolve(true);
        }
    }
    
    cell.style.backgroundColor = "transparent"; // If the cell does not have any child then it will not go in loop. so it will remain of blue color. So we need to make it transparent outside the loop
    await colorPromise();
    dfsVisited[si][sj] = false;
    return Promise.resolve(false);;
}