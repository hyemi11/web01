const sqlite3 = require("sqlite3").verbose();

// 기존 데이터베이스 연결
const chinookDb = new sqlite3.Database("./chinook.db");

// 새 데이터베이스 생성 및 연결
const newDB = new sqlite3.Database("./newDB.db");

// 1. 새 데이터베이스에 테이블 생성
newDB.serialize(() => {
  newDB.run(
    `
    CREATE TABLE IF NOT EXISTS new_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artistName TEXT,
      albumTitle TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating table in new database:", err);
      } else {
        console.log("Table created in new database.");
      }
    }
  );
});

// 2. 기존 데이터베이스에서 데이터 추출 및 삽입
chinookDb.all(
  `SELECT artists.Name AS artistName, albums.Title AS albumTitle
   FROM artists
   RIGHT OUTER JOIN albums ON artists.ArtistId = albums.ArtistId
  Order by artistName`,
  [],
  (err, rows) => {
    if (err) {
      console.error("Error fetching data from old database:", err);
      return;
    }

    // 데이터 삽입
    const insertQuery = `INSERT INTO new_table (artistName, albumTitle) VALUES (?, ?)`;

    rows.forEach((row) => {
      const artistName = row.artistName || "Unknown Artist"; // NULL 처리
      const albumTitle = row.albumTitle;

      newDb.run(insertQuery, [artistName, albumTitle], (err) => {
        if (err) {
          console.error("Error inserting data into new database:", err);
        } else {
          console.log(`Inserted: ${artistName} - ${albumTitle}`);
        }
      });
    });
  }
);

// 3. 연결 닫기
chinookDb.close((err) => {
  if (err) console.error("Error closing old database:", err);
  else console.log("Old database connection closed.");
});

newDB.close((err) => {
  if (err) console.error("Error closing new database:", err);
  else console.log("New database connection closed.");
});
