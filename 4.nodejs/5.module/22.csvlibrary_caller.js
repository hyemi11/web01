// 21번 라이브러리 불러오는 실습//

const { readCSV, writeCSV } = require("./21.csvlibrary");

const filePath = "hello2.csv";

const content = [
  ["이름", "나이", "직업"],
  ["김철수", "32", "개발자"],
  ["박영희", "28", "분석가"],
  ["이민준", "45", "컨설턴트"],
];

writeCSV(filePath, sampleData);
