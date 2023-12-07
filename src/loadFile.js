// input 요소 가져오기
const fileInput = document.getElementById('fileInput');
const fileDiv = document.querySelector('#file-wrapper');
const fileInfo = document.querySelector('#file-info');

// 파일 선택시 eventlistener
fileInput.addEventListener('change', function(event) {
    // cell 초기화
    cellList.forEach((cell) => {
        cell.value = ``;
    });

    // 적절한 파일이 아닐 경우 return
    if(!validFileType(event.target.files[0])){
        alert('형식에 맞지 않는 파일입니다.');
        return;
    }
    // 선택된 파일 가져오기
    const file = event.target.files[0];

    // console.log(file.type, file.name, file.size);

    // FileReader 객체 생성
    const reader = new FileReader();

    // 파일 읽기가 완료되면 실행되는 이벤트 리스너 등록
    reader.onload = function(e) {
        // CSV 형식으로 파싱
        const csvData = e.target.result;
        parseCSV(csvData);
        fileInfo.innerText = `name : ${file.name}`;
    };

    // 파일 읽기 시작
    reader.readAsText(file);
});

// CSV 형식으로 파싱하는 함수
function parseCSV(csvData) {
    // CSV 데이터를 줄 단위로 분할
    const cellList = document.querySelectorAll('.cell');
    const lines = csvData.split('\n');
    // console.log(csvData);
    // console.log(lines);

    // 읽어온 데이터를 input에 저장
    let idx = 0;
    lines.forEach(function(line) {
        line.split(',').forEach((col)=>{
            col = col.replace(/\r/g, '');   // '\r' 문자 제거
            col = parseInt(col);
            if(typeof col === 'number' && 1 <= col && col <= 9){
                cellList[idx++].value = col;
            }else if(col === 0){
                idx++;
            }else{
                console.error(`${typeof col === 'string'}, "${col}", ${1 <= parseInt(col)}, ${parseInt(col) <= 9}`);
            }
        })
        
    });
}

// 파일이 적절한 type인지 validate해주는 함수
function validFileType(file){
    return fileTypes.includes(file.type);
}
// filetype 명시
const fileTypes = [
    "text/plain",
    "text/csv"
]