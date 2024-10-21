// .reduce((이전리턴값, 현재값) => (함수연산), 초기값);

const number = [1, 2, 3, 4, 5];
const sum = number.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum);

//---------------모든 수의 곱셈-----------------//
const product = number.reduce(
  (accumulator, currentValue) => accumulator * currentValue,
  1
);
console.log(product);

//---------------저 배열에서 가장 큰 값은-----------------//
const numbers2 = [10, 5, 20, 8, 15];

const max = numbers2.reduce(
  (accumulator, currentValue) => (
    currentValue > accumulator ? currentValue : accumulator, numbers2[0]
  )
);
console.log(max);

//---------------(번외)내가 max 함수를 구현 한다면-----------------//
function my_max(numbers) {
  let max = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

const numbers3 = [10, 5, 27, 8, 15, -40];
console.log(my_max(numbers3));
