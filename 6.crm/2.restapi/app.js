const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

//디버깅 외부 모듈(따로 콘솔닷로그안찍어도되고, 아이피 접속 로그도 알수있음. 필수모듈
const morgan = require("morgan");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user-sample.db");

//미들웨어
//static 설정
app.use(express.static("public"));
//디버깅모드 설정
app.use(morgan("dev"));
// app.use(myLogger)
// function myLogger(req, res, next) {
//   console.log(`LOG: ${req.method} ${req.url}`);
//   next();
// }

//라우트
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
  // res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

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

//서버시작
app.listen(port, () => {
  // console.log("CRM Server is ready to starts..");
  console.log(`CRM Server is ready on http://localhost:${port}`);
});
