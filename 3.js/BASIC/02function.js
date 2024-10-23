function greet(name) {
  console.log("Hello " + name);
}
greet("t");
greet("a");
greet("U");

function add(a, b) {
  return a + b;
}

let s = add(2, 3);
console.log(s);
console.log(add(5, 10));

//변수에 함수를 담은 형태 (이름없이 익명함수로 담음)
let sum2 = function (a, b) {
  return a + b;
};

//그럼 변수가 함수로서의 역할을 한다..
console.log(sum2(2, 3));

// 변수에 함수를 담는데, function이라는 불필요한 키워드를 없애기 위해서 생겨난게, 화살표 함수.
let sum3 = (a, b) => {
  return a + b;
};
console.log(sum3(3, 4));

// 더 간소화됨 (화살표 함수의 변천사, 이게 최종)
let sum4 = (a, b) => a + b;
console.log(sum3(4, 5));

//------------미션-----------//

//add(+), aubtract(-), multiply(*), division(/)
//4개의 함수를, 일반함수로 짜보고, 화살표함수로 짜보기

function add() {}
