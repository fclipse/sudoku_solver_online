// global variables
const len = 9;
const blen = 3; // 블록 길이 설정
const answer_area = document.querySelector('#answer-area');


// initialize arrays
let sudoku_array = [];
for(let i = 0; i < 9; i++){
    sudoku_array.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

// solve 버튼 눌렀을 때 스도쿠 풀리게 설정
document.querySelector('#solve').addEventListener('click', ()=>{
    // answer area 초기화
    answer_area.innerHTML = ``;

    // 입력된 값들 배열에 가져옴
    init_array();

    // 처음부터 불가능한 값이 입력되었는지 확인
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len; j++){
            // 불가능할 경우 -> 해를 구할 수 없습니다 출력
            if(sudoku_array[i][j] !== 0 && !check_cell(i, j, sudoku_array[i][j])){
                show_unsolvable();
            }
        }
    }
});

// 해를 구하지 못할 경우, 해당 안내문을 띄움.
function show_unsolvable(){
    answer_area.innerHTML = `<h1 class="unable">Unable to solve sudoku.</br>Please enter different Value.</h1>`
}

// 입력된 값들 배열에 가져옴
function init_array() {
    const cellList = document.querySelectorAll('.cell');
    cellList.forEach((cell, index) => {
        let r = parseInt(index / 9);
        let c = index % 9;
        sudoku_array[r][c] = cell.value - '0';
    });
}

// 백트래킹 알고리즘으로 스도쿠의 해를 구함
function solve_sudoku(r, c){
    

    return;
}

// 해당 칸에 value가 들어갈 수 있는지 확인해주는 함수
// O(1)
function check_cell(r, c, value){
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