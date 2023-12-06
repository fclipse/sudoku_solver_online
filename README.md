# Sudoku Solver in Online Web

made by Hansj

## 사용하는 법

1. repo를 다운받는다
2. `index.html`을 연다
3. sudoku 칸에 값을 입력한다.
    1. 칸마다 직접 숫자를 입력한다. 이때 입력시 화살표 키로 칸을 이동할 수 있다.
    2. 스도쿠 숫자를 적은 파일을 업로드한다. 이때 파일 형식은 `/examples`에 있는 `.txt`와 같이 `.csv`처럼 입력한다.
4. Solve 버튼을 누른다.
5. 다른 스도쿠를 입력하고 싶다면 Clear Values 버튼을 누르거나 새로고침한 후 3.으로 돌아간다.

## 파일 설명

- `/index.html`
  - `/src` 안에 있는 파일들을 단순히 단일 html로 합쳐놓은 파일이다.
  - `/src` 안에 있는 index.html을 실행해도 같은 결과가 나온다.

- `/src/index.html`
  - 화면 구조를 작성한 메인 `.html` 파일이다.
- `/src/screen.js`
  - 화면에 js로 input들을 그려주는 `.js` 파일이다.
- `/src/loadFile.js`
  - 스도쿠를 작성한 `.txt`파일을 읽어 가져오는 `.js` 파일이다.
- `/src/main.js`
  - 스도쿠 풀이 및 버튼 이벤트와 관련된 함수를 작성한 `.js` 파일이다.
- `/src/style.css`
  - html 파일에 있는 요소들을 정렬해주는 `.css` 파일이다.

## 예시 사진들

- 메인 화면에서 값을 입력한 예시
<img src="/examples_pictures/1.png" width="500px" alt="sudoku-solver의 메인 화면">

- 스도쿠 해를 구해 화면에 출력한 예시
<img src="/examples_pictures/2.png" width="500px" alt="sudoku-solver에서 스도쿠 해가 나온 화면">

- 해를 구하지 못하는 경우 예시
<img src="/examples_pictures/3.png" width="500px" alt="sudoku-solver에서 스도쿠 해가 나오지 못할 경우의 화면">

## 추가로 구현할 사항

- [ ] 풀이 알고리즘 최적화하기
- [ ] 해를 구할 수 없는 스도쿠가 입력되었을때, 어느 부분에서 틀렸는지 빨간색으로 표시해 알려주기  
- [x] 스도쿠 .csv, .json 파일 등으로 저장/업로드 가능하게 하기  
  - [x] 읽어들인 스도쿠 파일 풀 수 있도록  
- [ ] 카메라 통해서 비전인식 or 사진 업로드로도 스도쿠 풀 수 있도록 하기
