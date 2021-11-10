let graphComponentMatrix = [];
let collectedGraphComponent = [];

// for(let i = 0; i < rows; i++){
//     let row = [];
//     for(let j =0; j < cols; j++){
//         row.push([]); // Pushing columns i.e cells in a row array
//     }
//     graphComponentMatrix.push(row); // Pushing row in a graphComponent Database array
// }

function isGraphCyclic(graphComponentMatrix){
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

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(visited[i][j] == false){
                let response = isComponentCyclic(graphComponentMatrix, i, j, visited, dfsVisited);
                if(response == true) return [i, j];
            }
        }
    }
    return null;
}

function isComponentCyclic(graphComponentMatrix, si, sj, visited, dfsVisited){
    visited[si][sj] = true;
    dfsVisited[si][sj] = true;

    for(let i = 0; i < graphComponentMatrix[si][sj].length; i++){
        let [cRow, cCol] = graphComponentMatrix[si][sj][i];
        
        if(visited[cRow][cCol] == false){
            let response = isComponentCyclic(graphComponentMatrix, cRow, cCol, visited, dfsVisited);
            if(response == true) return true;
        }
        else if(visited[cRow][cCol] == true && dfsVisited[cRow][cCol] == true){
            return true;
        }
    }
    dfsVisited[si][sj] = false;
    return false;
}