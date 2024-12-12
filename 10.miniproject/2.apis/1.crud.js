const fetch = require("node-fetch");
const axios = require("./node_modules/axios/index.d.cts");
// import fetch from "node-fetch";   //최신문법 : 파일 확장자가 mjs가 되어야하고 패키지.json에 "type": "module" 추가해줘야함
// import axios from 'axios';

async function fetchexample() {
  try {
    const response = await fetch("http://jsonplaceholder.typicode.com/posts/1");
    if (!response.ok) {
      console.log("에러");
      return;
    }
    const data = await response.json();
    console.log("fetch데이터: ", data);
  } catch (error) {
    console.log("fetch통신오류");
  }
}

async function axiosexample() {
  try {
    const response = await axios.get(
      "http://jsonplaceholder.typicode.com/posts/1"
    );
    console.log("axios 응답코드: ", response.status);
    console.log("axios 데이터: ", response.data);
  } catch (error) {
    console.log("axios 통신오류");
  }
}

// 동기화처리함. 대신 패치->엑시오스 순서대로 시작 종로하기때문에, 전체 실행시간을 늘어남
(async () => {
  await fetchexample();
  await axiosexample();
})();
