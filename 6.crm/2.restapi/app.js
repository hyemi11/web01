const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

//디버깅 외부 모듈(따로 콘솔닷로그안찍어도되고, 아이피 접속 로그도 알수있음. 필수모듈
const morgan = require("morgan");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user-sample.db");

const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
}); //접속로그확인..로그스트림 저장 (a=append)

//미들웨어
app.use(express.static("public"));
app.use(morgan("combine", { stream: logStream })); // 로그스트림 파일로 저장시키기
app.use(morgan("dev"));
// combined - 아파치 서버 로그 포멧
// common - 요약된 형태
// dev - 개발시 유용한 모드
// tiny
// short

//모건 커스터마이징1
// app.use(morgan(":method :url :status"));
// app.use(
//   morgan("dev", {
//     skip: (req, res) => res.statusCode === 404,
//   })
// );

//모건 커스터마이징 2
// app.use(myLogger)  //api수신 확인 디버깅
// function myLogger(req, res, next) {
//   console.log(`LOG: ${req.method} ${req.url}`);
//   next();
// }

// app.use(myLogger)

function myLogger(req, res, next) {
  console.log(`LOG: ${req.method} ${req.url}`);
  next();
}

//라우트
//시스템 호출용 API
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, [], (err, rows) => {
    res.json(rows);
  });
});

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  const query = "SELECT * FROM users WHERE id = ?";
  db.get(query, [userId], (err, rows) => {
    res.json(rows);
    //   if (!rows) {
    //       res.json(rows);
    //   } else {
    //       res.status(404).json({error: '사용자 없다'})
    //   }
  });
});

//사용자 페이지용 라우트
app.get("/users/:id", (req, res) => {
  res.sendFile(path.resolve("./public/user_detail.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/users.html"));
  // res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

//서버시작
app.listen(port, () => {
  // console.log("CRM Server is ready to starts..");
  console.log(`CRM Server is ready on http://localhost:${port}`);
});
