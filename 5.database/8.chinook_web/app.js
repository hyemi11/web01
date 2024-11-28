// 모듈들 불러오기
require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
// 변수정의
const port = 3000;
const db = new sqlite3.Database(process.env.DB_PATH);
const app = express();

// 미들웨어 등록
app.use(express.static("public"));

// 라우팅 등록
app.get("/", (req, res) => {
  //여기는 도달하지 않음. public을 미들웨어로 노출한 경우에는
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/api/search", (req, res) => {
  const { searchQuery, option, page } = req.query;

  console.log(
    `사용자입력 서버 겟: ${searchQuery}, option: ${option}, 페이지: ${page}`
  );
  const itemsPerPage = 10; //페이지당 열개만 출력
  const offset = (page - 1) * itemsPerPage; //산수 계산을 통해서 내 페이지를 원하는 offset계산

  // 사용자가 요청한 내용이 몇개나 있고, 그게 몇페이지가 될건지 계산하기
  const countSql = function queryString2() {
    if (option === "customers") {
      return `SELECT COUNT(*) as count
                FROM (
                    SELECT FirstName || ' ' || LastName AS FullName
                    FROM customers)
                WHERE FullName LIKE ? `;
    } else if (option === "albums") {
      return `SELECT COUNT(*) as count FROM albums WHERE Title LIKE ?`;
    } else if (option === "composer") {
      return `SELECT DISTINCT COUNT(*) as count FROM tracks WHERE Composer LIKE ?`;
    } else {
      return `SELECT COUNT(*) as count FROM ${option} WHERE Name LIKE ?`;
    }
  };

  db.get(countSql, [`%${searchQuery}%`], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500);
    }
    // console.log("갯수:", row);
    const totalPage = Math.ceil(row.count / itemsPerPage);
    console.log(`갯수: ${row.count}, 전체페이지수: ${totalPage}`);

    const sql = function queryString(option) {
      if (option === "customers") {
        return `SELECT FullName
                FROM (
                    SELECT FirstName || ' ' || LastName AS FullName
                    FROM customers)
                WHERE FullName LIKE ? LIMIT ? limit ?`;
      } else if (option === "albums") {
        return `SELECT Title FROM albums WHERE Title LIKE ? LIMIT ? limit ?`;
      } else if (option === "composer") {
        return `SELECT DISTINCT Composer FROM tracks WHERE Composer LIKE ? LIMIT ? limit ?`;
      } else {
        return `SELECT Name FROM ${option} WHERE Name LIKE ? LIMIT ? limit ? `;
      }
    };

    db.all(sql, [`%${searchQuery}%`, itemsPerPage, offset], (err, rows) => {
      // console.log("쿼리실행 결과: ", rows);
      res.json({
        results: rows,
        currentPage: page,
        totalPage: totalPage,
        status: "ok",
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});

//.env파일 안의 키-벨류 값들을 읽어다가 메모리에 올려놓고, 내 프로그램(프로세스)가 실행되는 동안에, 해당 값들을 일반 환경변수처럼 접근 할 수 있다
//(process.env < --내 프로세스에서 사용하는 환경변수)
