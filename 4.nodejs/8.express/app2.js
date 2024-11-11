const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("결과출력");
});

app.get("/users", (req, res) => {
  res.send("user 출력");
});

app.get("/users/:id", (req, res) => {
  console.log(req.params);
  res.send(`사용자 ${req.params.id}을 출력`);
});

app.get("/users/:id/profile", (req, res) => {
  console.log(req.params);
  res.send(`사용자 ${req.params.id}에 대한 상세한 Profile을 출력`);
});

app.get("/search", (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);
  res.send(
    `검색을 요청한 내용은 ${queryParams}와 최근 ${queryParams.top} 갯수 입니다`
  );
});

app.listen(port, () => {
  console.log("서버 레디");
});
