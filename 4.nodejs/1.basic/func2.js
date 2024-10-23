//---------------입력값을 인자로 받아서 처리하기-----------------//

// function sumToN(max) {
//   let sum = 0;
//   for (let num = 1; num <= max; num++) {
//     sum += num;
//   }
//   return sum;
// }

// function sumToN2(num) {
//   let n = 1;
//   let sum = 0;
//   while (n <= num) {
//     sum += n;
//     n++;
//   }
//   return sum;
// }

function sumToN3(num) {
  //가우스공식 사용
  let sum = (num * (num + 1)) / 2;
  return sum;
}

console.time("gauss");
console.log(sumToN3(100));
console.time("gauss");
