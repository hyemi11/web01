// const sqlite3 = require("sqlite3");
const sqlite3 = require("sqlite3").verbose(); //상세한 정보를 주는 모드를 verbose() (일종의 디버거모드)

const db = new sqlite3.Database("test.db"); //없으면 생성, 있으면 불러옴
// const db = new sqlite3.Database(':memory:'); //이렇게 하면 메모리에 만들어서 호로록 임시로 사용하는거

function dbRunQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function dbAllQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

(async () => {
  try {
    await dbRunQuery("CREATE TABLE IF NOT EXISTS messages (text TEXT)");
    await dbRunQuery("INSERT INTO messages(text) VALUES (?)", [
      "Hello, SQLite",
    ]);
    const rows = await dbAllQuery("SELECT * FROM messages");
    rows.forEach((row) => {
      console.log(row);
    });
  } catch (err) {
    console.error("뭔가 에러: ", err);
  } finally {
    //db클로우즈
    db.close();
  }
})();

console.log("가장 먼저 출력");
