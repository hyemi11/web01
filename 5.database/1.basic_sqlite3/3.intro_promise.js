// const sqlite3 = require("sqlite3");
const sqlite3 = require("sqlite3").verbose(); //상세한 정보를 주는 모드를 verbose() (일종의 디버거모드)

const db = new sqlite3.Database("test.db"); //없으면 생성, 있으면 불러옴
// const db = new sqlite3.Database(':memory:'); //이렇게 하면 메모리에 만들어서 호로록 임시로 사용하는거

(async () => {
  try {
    await new Promise((resolve, reject) => {
      db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  } catch (err) {
    console.error("뭔가 에러: ", err);
  }
})();

(async () => {
  try {
    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO messages(text) VALUES (?)",
        ["Hello, SQLite"],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  } catch (err) {
    console.error("원가 예러: ", err);
  }
})();

db.each("SELECT * FROM messages", (err, row) => {
  if (err) throw err;
  console.log(row);
});

db.close();
