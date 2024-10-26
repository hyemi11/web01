const url = require("url");

const myURL = "https://www.exampled.com/api/path?query=value";

// url 파싱
// 1. 호스트명 출력하기
// 2. 경로 출력하기
// 3. 쿼리 파라미터 출력하기

console.log(myURL.hostname);
console.log(typeof myURL);

const myURLObj = new URL(myURL);
console.log(myURLObj instanceof URL);

console.log(myURLObj.hostname);

// url 파싱 #2
const parsedURL = url.parse(myURL);
console.log(parsedURL);
console.log(parsedURL.protocol);
console.log(parsedURL.host);
console.log(parsedURL.hostname);


// 내가 경로를 조합해서 만들고 싶으면?
const myURL2 {
    protocol :'https',
    hostname :'sasac.com',
    pathname :'my/path/dir1',
    query: {
        product:'hello'}
};

const assembledURL = url.format(myURL2);
console.log('내 주소는:', assembledURL);
