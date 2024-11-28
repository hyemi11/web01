const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "revenue.html"));
});

app.get("/revenue_data", (req, res) => {
  const db = new sqlite3.Database("user-sample.db", (err) => {
    if (err) {
      console.error("파일없다!!");
    } else {
      console.log("DB 로딩 성공");
    }
  });

  //원하는 쿼리문
  db.all(
    `
        SELECT 
            strftime('%Y-%m', "orders"."OrderAt") AS YearMonth,
            SUM(items.UnitPrice) AS MonthlyRevenue,
            COUNT(order_items.ItemId) AS ItemCount
        FROM 
            "orders"
        JOIN 
            "order_items" ON "orders"."Id" = "order_items"."OrderId"
        JOIN 
            "items" ON "order_items"."ItemId" = "items"."Id"
        WHERE 
            "orders"."OrderAt" >= '2023-01-01' AND "orders"."OrderAt" <= '2023-12-31'
        GROUP BY 
            strftime('%Y-%m', "orders"."OrderAt")
        ORDER BY 
            strftime('%Y-%m', "orders"."OrderAt")
    `,
    [],
    (err, rows) => {
      if (err) {
        console.log("쿼리 실패");
      } else {
        // console.log("쿼리실행문은?:", rows);
        // 프런트에서 원하는 형태로 가공
        const labels = [];
        const revenue = [];
        const counts = [];
        for (const row of rows) {
          labels.push(row.YearMonth);
          revenue.push(row.MonthlyRevenue);
          counts.push(row.ItemCount);
        }
        const chartData = {
          labels: labels,
          revenues: revenue,
          counts: counts,
        };
        // console.log(chartData);
        res.send(chartData);
      }
    }
  );
});

app.get("/gender_dist_data", (req, res) => {
  const db = new sqlite3.Database("user-sample.db", (err) => {
    if (err) {
      console.log("파일없다!");
    } else {
      console.log("db 로딩 성공");
    }
  });

  //원하는 쿼리문
  db.all(
    `SELECT 
	Age/10*10 AS AgeGroup, 
	Gender,
	COUNT(*) AS UserCount
    FROM users
    GROUP BY AgeGroup, Gender;
`,
    [],
    (err, rows) => {
      if (err) {
        console.error("쿼리 실패");
      } else {
        // console.log("쿼리실행문은?:", rows);

        //프런트에 줄 리스트형태로 데이터 가공

        let labels = [];
        let maleCount = [];
        let femaleCount = [];

        //1.for문으로 추출
        for (let i = 0; i < rows.length; i += 2) {
          labels.push(`${rows[i].AgeGroup}대`);
          femaleCount.push(rows[i].UserCount);
        }
        for (let i = 1; i < rows.length; i += 2) {
          maleCount.push(rows[i].UserCount);
        }

        //2. filter+map으로 추출
        // labels = rows
        //   .filter((row) => row.Gender === "Female")
        //   .map((row) => `${row.AgeGroup}대`);

        // femaleCount = rows
        //   .filter((row) => row.Gender === "Female")
        //   .map((row) => row.UserCount);

        // maleCount = rows
        //   .filter((row) => row.Gender === "Male")
        //   .map((row) => row.UserCount);

        const chartData = {
          labels: labels,
          maleCount: maleCount,
          femaleCount: femaleCount,
        };

        // console.log("보낼 데이터는: ", chartData);
        res.json(chartData);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`server is ready on http://localhost:${port}`);
});
