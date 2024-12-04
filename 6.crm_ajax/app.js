// 페이지 동적 로드 함수
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const morgan = require("morgan");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user-sample.db");

//미들웨어
app.use(express.static("public"));
app.use(morgan("dev"));

//라우트
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// 네비게이션 클릭 이벤트 설정
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("roots")) {
      e.preventDefault();
      const url = e.target.getAttribute("href");
      loadPage(url);
      history.pushState(null, null, url); // URL 업데이트
    }
  });

  // 뒤로가기/앞으로가기 이벤트 처리
  window.addEventListener("popstate", () => {
    loadPage(window.location.pathname);
  });
});

function loadPage(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then((html) => {
      document.getElementById("app").innerHTML = html; // 콘텐츠 교체
    })
    .catch((error) => {
      document.getElementById("app").innerHTML = "<h1>404 Not Found</h1>";
    });
}

//서버시작
app.listen(port, () => {
  console.log(`CRM Server is ready on http://localhost:${port}`);
});
