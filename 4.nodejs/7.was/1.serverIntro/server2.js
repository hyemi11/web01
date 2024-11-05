const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<p>헬로우 어게인 5000</p>");
});

server.listen(5000, () => {
  console.log("서버 대기중..on 5000번에서...");
});
