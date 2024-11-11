const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

// 여기에서 정의하는게 기본 확장자가됨. 랜더에서 기본확장자는 뒤에 확장자명 안붙여도됨.
app.set("view engine", "html");
// app.set("view engine, "njk");

nunjucks.configure("views", {
  autoescape: true, //입력값 처리할 때 xss 같은것 발생하지 않도록 처리하는 기능
  express: app,
});

app.get("/", (req, res) => {
  res.render("index", { title: "익스프레스웹", message: "nunjucks" });
});

app.get("/fruits", (req, res) => {
  const fruits = ["apple", "banana", "orange", "graphs"];
  res.render("fruits", { fruits: fruits });
});

app.get("/greeting", (req, res) => {
  const username = "park";
  res.render("greeting", { username: username });
});

app.get("/welcome", (req, res) => {
  const isAdmin = true;
  res.render("welcome", { isAdmin: isAdmin });
});

app.listen(3000, () => {
  console.log("서버레디");
});
