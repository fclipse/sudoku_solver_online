// 전역 요소 설정
const sudoku_rows = document.querySelector('.sudoku-rows');

// 스도쿠 입력칸 생성
makeSudokuTiles(sudoku_rows);

// 입력칸 생성 후 cell 정의 
const cellList = sudoku_rows.querySelectorAll('.cell');

// parentDiv에 9*9 sudoku input을 만들어 넣어 주는 함수
function makeSudokuTiles(parentDiv){
    for(let i = 0; i < 9; i++){
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.id = `row-${i+1}`;
        
        for(let j = 0; j < 9; j++){
            rowDiv.innerHTML += `<input id="col-${j + 1}" class="cell" type="tel" pattern="\d*" maxlength=1 oninput="maxLengthCheck(this)">`;
        }
        parentDiv.appendChild(rowDiv);
    }
}

// 입력 maxLength check하는 함수
function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}

// 입력칸엔 1~9 사이의 입력만 들어오도록 설정
cellList.forEach((cell, index)=>{
    // 값 입력시 1~9 사이 정수만 입력받음 / 다음 cell로 자동으로 이동하는 기능 추가
    cell.addEventListener('input', (event)=>{
        // 입력된 값 얻기
        let inputValue = event.target.value;

        // 정규 표현식을 사용하여 1에서 9 사이의 숫자인지 확인
        let validInput = /^[1-9]$/.test(inputValue);

        // 1에서 9 사이의 숫자가 아닌 경우 입력 방지
        if (!validInput) {
            // 입력을 막음
            event.preventDefault();

            // 기존 입력 값에서 1에서 9 사이의 숫자만 추출
            let sanitizedValue = inputValue.replace(/[^1-9]/g, '');
            
            // 추출한 값으로 input 요소의 값을 업데이트
            event.target.value = sanitizedValue;

            // cell.value = event.target.value;
        }

        // 입력시 다음 cell로 focus
        if(inputValue.length === cell.maxLength && typeof cellList[index + 1] !== 'undefined'){
            cellList[index + 1].focus();
        }
    });

    // 화살표 키로 상하좌우로 이동할 수 있도록 설정
    cell.addEventListener('keydown', (event)=>{
        // console.log(event);

        if(event.key === 'ArrowUp'){
            event.preventDefault(); // 기본 동작 막기
            if(index >= 9){
                cellList[index - 9].focus();
            }
        }else if(event.key === 'ArrowDown'){
            event.preventDefault(); // 기본 동작 막기
            if(index <= 71){
                cellList[index + 9].focus();
            }
        }else if(event.key === 'ArrowLeft' && index % 9 > 0){
            cellList[index - 1].focus();
        }else if(event.key === 'ArrowRight' && index % 9 < 8){
            cellList[index + 1].focus();
        }else if(event.key === 'Backspace' && index > 0){
            // 지우기 누르면 현재 칸 지워지고 이전 칸으로 커서 이동
            event.preventDefault();
            cellList[index].value = ``;
            cellList[index - 1].focus();
        }
    });
});