require("dotenv").config();
const axios = require("axios");

const RESTAPI_KEY = process.env.KAKAO_RESTAPI_KEY;

const url = "https://dapi.kakao.com/v2/search/web";
const headers = {
  Authorization: `KakaoAK ${RESTAPI_KEY}`,
};

const query = "아이유";

const params = {
  query: query, //필수
  sort: " recency", //옵셔널, accuracy(정확도순) 또는 recency(최신순), 기본 값 accuracy
  page: 1, //옵셔널(페이지수)
  size: 10, //옵셔널(페이지당 검색건 수)
};
const params2 = {
  query: query, //필수
  sort: " recency", //옵셔널, accuracy(정확도순) 또는 recency(최신순), 기본 값 accuracy
  size: 10, //옵셔널 //한 페이지에 검색건 수
};

// 프로미즈 기반 체이닝(es6부터 도입(2015년)) 요청 방식
// axios.get(url, { headers, params }).then((response) => {
//   const data = response.data;
//   console.log(data);
// });

// async/await (Modern JS, ES8부터 도입(ES2017?)) 요청 방식
const fetchFunction = async () => {
  //try catch 실무적으로는 꼭! 필수!
  const response = await axios.get(url, { headers, params });
  const data = response.data;
  console.log(data);
};
// fetchFunction();

//페이징 처리
const fetchFunctionPages = async (totalPages) => {
  //try catch 실무적으로는 꼭! 필수!
  try {
    for (let page = 1; page <= totalPages; page++) {
      params2.page = page;
      const response = await axios.get(url, { headers, params: params2 });
      const data = response.data;
      console.log(data);
    }
  } catch (error) {
    console.error(`에러코드${error.response?.status}, ${error.message}`);
  }
};
fetchFunctionPages(3);
