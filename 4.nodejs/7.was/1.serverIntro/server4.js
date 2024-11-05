const http = require("http");
const fs = require("fs").promises;
const { rejects } = require("assert");
const { resolve } = require("path");

//파일로 부터 컨텐츠를 읽어와서, 그 내용을 여기에 전달해주면 끝.

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.readFilePromise("./index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "파일 읽는 도중 오류 발생: 내부에 알수없는 오류가 발생했습니다. 관리자에게 문의하세요"
      );
    }
  })
  .listen(3000, () => {
    console.log("서버 대기중..on 3000번에서...");
  });
