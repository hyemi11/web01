const http = require("http");
const fs = require("fs").promises;
const { rejects } = require("assert");
const { resolve } = require("path");
const path = require("path");
// const parse = require('querystring').parse;
const { parse } = require("querystring"); //객체 디스트럭처링(위에 문법을 줄인것)

const server = http.createServer(async (req, res) => {
  //만약 사용자가 /를 요청하면 index.html를 전달하고,
  //만약 사종자가 /about을 요청하면 about.html을 전달하고,
  //만약 사용자가 나머지를 요청하면?! 우리는 없다고 반납을 해야함 (404 Not Found)를 반납하면됨.
  //힌트 : req.ur을 비교

  console.log(req.method, req.url); //이거 출력해놓고 시작

  try {
    // /image 폴더를 요청하면, 우리는 static 폴더안에 있는 그 파일을 전달해주는걸로..

    if (req.method === "GET") {
      if (req.url === "/") {
        const data = await fs.readFile("./index.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } else if (req.url === "/about") {
        const data = await fs.readFile("./about.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } else if (req.url.startsWith("/image/")) {
        // 1. url 뒤에 있는 글자를 잘라서,
        // 2. 파일명을 가져와서,
        // 3. 우리의 이미지 디렉토리인 static / 뒤에 위 파일명을 붙여서
        // 4. 그 내용을 전달한다.
        console.log(`이미지파일명 추출은? ${req.url}`);
        // console.log(`파일명: ${req.url.split('/image/')[0]}, ${req.url.split('/image')[1]}`)
        const imageName = path.basename(req.url);
        const imagePath = path.join("static", imageName);

        console.log(`이미지 경로: ${imagePath}`);
        const imageData = await fs.readFile(imagePath);
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(imageData);
      } else {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("Not Found");
      }
    } else if (req.method === "POST") {
      if (req.url === "/user") {
        let body = "";

        req.on("data", (data) => {
          body += data;
          console.log(`데이터가 받아지는 동안의 chunk: ${body}`);
        });

        req.on("end"),
          () => {
            console.log(`데이터가 다 받아진 후: ${body}`);
          };
      }
    } else {
      //GET도 아니고 POST도 아니면?
      res.writeHead(404, {});
      res.end("Not Found");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      "파일 읽는 도중 오류 발생: 내부에 알수없는 오류가 발생했습니다. 관리자에게 문의하세요"
    );
  }
});

server.listen(3000, () => {
  console.log("서버 대기중..on 3000번에서...");
});

// -x 메소드(GET / POST)
//   - x 메소드(GET / POST / DELETE / PUT)
//  = CRUD

//   - H : 헤더데이터를 보낸다
//   - H : "Content-type: text/html/image/jpe 등등"
//  - d : 데이터를 정의하는곳. name이라는 key에 aaa라는 value
