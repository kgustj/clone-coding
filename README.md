# clone-coding

2021~2022년에 강의를 따라 만든 클론 코딩 연습 모음입니다. 원래 저장소 4개는 커밋 기록 그대로 폴더별로 합쳤고, 로컬에만 있던 3개 폴더를 추가했습니다.

| 폴더 | 내용 | 기술 | 기간 | 커밋 |
|---|---|---|---|---|
| [`paintjs-canvas`](paintjs-canvas) | 그림판: 색상·굵기 선택, 채우기, 이미지 저장 | HTML Canvas, JavaScript | 2021.05~06 | 4 |
| [`movieapp-react`](movieapp-react) | 영화 앱을 만들기 전 React 기초 연습: state, effect, props, 컴포넌트 | React, CSS Modules | 2021.06~2022.04 | 19 |
| [`momentom-js`](momentom-js) | 브라우저 시작 화면: 시계, 인사, 할 일, 날씨, 배경 이미지 | Vanilla JavaScript | 2021.06~2022.04 | 4 |
| [`wetube-node`](wetube-node) | 동영상 공유 사이트 (유튜브 클론): 회원가입·로그인(GitHub 로그인 포함), 프로필 수정, 영상 업로드·수정·삭제, 검색, 조회수 | Node.js, Express, MongoDB, Pug, Webpack, AWS S3 | 2021.06~2022.05 | 54 |
| [`vanilla-challenge-js`](vanilla-challenge-js) | 노마드코더 바닐라 JS 챌린지 과제 3~8: 이벤트로 제목 바꾸기, 창 크기별 배경색, 크리스마스 D-day, 국가 선택 저장(localStorage), 할 일 목록, 숫자 맞히기 게임 | Vanilla JavaScript | 2021.06 | - |
| [`wetube-challenge-node`](wetube-challenge-node) | 노마드코더 유튜브 클론 챌린지 과제 (코드샌드박스 blueprint): a09 영화 목록·추가, a10 Mongoose 모델, a11 영화 CRUD·검색, a15 파일 업로드, a17 비디오 플레이어 | Node.js, Express, Pug, MongoDB | 2021.07~08 | - |
| [`opentutorials-node`](opentutorials-node) | 생활코딩 WEB1(HTML) 페이지와 Node.js 기초 문법 연습 (`syntax/`, `nodejs/`) | HTML, Node.js | 2021.04~06 | - |

## 실행

각 폴더로 들어가서 실행합니다.

- `paintjs-canvas`, `momentom-js`: `index.html`을 브라우저로 열기
- `movieapp-react`: `npm install` 후 `npm start`
- `vanilla-challenge-js/assignment-*`: `index.html`을 브라우저로 열기
- `opentutorials-node/syntax`, `nodejs`: `node 파일이름.js`
- `wetube-challenge-node/a*`: 코드샌드박스용 과제라 로컬에서는 `npm install` 후 `npm start` (a11은 `src/db.js`에 MongoDB 주소 필요)
- `wetube-node`: `npm install` 후 `.env`(MongoDB 주소, 세션 키, AWS 키)를 만들고 `npm run assets`, `npm start`

## 원래 저장소

`clone-momentom-js`, `clone-movieapp-react`, `clone-paintjs-canvas`, `clone-wetube-node`

`vanilla-challenge-js`, `wetube-challenge-node`, `opentutorials-node`는 GitHub에 올린 적 없는 로컬 폴더(`nomad-challenge-js`, `clone-opentutorials-node`)에서 가져왔습니다. 그래서 커밋 기록이 없고, 커밋 날짜는 파일의 마지막 수정일로 맞췄습니다.
