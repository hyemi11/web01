const express = require("express");
const sqlite3 = require("better-sqlite3");
const fs = require("fs");

const app = express();
const port = 3000;
const dbFile = "mydb.db";

const db = sqlite3(dbFile);

//미들웨어 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sql문 전체 실행하고 커밋하는 함수임(테이블 생성과 데이터 삽입 실행)
function initilizeDatabase() {
  const sql = fs.readFileSync("init_database.sql", "utf8");
  const statements = sql.split(";");
  // console.log(statements);

  try {
    db.transaction(() => {
      for (const statement of statements) {
        db.exec(statement);
      }
    })(); //트랜젝션은 성공하면 자동 커밋, 실패하면 자동 롤백
    console.log("초기화 성공");
  } catch (err) {
    console.error("초기화 오류");
  }
}

initilizeDatabase();

//users테이블 전체 데이터 반납
app.get("/users", (req, res) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  } catch (err) {
    res.status(500).send("내부오류");
  }
});

//users테이블 선택 데이터 반납
app.get("/users", (req, res) => {
  const userId = req.params.id;

  try {
    const users = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (!user) {
      return res.status(404).send("사용자없음");
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("내부오류");
  }
});

// select * from [테이블명] 실행 api
app.get("/:table", (req, res) => {
  const db_table = req.params.table;

  try {
    const query = db.prepare(`SELECT * FROM ${db_table}`);
    const rows = query.all();
    res.json(rows);
  } catch (err) {
    res.send(`테이블이 없다: ${db_table}`);
  }
});

app.listen(port, () => {
  console.log("서버레디");
});

// exec(sql): 결과를 반환하지 않고 SQL 문을 실행합니다. 주로 테이블 생성, 데이터 삽입, 업데이트, 삭제 등에 사용됩니다.
// prepare(sql).all(): SQL 문을 준비하고, all()을 통해 모든 행을 배열로 반환합니다.
// prepare(sql).get(): SQL 문을 준비하고, 단일 행을 객체로 반환합니다.
// prepare(sql).run(): SQL 문을 실행하여 행의 변화가 발생하는 작업(삽입, 업데이트 등)을 수행합니다.
// 실행 결과 객체(lastInsertRowid, changes 속성을 포함)를 반환합니다.
