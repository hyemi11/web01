//express, express-session, cookie-parser의 각역할을 이해하기 위한 공부

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const PORT = 3000;

//미들웨어 설정
app.use(express.json()); //json 요청 바디를 파싱
app.use(cookieParser()); //요청에 포함된 쿠키를 파싱
app.use(
  session({
    secret: "your-secret-key", //세션을 위한 비밀키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true는 HTTPS에서만 작동하므로 개발환경에서는 false로
  })
);

//로그인 엔드포인트
app.post("/login", (req, res) => {
  const { username } = req.body;

  //예시로, 간단히 사용자가 제공한 이름을 세션에 저장
  req.session.username = username;
  res.send(`Logged in as ${username}`);
});

//로그아웃 엔드포인트
app.post("/logout", (req, res) => {
  req.session.destroy(); // 세션 삭제
  res.send("Logged Out");
});

//인증된 사용자만 접근 가능한 엔드포인트
app.get("/dashboard", (req, res) => {
  if (req.session.username) {
    res.send(`Welcome to your dashboard, ${req.session.username}!`);
  } else {
    res.send(`Please log in to access the dashboard.`);
  }
});

//서버 시작
app.listen(PORT, () => {
  console.log(`서버대기 : http://localhost:${PORT}`);
});
