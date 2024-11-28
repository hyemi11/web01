// const sqlite3 = require("sqlite3");
const sqlite3 = require("sqlite3").verbose(); //상세한 정보를 주는 모드를 verbose() (일종의 디버거모드)

const db = new sqlite3.Database("test.db"); //없으면 생성, 있으면 불러옴
// const db = new sqlite3.Database(':memory:'); //이렇게 하면 메모리에 만들어서 호로록 임시로 사용하는거

db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)");

db.run("INSERT INTO messages(text) VALUES (?)", ["Hello, SQLite"]);
//prepared statement
//placeholder를 통해 입력값을 입력받도록 설정함.
//왜? SQL injection에 취약하지 않도록,, 입려값에 대해서 필더링 해줌..('')

db.each("SELECT * FROM messages", (err, row) => {
  if (err) throw err;
  console.log(row);
});

db.close();
