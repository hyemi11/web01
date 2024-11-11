const express = require("express");
const app = express();
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

// 정적 폴더 정의
app.use(express.static("public")); // 내가 정한 폴더명

app.get("/", async (req, res) => {
  const htmlFile = path.join(__dirname, "public", "index.html");

  try {
    const data = await fsp.readFile(htmlFile);
    res.send(data);
  } catch (err) {
    res.status(500).send("서버오류");
  }
});

app.get("/banana", (req, res) => {
  const htmlFile = path.join(__dirname, "public", "index.html");

  fs.readFile(htmlFile, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("서버오류");
      return;
    }
    res.setHeader("Content-Type", "text/html"); //MIME타입설정(안해도 이미 설정되어있는데, 혹시몰라 강제시킴.)
    res.send(data);
  });
});

app.get("/sendfile", (req, res) => {
  const htmlFile = path.join(__dirname, "public", "index.html");
  // res.sendFile(htmlFile);
  res.sendFile(htmlFile, (err) => {
    if (err) {
      throw Error("파일 없음");
    }
  });
});

//여기가지 왔는데, 매칭되는 라우트 없으면?
app.use((req, res) => {
  res.status(404).send("없음!");
});

app.use((err, req, res, next) => {
  res.status(500).send("서버 오류!");
});

app.listen(3000, () => {
  console.log("서버레디");
});
