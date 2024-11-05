const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const { parse } = require("querystring");

const users = {};

const server = http.createServer(async (req, res) => {
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
      const data = await fs.readFile("./index.html");
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
      res.end("GET요청/응답완료");
      // res.end(data);
    } else if (req.url === "/about") {
      res.end("GET요청/about응답완료");
    } else if (req.url === "/user") {
      res.writeHead(200, { "Content-Type": "application/json; charset-utf-8" });
      res.end(JSON.stringify(users));
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
      } else {
        res.writeHead(404);
        return res.end("모르는 타입임");
      }
    });
  }
}

function handlePutRequest(req, res) {
  res.end("Put요청응답완료");
}
function handleDeleteRequest(req, res) {
  if (req.url === "/user") {
    let body = "";
    req.on("data", (data) => (body += data));

    return req.on("end", () => {
      if (req.headers["content-type"] === "application/json") {
        const parsedData = JSON.parse(body);
        const username = parsedData.name;
        // users[username] = "";
        delete users[username];
        return res.end(
          `application/json 삭제성공,
          users: ${JSON.stringify(users)}`
        );
      } else {
        res.writeHead(404);
        return res.end("모르는 타입임");
      }
    });
  }
}

server.listen(3000, () => {
  console.log("서버 대기중..on 3000번에서...");
});
