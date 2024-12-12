require("dotenv").config();
const axios = require("axios");

const RESTAPI_KEY = process.env.KAKAO_RESTAPI_KEY;

const url = "https://dapi.kakao.com/v2/search/image";
const headers = {
  Authorization: `KakaoAK ${RESTAPI_KEY}`,
};

const query = "아이유";

const params = {
  query: query, //필수
  sort: " recency", //옵셔널, accuracy(정확도순) 또는 recency(최신순), 기본 값 accuracy
  page: 1, //옵셔널
  size: 10, //옵셔널 //한 페이지에 검색건 수
};

//프로미즈 기반 체이닝(es6부터 도입(2015년)) 요청 방식
axios.get(url, { headers, params }).then((response) => {
  const data = response.data;
  console.log(data);
});
