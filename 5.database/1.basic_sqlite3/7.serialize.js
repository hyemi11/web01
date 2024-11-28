const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(":memory:"); //실행할때마다 DB메몸리에 새롭게 생성

db.serialize(() => {
  //테이블 생성
  db.run("CREATE TABLE users (id INT, name TEXT)");

  //테이블 삽입
  db.run('INSERT INTO users(id, name) VALUES (1, "Alice")');
  db.run('INSERT INTO users(id, name) VALUES (2, "Bob")');

  //prepared statement 로 데이터 삽입하기
  const statement = db.prepare("INSERT INTO users VALUES (?, ?)");
  statement.run(3, "User3");
  statement.run(4, "User4");
  statement.finalize();

  //데이터 조회
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    console.log("조회된 데이터: ", rows);
  });

  db.each("SELECT id, name FROM users", (err, row) => {
    console.log("조회: ", row.id, row.name);
  });
});

//끝날때 db종료
db.close((err) => {
  if (err) throw err;
  console.log("DB연결 정상 종료");
});

//db.exec로 단일 문장을 실행한다 또는 db.prepare()로 준비해놓고 위의 변수명 db.run() | 위의 변수명 db.all()
