//---------------1부터 100까지 합산을 반납-----------------//

// function sumTo100() {
//   let result = 0;
//   for (i = 1; i <= 100; i++) {
//     result += i;
//   }
//   return result;
// }

// function sumTo100_2() {
//   let sum = 0;
//   let num = 1;

//   while (num <= 100) {
//     sum = sum + num;
//     num++;
//   }
//   return sum;
// }

function sumTo100_3(n) {
  //가우스공식 사용
  let sum = (n * (n + 1)) / 2;
  return sum;
}

// console.log(sumTo100());
// console.log(sumTo100_2());
console.log(sumTo100_3(100));
