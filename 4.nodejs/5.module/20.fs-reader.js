const fs = require("fs");

const filePath = "hello.csv";

function csv_readfile() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("파일 읽는 도중 오류 발생", err.message);
    }
      console.log(data);
      console.log(typeof data);

    //이 문자열을 다시 우리가 원하는 자료구로로 변환
    //1 데이터를 한줄한줄 구분
    const rows = data.split("\n");
    //   console.log(rows);
    // 2 한줄한줄 내에서, 콤마로 구분짓는다
    for (let i = 0; i < rows, length; i++) {
      const row = rows[i];
      const columns = row.split(",");
        console.log(columns);
        
      }callback(result)
);
}

const content = [
  ["이름", "나이", "직업"],
  ["김철수", "32", "개발자"],
  ["박영희", "28", "분석가"],
  ["이민준", "45", "컨설턴트"],
];

// console.log(content);
// console.log(typeof content);

const csvContent = content.map((row) => row.join(",").join("\n"));
// console.log(csvContent);
// console.log(typeof csvContent);

function csv_writefile() {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("파일 쓰기 오류", err.message);
      return;
    }
    console.log("쓰기 완료");
    
    })
  };


// csv_writefile();
// csv_readfile();
