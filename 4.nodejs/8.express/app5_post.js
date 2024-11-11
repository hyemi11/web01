const express = require("express");
// const bodyParser = require("body-parser");

const app = express();

//body-parser 미들웨어가 body안에 있는 내용중에 json을 처리해서 body 라는 변수에 담아줌
app.use(express.json());

app.get("/", (req, res) => {
  res.send("루트");
});

app.post("/submit2", (req, res) => {
  const jsonData = req.body; //req.body에 파싱된 json데이터를 담아서 보내줌
  res.json({ receivedData: jsonData });
});

app.listen(3000, () => {
  console.log("서버레디");
});
