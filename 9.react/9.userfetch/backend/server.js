const express = require("express");
const cors = require("cors"); //npm i cors로 설치
const morgan = require("morgan"); //npm i morgan으로 설치
const { error } = require("console");
const app = express();

// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
// ];

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
];

//미들웨어
// app.use(cors()); //나는 모든걸 다 허용할거야. (보안 최악)(해결을 빠르게 해야할때 쓰세요)
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://127.0.0.1:3001",
      "https://my-domain.com",
    ],
    methods: ["GET", ["POST"]],
  })
);
app.use(morgan("dev")); //기본 개발자 디버깅

//api 라우트
app.get("/api/users", (req, res) => {
  //db 컬럼이 많으니. /api/users 전체를 요청할때는 이많은 것 중에 id, name만 전달한다
  const summary = users.map((u) => ({ id: u.id, name: u.name }));
  res.json(summary);
});

app.get("/api/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  //   console.log(user);
  res.json(user);
});

app.listen(3000, () => {
  console.log("서버레디");
});

//프론트엔드에서 패치를 통해서 요청할 백엔드 api를 만들어야함 (api/users), 결과는 json
// nodemon server.js (자동변경확인할수있는 방법으로 서버실행)

//프론트 서버 둘다 실행하기
// 원래 react도 기본포트가 3000이었고, 백엔드도 3000이었음. 두개가 중복이니까 따로 부여하면되나요?
// 서버먼저 띄우고 리액트 띄우면 리액트가 알아서 3001로 띄우라고 유도함 y로 수락해서 3001로 띄우면됨

// 패키지설치 관련 명령어 정리
// npm list -g   :글로벌 설치 리스트 확인
// /usr/local / lib
// ├── corepack@0.29.3
// ├── npm@10.8.2
// └── serve@14.2.4

// sudo npm i -g nodemon    :글로벌로 패키지 설치 하기
// 패키지이름   :설치확인 (해당 패키지가 설치되었으면 정보가 나옴)
// nodemon server.js    :노드몬으로 서버 실행

// npm i cors
