const express = require("express");
const cookieParser = require("cookie-parser");
const { json } = require("body-parser");

const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  //클라이언트에서 쿠키를 보낸다
  res.cookie("mycookie", "abcd", { maxAge: 60000 }); //6000ms = 60s = 1분
  res.cookie("username", "user1", { maxAge: 60000 }); //6000ms = 60s = 1분
  res.cookie("cart", ["사과", "딸기", "바나나"], {
    maxAge: 60000,
  }); //6000ms = 60s = 1분
  res.send("쿠키를 담아서 보낸다.");
});

app.get("/readcookie", (req, res) => {
  const myCookie = req.cookies;
  console.log("클라이언트에서 가져온 쿠키:", myCookie);
  res.send(`쿠키를 잘 들고 왔군: ${JSON.stringify(myCookie)}`);
});

app.listen(port, () => {
  console.log("서버레디");
});

//중요!!//
//쿠키는 서버가 발급 클라이언트에 저장
//세션은 서버가 발급 서버에 저장

//서버는 쿠키를 발급해주고 저장해두지 않아 (그래서 가져왔을때 비교할게없지... 아묻따 신뢰)
//즉 쿠기가 있기만하면됨. 어떤쿠키인지 상관없어.
