const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "example.csv",
  header: [
    // 내 파일의 헤더
    { id: "col1", title: "name" },
    { id: "col2", title: "Column2" },
  ],
});

const data = [
  { col1: "값1", col2: "값2" },
  { col1: "값3", col2: "값4" },
  { col1: "값5", col2: "값6" },
  { col1: "값7", col2: "값8" },
];

csvWriter.writeRecords(data).then(() => {
  console.log("성공적으로 썼음");
});
