// const sqlite3 = require("sqlite3");
const sqlite3 = require("sqlite3").verbose(); //상세한 정보를 주는 모드를 verbose() (일종의 디버거모드)

const db = new sqlite3.Database("test.db"); //없으면 생성, 있으면 불러옴
// const db = new sqlite3.Database(':memory:'); //이렇게 하면 메모리에 만들어서 호로록 임시로 사용하는거

db.run("CREATE TABLE IF NOT EXISTS messages (text TEXT)", (err) => {
  if (err) throw err;
  //성공했을때..
  console.log("테이블 생성이 완료되었습니다");

  db.run("INSERT INTO messages(text) VALUES (?)", ["Hello, SQLite"], (err) => {
    if (err) throw err;
    //성공했을때..
    console.log("테이블 삽입이 완료되었습니다");

    db.each("SELECT * FROM messages", (err, row) => {
      if (err) throw err;
      console.log(row);
    });
  });
});

db.close();
