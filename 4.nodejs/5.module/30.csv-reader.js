//npm i csv-parser
const fs = require("fs"); //빌트인
const csv = require("csv-parser"); //외부 npm

const results = [];

fs.createReadStream("hello.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results);
  });
