const sqlite3 = require("sqlite3").verbose();

function connectToDatabase() {
  return new sqlite3.Database("search.db");
}

//아티스트 명 찾기
function queryStr(db, option, word) {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT Name FROM artists WHERE ? LIKE '%?%'`;
    console.log("쿼리문 출력: ", selectQuery);

    db.all(selectQuery, [option, word], (err, rows) => {
      if (err) {
        console.error("쿼리문 실행 실패");
      } else {
        return rows;
      }
    });
  });
}

module.exports = { connectToDatabase, queryStr };

//카테고리별로 찾기 (아티스트이름, 앨범 제목, 트랙제목, 작곡가, 장르, 고객이름)
//(아티스트이름 from artists), (앨범제목 from albums), (트랙제목, 작곡가, 고객이름 from tracks), (장르 from genres)

// (검색단어, 아티스트이름)
// SELECT DISTINCT Name FROM artists WHERE Name LIKE '%검색단어%';

// (검색단어, 앨범제목)
// SELECT Title FROM albums WHERE Title LIKE '%aa%';

// (검색단어, 트랙제목)
// SELECT Name FROM tracks WHERE Name LIKE '%aa%';

// (검색단어, 작곡가)
// SELECT DISTINCT Composer From tracks WHERE Composer LIKE '%mike%';

// (검색단어, 장르)
// SELECT Name  FROM genres WHERE Name LIKE '%es%';

// (검색단어, 고객이름)
