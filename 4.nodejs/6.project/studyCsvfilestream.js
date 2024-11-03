// const userCsv = require("./1.user1000.csv");
// const storCsv = require("./2.store100.csv");
const fs = require("fs");
const csv = require("csv-parser");

const rows = [];

fs.createReadStream("./1.user1000.csv")
  .pipe(csv())
  .on("data", (row) => {
    rows.push(row); // 모든 행을 배열에 저장
  })
  .on("end", () => {
    const randomRow = rows[Math.floor(Math.random() * rows.length)];
    console.log("랜덤으로 선택된 행:", randomRow);
    const randomId = randomRow.Id;
    console.log("id: ", randomId);
  });
