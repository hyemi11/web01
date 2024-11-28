const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./your-database.db');

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS forSearch (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    artistName TEXT, 
    Title TEXT,
    track TEXT,
    composer TEXT,
    genre TEXT,
    customer TEXT,
);

-- 초기 테이블 데이터 생성






-- SELECT artists.Name AS artistName, albums.Title
-- FROM artists
-- RIGHT OUTER JOIN albums ON artists.ArtistId = albums.ArtistId
-- Order by artistName;
