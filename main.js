// global variables
const len = 9;
const blen = 3; // 블록 길이 설정
const answer_area = document.querySelector('#answer-area');
const sudoku_rows = document.querySelector('.sudoku-rows');
const cellList = sudoku_rows.querySelectorAll('.cell');

// initialize arrays
let user_array = [];
let sudoku_array = [];
for(let i = 0; i < 9; i++){
    user_array.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    sudoku_array.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

// solve 버튼 눌렀을 때 스도쿠 풀리게 설정
document.querySelector('#solve').addEventListener('click', ()=>{
    // answer area 초기화
    answer_area.innerHTML = `<h1>Solving...</h1>`;
    
    // 입력된 값들 배열에 가져옴
    init_array();
    
    // 처음부터 불가능한 값이 입력되었는지 확인
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len; j++){
            // 불가능할 경우 -> 해를 구할 수 없습니다 출력
            if(sudoku_array[i][j] !== 0 && !checkValueAvailable(i, j, sudoku_array[i][j])){
                show_unsolvable();
                return;
            }
        }
    }
    
    // 입력된 스도쿠의 해를 구함
    let result = solve_sudoku(0, 0);
    if(!result){
        show_unsolvable();
        return;
    }
    
    // 구한 정답을 출력함
    show_solved();
});

// 구한 해를 출력하는 함수
function show_solved(){
    // console.log(sudoku_array);
    answer_area.innerHTML = `<h1>Answer Values</h1>`;
    makeSudokuTiles(answer_area);
    const answer_cellList = answer_area.querySelectorAll('.cell');
    answer_cellList.forEach((cell, index)=>{
        cell.value = sudoku_array[parseInt(index / 9)][index % 9];
    });
}

// 해를 구하지 못할 경우, 해당 안내문을 띄움.
function show_unsolvable(){
    answer_area.innerHTML = `<h1 class="unable">Unable to solve sudoku.</br>Please enter different Value.</h1>`
}

// 입력된 값들 배열에 가져옴
function init_array() {
    cellList.forEach((cell, index) => {
        let r = parseInt(index / 9);
        let c = index % 9;
        sudoku_array[r][c] = cell.value - '0';
        user_array[r][c] = cell.value - '0';
    });
}

// 백트래킹 알고리즘으로 스도쿠의 해를 구함
function solve_sudoku(r, c){
    // 끝이면 return
    if(r === 9){
        return true;
    }
    // 다음 줄으로 이동
    if(c === 9){
        return solve_sudoku(r + 1, 0);
    }

    if(sudoku_array[r][c]){
        // 값이 있으면 다음 칸으로 넘어감
        return solve_sudoku(r, c + 1);
    }else{
        // 기존에 값이 없으면 해를 구함
        for(let val = 1; val <= 9; val++){
            // 가능한 값이 있다면 해당 값을 입력하고 다음 칸으로 이동함.
            if(checkValueAvailable(r, c, val)){
                sudoku_array[r][c] = val;
                if(solve_sudoku(r, c + 1)){
                    return true;
                }
            }
        }
        // 가능한 값이 없는 경우
        sudoku_array[r][c] = 0; // 바꾼 값은 원래대로 돌려놓음
        return false;
    }
}

// 해당 칸에 value가 들어갈 수 있는지 확인해주는 함수
// 0 <= r, c <= 8
// O(1) ~= O(27)
function checkValueAvailable(r, c, value){
    // 가로세로 확인
    for(let i = 0; i < len; i++){
        if(c !== i && sudoku_array[r][i] === value) return false;
        if(r !== i && sudoku_array[i][c] === value) return false;
    }
    // 3*3 블록 내 확인
    const ir = parseInt(r / 3) * 3; // 기준이 되는 r, c 값
    const ic = parseInt(c / 3) * 3;
    for(let i = 0; i < blen; i++){
        for(let j = 0; j < blen; j++){
            let y = ir + i;
            let x = ic + j;
            if(y !== r && x !== c && sudoku_array[y][x] === value) return false;
        }   
    }
    return true;
}

// clear 버튼 눌렀을 때 sudoku 내 모든 숫자를 지워주는 프로그램
document.querySelector('#clear').addEventListener('click', ()=>{
    cellList.forEach((cell)=>{
        cell.value = ``;
    });
});