//외부모듈 임포트
const express = require("express");
const path = require("path");

//변수정의
//서버설정
const app = express();
const PORT = 3000;

//내부자료구조
const users = {};

//미들웨어
app.use("/static", express.static("static"));
app.use("/images", express.static("static/images"));

app.use(express.json()); //요청을 바디에 application/json이 있으면, req.body에 담아줘

app.use((req, res, next) => {
  console.log(`LOG: ${req.method} ${req.url}`);
  next();
});

//라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html")); //join은..이거이거이거 합쳐서 경로만들어줌(절대경로로 사용)
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "about.html"));
});

app.get("/user", (req, res) => {
  res.json(users); //jason으로 주거나 (이때는 Content-Type:application/json))
  // res.send(JSON.stringify(users)); //스트링으로 주거나 (이때의 기본 헤더에 들어가는 Content-Type(마임타입)은 text/html)
});

app.post("/user", (req, res) => {
  // const name  = req.body.name;
  console.log(req.body);
  const { name } = req.body;
  users[name] = name;
  res.status(201).send("등록 성공"); //201은 Created
});

app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  users[id] = req.body.name;
  res.status(204).send("수정 성공");
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  delete users[id];
  res.status(204).send("삭제 성공"); //204는 deleted, (200도 가능. 이거는 어째뜬 했다임)
});

//오류미들웨어
app.use((res, req) => {
  // res.status(404).send(`이 페이지${req.url}는 없습니다`);
  const errorPage = path.join(__dirname, "static", "404.html");
  res.status(404).sendFile(errorPage);
});

//서버시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}포트에서 대기 중 입니다.`);
});
