// 비동기는 콜백으로 처리, 동기함수는 리턴으로 처리 //

const fs = require("fs");
const path = require("path");

const directoryPath = "./";

function checkFile(filePath) {
  //파일에 대한 정보를 가져다가, 준비가 되면?? 다를 불러줘..
  fs.stat(filePath, (err, stats) => {
    //준비가 됐을 때 처리할 로직이 들어가는 위치
    if (err) {
      console.log("정보조회실패");
      return;
    }
    if (stats.isFile()) {
      console.log(`${filePath}: 파일입니다`);
    } else if (stats.isDirectory()) {
      console.log(`${filePath}: 디렉토리입니다`);
    } else {
      console.log(`${filePath}: 모르겠습니다`);
    }
  });
}

function checkFileSync(filePath) {
  //파일에 대한 정보를 가져다가, 준비가 되면?? 다를 불러줘..  (여기서)
  //당장 파일 정보를 가져와서, 그 결과를 나에게 보고하시오..  (이걸로 코드 변경)
  const tats = fs.statSync(filePath);

  if (stats.isFile()) {
    console.log(`${filePath}: 파일입니다`);
  } else if (stats.isDirectory()) {
    console.log(`${filePath}: 디렉토리입니다`);
  } else {
    console.log(`${filePath}: 모르겠습니다`);
  }
}

fs.readdir(directoryPath, (err, files) => {
  //콜백 함수 내용으로 디렉토리 읽는게 끝났을 때 호출할 내용
  if (err) {
    console.log("읽기오류");
    return;
  }
  //console.log(files);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    console.log("파일: ", filePath);
    checkFileSync(filePath);
  });
});
