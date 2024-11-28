const sqlite = require("better-sqlite3");
const dbFile = "chinook.db";
const db = new sqlite(dbFile);

function search(query, option, page, limit) {
  const fmtQuery = "%" + query + "%";
  const offset = (page - 1) * limit;

  const preQuery = queryString(option);
  const prePare = db.prepare(preQuery);
  return prePare.all({ query: fmtQuery, limit: limit, offset: offset });
}

function queryString(option) {
  if (option === "customers") {
    return `SELECT FullName
                FROM (
                    SELECT FirstName || ' ' || LastName AS FullName
                    FROM customers)
                WHERE FullName LIKE :query LIMIT :limit OFFSET :offset`;
  } else if (option === "albums") {
    return `SELECT Title FROM albums WHERE Title LIKE :query LIMIT :limit OFFSET :offset;`;
  } else if (option === "composer") {
    return `SELECT DISTINCT Composer FROM tracks WHERE Composer LIKE :query LIMIT :limit OFFSET :offset;`;
  } else {
    return `SELECT Name FROM ${option} WHERE Name LIKE :query LIMIT :limit OFFSET :offset; `;
  }
}

function returnPageNumber(query, option, limit) {
  const fmtQuery = "%" + query + "%";
  let queryString = "";

  if (option === "customers") {
    queryString = `SELECT COUNT(*) as total
                FROM (
                    SELECT FirstName || ' ' || LastName AS FullName
                    FROM customers)
                WHERE FullName LIKE ? `;
  } else if (option === "albums") {
    queryString = `SELECT COUNT(*) as total FROM albums WHERE Title LIKE ?`;
  } else if (option === "composer") {
    queryString = `SELECT DISTINCT COUNT(*) as total FROM tracks WHERE Composer LIKE ?`;
  } else {
    queryString = `SELECT COUNT(*) as total FROM ${option} WHERE Name LIKE ?`;
  }

  const preQuery = db.prepare(queryString);
  const returnQuery = preQuery.get(fmtQuery);
  const totalPage = Math.ceil(returnQuery.total / limit);
  return totalPage;
}

module.exports = { search, returnPageNumber };
