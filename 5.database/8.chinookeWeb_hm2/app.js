const express = require("express");
const { search, returnPageNumber } = require("./query");
const path = require("path");
const morgan = require("morgan");
const { json } = require("body-parser");

const app = express();
const port = 3000;
const limit = 10;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/api/search", (req, res) => {
  try {
    const query = req.query.searchQuery;
    const option = req.query.option;
    const page = parseInt(req.query.page);
    console.log(
      `query 잘 넘어왔나: 검색쿼리=${query}, 옵션=${option}, 페이지=${page}`
    );
    const results = search(query, option, page, limit);
    const totalPages = returnPageNumber(query, option, limit);
    console.log(`totalPages 잘 넘어왔나: ${JSON.stringify(totalPages)}`);
    res.json({
      success: true,
      results: results,
      pages: { total: totalPages, page: page },
    });
  } catch (error) {
    console.log(req.query.option + "조회 중 오류", error);
    res.status(500).json({
      success: false,
      message: req.query.option + "조회 중 오류",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
