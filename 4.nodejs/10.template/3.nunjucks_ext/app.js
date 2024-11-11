const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

app.set("view engine", "html");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  const data = {
    title: "My Page",
    content: "This is My content page",
  };
  res.render("main", { data });
});

// app.get("/user", (req, res) => {
//   const data = {
//     title: "사용자 page",
//     content: "This is My 사용자 content page",
//   };
//   res.render("user", { data });
// });

// app.get("/product", (req, res) => {
//   const data = {
//     title: "상품 page",
//     content: "This is My 상품 content page",
//   };
//   res.render("product", { data });
// });

app.get("/page1", (req, res) => {
  const data = {
    title: "상속하는 스타일",
    content: "This is 상속받은 page1의 content page",
  };
  res.render("page1", data);
});

app.get("/page2", (req, res) => {
  const data = {
    title: "상속하는 스타일",
    content: "This is 상속받은 page2의 content page",
  };
  res.render("page2", data);
});

app.listen(3000, () => {
  console.log("서버레디");
});
