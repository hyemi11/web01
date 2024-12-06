const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//미들웨어
app.use(
  cors({
    origin: ["http://localhost:3001", "http://127.0.0.1:3001"],
    methods: ["GET", "POST"],
  })
);
app.use(morgan("dev"));

//api 라우트
// app.get("/api/main", (req, res) => {
//   res.json();
// });

app.listen(3000, () => {
  console.log("서버레디");
});
