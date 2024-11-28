// 모듈들 불러오기
const { connectToDatabase, queryStr } = require("./query");
const db = connectToDatabase();

const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const sqlite3 = require("sqlite3");
const path = require("path");
const { copyFileSync } = require("fs");

// 내부에서 사용할 변수들 정의
const app = express();
const port = 3000;
// const db = new sqlite3.Database("chinook.db");

// 세션 초기화
app.use(
  session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({
      db: "search.db",
    }),
  })
);

// 미들웨어 등록
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// 라우팅 등록
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.post("/search", (req, res) => {
  const { option, word } = req.body;
  //   req.session.word = word;
  console.log("받아온 단어: ", option, word);

  let rows = queryStr(db, option, word);
  if (rows) {
    console.log("쿼리실행 결과: ", rows);
    res.json(rows);
  } else {
    res.send("해당되는 아티스트가 없습니다.");
  }
});

// db.get(queryStr, [word], (err, row) => {
//   if (row) {
//     console.log("쿼리실행 결과: ", row);
//     res.json(row);
//   } else {
//     res.send("해당되는 아티스트가 없습니다.");
//   }
// });

db.close();

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
