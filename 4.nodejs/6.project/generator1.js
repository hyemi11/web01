const names = ["John", "Jane", "Michael", "Emily", "William", "Olivia"];
const lastNames = ["박", "김", "이", "조"];
const firstNames = ["John", "Jane", "Michael", "Emily", "William", "Olivia"];
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Philadelphia",
];

function generateName() {
  //return names[Math.floor(Math.random() * names.length)];
  return (
    firstNames[Math.floor(Math.random() * firstNames.length)] +
    lastNames[Math.floor(Math.random() * lastNames.length)]
  );
}

function generateGender() {
  return Math.random() < 0.5 ? "남성" : "여성";
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateBirthDate() {
  // yyyy-mm-dd 포멧으로 반환하기
  const year = getRandomInRange(1960, 2010);
  const month = getRandomInRange(1, 12);
  const day = getRandomInRange(1, 28);

  return `${year}-${month}-${day}`;
}

function generateAddress() {
  // 앞에 1~100까지의 번지수를 붙여 주소를 생성하시오
  const street = getRandomInRange(1, 100);
  const city = cities[Math.floor(Math.random() * cities.length)];
  return `${street} ${city}`;
}

const userDb = [];

for (let i = 0; i < 10; i++) {
  userDb.push([
    generateName(),
    generateGender(),
    generateBirthDate(),
    generateAddress(),
  ]);
}

//db에 있는 내용 콘솔에 출력
// for (const user of userDb) {
//   console.log(user);
// }

// console.log(userDb);

//csv 형태로, 파일에 저장하시오..(user.csv)
const fs = require("fs");

// function writeDataToCSV(data, filePath) {
//   const header = ["Name", "gender", "BirthDate", "Address"];
//   const rows = data.map((row) => {
//     const row_string = row.join(",");
//     console.log("데이터 row출력: ", row_string);
//     return row_string;
//   });
//   const csvContent = [header, ...rows].join("\n");
//   console.log("csv콘텐츠: ", csvContent);

//   fs.writeFileSync(filePath, csvContent, "utf-8");
// }

function writeToCSV(data, filePath) {
  const header = ["Name", "Gender", "BirthDate", "Address"];
  const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
  const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

  fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
}

// console.log("사용자데이터 출력: ", userDb);
// writeDataToCSV(userDb, "user.csv");
writeToCSV(userDb, "user.csv");

//---------------------------------------//
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// const csvWriter = createCsvWriter({
//   path: "user.csv",
//   Headers: [
//     //내 파일의 헤더
//     { id: "", title: "" },
//   ],
// });

// const data = [{}];

// csvWriter.writeRecords(data).then(() => {
//   console.log("성공적으로 썼음");
// });
