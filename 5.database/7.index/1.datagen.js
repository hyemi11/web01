const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.db");

const numData = 1_000_000;

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY,
        name TEXT,
        department TEXT,
        salary INTEGER
        )
    `);
});

function getRandomName() {
  const lastName = ["김", "이", "박", "최", "정"]; //성
  const firstName1 = ["가", "나", "다", "라", "마"]; //미들
  const firstName2 = ["바", "사", "아", "자", "차"]; //마지막

  const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];
  const randomFirstName1 =
    firstName1[Math.floor(Math.random() * firstName1.length)];
  const randomFirstName2 =
    firstName2[Math.floor(Math.random() * firstName2.length)];

  return { name: randomLastName + randomFirstName1 + randomFirstName2 };
}

function getRandomDept() {
  const departments = ["IT", "HR", "Engineering", "Marketing"];
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomSalary() {
  return Math.floor(Math.random() * 100) * 1000 + 10000; //10,000 에서 100,000 사이의 랜덤 급여
}

db.serialize(() => {
  console.time("Execution Time"); //시작 시간 기록
  db.run("BEGIN TRANSACTION");
  const insertStmt = db.prepare(
    "INSERT INTO employees(name, department, salary) VALUES (?,?,?)"
  );
  for (let i = 0; i < numData; i++) {
    const { name } = getRandomName();
    const department = getRandomDept();
    const salary = getRandomSalary();

    insertStmt.run(name, department, salary, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }

  insertStmt.finalize((err) => {
    //console.timeEnd("Execution Time"); //종료 시간 및 소요 시간 출력
  });

  db.run("COMMIT", () => {
    console.timeEnd("Execution Time"); //종료 시간 및 소요 시간 출력
  });
});
