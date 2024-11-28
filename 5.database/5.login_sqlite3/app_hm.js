const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const sqlite3 = require("sqlite3");
const path = require("path");

//내부에서 사용할 변수들 정의
const app = express();
const port = 3000;
const db = new sqlite3.Database("users.db");

//세션 초기화
app.use(
  session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({
      db: "users.db", // 내가 원하는 db이름(파일명) (별도 디비 생성해서 저장하고 싶으면 신규이름으로 하면됨)
    }),
  })
);

// 미들웨어 등록
app.use(express.urlencoded({ extended: true })); //기본 폼 입력값 처리
app.use(express.json());
app.use(express.static("public")); //여기를 스테틱으로 하겠다 알아서 가져가

// 라우팅 등록
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/profile", (req, res) => {
  // const user = req.session.user;
  // console.log('확인1: ', user);

  res.sendFile(path.resolve("public/profile.html"));
});

app.get("/profile-data", (req, res) => {
  const user = req.session.user;
  // console.log('확인2: ', user);

  if (user) {
    db.get("SELECT * FROM users WHERE id = ?", [user.id], (err, row) => {
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: "사용자 없다" });
      }
    });
  } else {
    res.status(404).send("로그인 안된 사용자임");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const queryStr = `SELECT * FROM users WHERE username = ? AND password = ?`;
  console.log(queryStr);

  db.get(queryStr, [username, password], (err, row) => {
    if (row) {
      console.log("사용자 조회:", row);
      req.session.user = row;
      console.log("로그인완료이후");
      res.redirect("/profile");
    } else {
      console.log("로그인 실패");
      res.send("로그인 실패");
    }
  });
});

app.get("/logout", (req, res) => {
  const user1 = req.session.user;
  console.log("logout complete: ", user1);

  req.session.destroy();
  res.send();
});

app.listen(port, () => {
  console.log("서버레디");
});
