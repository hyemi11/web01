const number = [10, 15, 20, 25, 30];
//--------20이상 이하 골라내기-----------------//

// function above20condition(n) {
//     if (n > 20) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function below20condition(n) {
//     if (n < 20) {
//         return true;
//     } else {
//         return false;
//     }
// }

// const above20 = number.filter(above20condition);
// console.log(above20);
// const below20 = number.filter(below20condition);
// console.log(below20);

//--------20이상 이하 골라내기 함수 줄이기-----------------//
const above20 = number.filter((n) => n > 20);
// return (n < 20) ? true : false;
// return (n < 20);
console.log(above20);

const below20 = number.filter((n) => n < 20);
console.log(below20);

//-----------짝 호수 골라내기--------------//
const number2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evenNumbers = number2.filter((apple) => apple % 2 === 0); //짝수만 골라내
const oddNumbers = number2.filter((n) => n % 2 === 1); //홀수만 골라내
console.log(evenNumbers);
console.log(oddNumbers);

//----------특정 문자열을 필터링--------------//
const words = ["apple", "banana", "grape", "blueberry", "avocado"];

function containAletter(word) {
  //이 단어를 for문로 길이만큼 반복하면서
  // 만약 그 캐릭터 위치에 해당 글자 'a'를 포함하면? return true

  for (i = 0; i < word.length; i++) {
    if (word[i] === "a") {
      return true;
    }
  }
  return false;
}
const containsA = words.filter((word) => containAletter(word));
// const containsA = words.filter((word) => word.includes("a"));
// const containsA = words.filter((word) => word.endswith("e"));
console.log(containsA);

//----------특정 문자열을 필터링--------------//
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 },
  { name: "David", age: 35 },
];

const adults = people.filter((p) => p.age >= 30); //30세 이상 골라내기
console.log(adults);

//----------나이가 없는 사람을 필터링--------------//
const people2 = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie" },
  { name: "David", age: 35 },
];

const unknownAge = people2.filter((p) => !p.hasOwnProperty("age"));
console.log(unknownAge);
