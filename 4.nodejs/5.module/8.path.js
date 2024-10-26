const path = require("path");

const filePath = path.join("path를 넣으면댐", "패스여러개도가능", "파일명");
console.log("파일경로: ", filePath);

const extName = path.extname(filePath);
console.log("파일의 확장자: ", extName);

const direName = path.dirname(filePath);
console.log("디렉토리명: ", direName);

const fileName = path.basename(filePath);
console.log("파일명: ", fileName);

// nodejs의 내장함수인 Path를 불러와서
// 파일경로, 확장자, 폴더명, 파일명을 가져오는 등의 파일패스 관련 함수들을 사용할 수 있다
