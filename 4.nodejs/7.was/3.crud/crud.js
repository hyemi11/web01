const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const { parse } = require("querystring");

const users = {};

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET") {
    handleGetRequest(req, res);
  } else if (req.method === "POST") {
    handlePostRequest(req, res);
  } else if (req.method === "PUT") {
    handlePutRequest(req, res);
  } else if (req.method === "DELETE") {
    handleDeleteRequest(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

async function handleGetRequest(req, res) {
  try {
    if (req.url === "/") {
      const data = await fs.readFile("index.html");
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
      res.end(data);
    } else if (req.url === "/user") {
      res.writeHead(200, { "Content-Type": "application/json; charset-utf-8" });
      res.end(JSON.stringify(users));
    } else if (req.url === "/about") {
      const data = await fs.readFile("about.html");
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
      res.end(data);
    } else if (req.url.startsWith("/static")) {
      const filePath = path.join(__dirname, req.url);
      console.log(filePath);
      try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, {
          "Content-Type": "application/javascript; charset-utf-8",
        });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not Found");
      }
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end("알수없는오류");
  }
}

function handlePostRequest(req, res) {
  if (req.url === "/user") {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", () => {
      if (req.headers["content-type"] === "text/plain") {
        return res.end("plaintext로 데이터를 줬구나");
      } else if (req.headers["content-type"] === "application/json") {
        const parsedData = JSON.parse(body);
        const username = parsedData.name;
        users[username] = username;
        return res.end(
          `application/json 등록성공,
          body: ${body} 
          parsedData: ${JSON.stringify(parsedData)} 
          username: ${username} 
          users: ${JSON.stringify(users)}`
        );
      } else if (
        req.headers["content-Type"] === "application/x-www-form-urlencoded"
      ) {
        res.writeHead(200, {
          "Content-Type": "application/json; charset-utf-8",
        });
        return res.end("form으로 데이터를 잘 받았음");
      } else {
        res.writeHead(404);
        return res.end("모르는 타입임");
      }
    });
  }
}

//문자열 To Json자료구조 : const myobject = JSON.parse(문자열이 들어감)
//Json자료구조 To 문자열 : const myString = JSON.stringify(객체인 myobject가 들어감)

function handlePutRequest(req, res) {
  if (req.url.startsWith("/user/")) {
    const key = req.url.split("/")[2];
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", () => {
      if (users[key]) {
        try {
          const parsedData = JSON.parse(body);
          users[key] = parsedData.name || users[key];
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(users));
        } catch (error) {
          console.error("JSON 파싱 또는 사용자 업데이트 오류:", error);
          res.writeHead(400, { "Content-Type": "text/plain;  charset=utf-8" });
          res.end("잘못된 요청 형식이거나 처리 중 오류가 발생했습니다.");
        }
      } else {
        res.writeHead(404, { "Content-type": "text/plain; charset=utf-8" });
        res.end("사용자를 찾을 수 없습니다.");
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}

function handleDeleteRequest(req, res) {
  if (req.url.startsWith("/user/")) {
    const username = path.basename(req.url);
    if (username && users[username]) {
      delete users[username];
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      res.end(`${username} 삭제 성공`);
    } else {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end(`${username} 사용자를 찾을 수 없습니다.`);
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}

server.listen(3000, () => {
  console.log("서버 대기중..on 3000번에서...");
});
