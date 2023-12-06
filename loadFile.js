// input 요소 가져오기
const fileInput = document.getElementById('fileInput');

// input 요소에 change 이벤트 리스너 등록
fileInput.addEventListener('change', function(event) {
    // 선택된 파일 가져오기
    const file = event.target.files[0];

    // FileReader 객체 생성
    const reader = new FileReader();

    // 파일 읽기가 완료되면 실행되는 이벤트 리스너 등록
    reader.onload = function(e) {
        // CSV 형식으로 파싱
        const csvData = e.target.result;
        parseCSV(csvData);
    };

    // 파일 읽기 시작
    reader.readAsText(file);
});

// CSV 형식으로 파싱하는 함수
function parseCSV(csvData) {
    // CSV 데이터를 줄 단위로 분할
    const cellList = document.querySelectorAll('.cell');
    const lines = csvData.split('\n');

    // 읽어온 데이터를 input에 저장
    let idx = 0;
    lines.forEach(function(line) {
        line.split(',').forEach((col)=>{
            cellList[idx++].value = col;
        })
        
    });
}