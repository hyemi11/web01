//------------미션-----------//

//add(+), subtract(-), multiply(*), division(/)
//4개의 함수를, 일반함수로 짜보고, 화살표함수로 짜보기

//일반함수//
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a % b;
}

console.log(add(1, 2));
console.log(sub(1, 2));
console.log(mul(1, 2));
console.log(div(1, 2));

//화살표함수//
const addArrow = (a, b) => a + b;
const subArrow = (a, b) => a / b;
const mulArrow = (a, b) => a * b;
const divArrow = (a, b) => a % b;

console.log(addArrow(1, 2));
console.log(subArrow(1, 2));
console.log(mulArrow(1, 2));
console.log(divArrow(1, 2));
