//make empty sudoku
var sudoku = [];
var userInput = [];

for (let i = 0; i < 9; i++) {
    sudoku.push([]);
    userInput.push([]);
    for (let j = 0; j < 9; j++) {
        userInput[i].push(0);
        sudoku[i].push(0);
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    var sudokuContainer = document.getElementById("sudoku-container");

    for (let i = 0; i < 9; i++) {
        let row = document.createElement("div");
        row.classList.add('row');
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement("input");
            cell.contentEditable = true;
            cell.classList.add("cell");
            cell.maxLength = 1;
            cell.dataset.x = i;
            cell.dataset.y = j;

            let userInputHandler = (e) => {
                let x = cell.dataset.x;
                let y = cell.dataset.y;
                
                if (cell.value === "") {
                    userInput[x][y] = 0;
                    cell.classList.remove("user-input");
                    return;
                }
                userInput[x][y] = parseInt(cell.value);
                cell.classList.add("user-input");
            };
            let keydownHandler = (e) =>{
                let keyCode = e.keyCode;
                let key = e.key;
                let x = parseInt(cell.dataset.x);
                let y = parseInt(cell.dataset.y);
                let upX = x - 1 < 0 ? 0 : x -1;
                let downX = x + 1 > 8 ? 8 : x + 1;
                let leftY = y - 1 < 0 ? 0 : y -1;
                let rightY = y + 1 > 8 ? 8: y + 1;
                let nextX = x, nextY = y;
                switch(keyCode){
                    //left
                    case 37 : {
                        nextY = leftY;
                        break;
                    }
                    //up
                    case 38 :{
                        nextX = upX;
                        break;
                    }
                    //right
                    case 39 : {
                        nextY = rightY;
                        break;
                    }
                    //down
                    case 40 : {
                        nextX = downX;
                        break;
                    }
                }
                let nextInput = document.getElementById(`${nextX}-${nextY}`);
                nextInput.focus();
            }

            cell.onchange = userInputHandler;
            cell.onkeydown = keydownHandler;

            cell.id = `${i}-${j}`;
            row.append(cell);

        }
        sudokuContainer.append(row);
    }
    var solveBtn = document.getElementById("solve-btn");
    solveBtn.addEventListener("click", function (e) {
        iterCount = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                sudoku[i][j] = userInput[i][j];
            }
        }
        isSolved = false;
        if(checkValidUserInput() == false){
            alert("해가 없습니다.!");
            return;
        }
        solve();
        console.log(`max iter ${iterCount}`);
        if(!isSolved){
            alert("해가 없습니다.");
            
        }
    });
    var clearBtn = document.getElementById("clear-btn");
    clearBtn.addEventListener("click", function (e) {
        let cellList = document.getElementsByClassName("cell");
        for (let i = 0; i < cellList.length; i++) {
            cellList[i].value = "";
            cellList[i].classList.remove("user-input");
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                sudoku[i][j] = 0;
                userInput[i][j] = 0;
            }
        }
    });
});
var iterCount = 0;
var isSolved = false;
var maxIter = 1000000;
function solve() {
    iterCount ++;
    
    if(iterCount > maxIter){
        
        return ;
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            //sudoku 에 채울 값
            if (sudoku[i][j] == 0) {
                let randomOrderArr = [];
                for(let v = 1; v <=9; v++){
                    randomOrderArr.push([Math.random(), v]);
                }
                randomOrderArr.sort();

                for (let k = 0; k < 9; k++) {
                    let v = randomOrderArr[k][1];
                    if (checkValid(i, j, v)) {
                        //console.log(`checkvalid ${i} ${j} ${v}`);
                        sudoku[i][j] = v;
                        solve();
                        if (isSolved) {
                            for (let x = 0; x < 9; x++) {
                                for (let y = 0; y < 9; y++) {
                                    let input = document.getElementById(`${x}-${y}`);
                                    input.value = sudoku[x][y];
                                }
                            }
                            return;
                        }
                        sudoku[i][j] = 0;
                    }
                }
                return;
            }

        }
    }
    isSolved = true;
    return;
}
//가능한 값인지 확인한다.
function checkValid(i, j, v) {
    for (let x = 0; x < 9; x++) {
        if(i  == x) continue;
        if (sudoku[x][j] == v) return false;
    }
    for (let y = 0; y < 9; y++) {
        if(j == y) continue;
        if (sudoku[i][y] == v) return false;
    }
    let xBegin = Math.floor(i / 3) * 3;
    let yBegin = Math.floor(j / 3) * 3;
    for (let x = xBegin; x < xBegin + 3; x++) {
        for (let y = yBegin; y < yBegin + 3; y++) {
            if(i == x && j == y) continue;
            if (sudoku[x][y] == v) return false;
        }
    }
    //console.log('true');
    return true;
}
//valid한 input인지 확인한다.
function checkValidUserInput(){
    for(let i = 0; i < 9; i ++){
        for (let j = 0; j < 9; j ++){
            if(parseInt(userInput[i][j]) != 0){
                console.log(`${i} ${j} ${userInput[i][j]}`);
                if(!checkValid(i,j,userInput[i][j])){
                    return false;
                }
            }
        }
    }
    return true;
}
