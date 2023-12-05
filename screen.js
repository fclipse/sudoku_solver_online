// 스도쿠 입력칸 생성
const rows = document.querySelector('.sudoku-rows');

for(let i = 0; i < 9; i++){
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.id = `row-${i+1}`;

    for(let j = 0; j < 9; j++){
        const colDiv = document.createElement('input');
        colDiv.classList.add('cell');
        colDiv.type = 'text';
        colDiv.id = `col-${j + 1}`;
        colDiv.maxLength = '1';
        rowDiv.appendChild(colDiv);
    }
    rows.appendChild(rowDiv);
}

// 입력칸엔 1~9 사이의 입력만 들어오도록 설정
const inputCellList = document.querySelectorAll('.cell');
inputCellList.forEach((cell, index)=>{
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
        }

        // 입력시 다음 cell로 focus
        if(inputValue.length === cell.maxLength && typeof inputCellList[index + 1] !== 'undefined'){
            inputCellList[index + 1].focus();
        }
    });
});