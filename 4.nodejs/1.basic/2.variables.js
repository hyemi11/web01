// 1. 숫자형 변수
let a = 10;
// 부동소수점
let pi = 3.14;

let sum = a + pi;
console.log(sum);

// 상수 = 변경할수 없음
const gravity = 9.81;
// gravity = 10;

console.log('오류난이후');

// 불린언(boolean) 
let isLogged = false;

if (isLogged) {
    console.log('사용자가 로그인 하였습니다');
} else {
    console.log('로그인이 필요합니다');
}

// 변수의 scope
var globalA = 10; // FE 에서 변수를 어디서나 쉽게 선언해서 쓸려고... 
let globalB = 20; // BE 에서의 글로벌 변수...

function myfunction() {
    let localC = 30; // 로컬 변수
    console.log(`글로벌A: ${globalA}, 글로벌B: ${globalB}, 글로벌C: ${localC}`)
















    // globalA = "50";


}

myfunction();

globalA = globalA + 20;

console.log(`글로벌A: ${globalA}, 글로벌B: ${globalB}`);
// console.log(`글로벌A: ${globalA}, 글로벌B: ${globalB}, 글로벌C: ${localC}`)
// localC 는 존재하지 않음...
