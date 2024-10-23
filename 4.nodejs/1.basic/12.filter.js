const numbers = [10, 15, 20, 25, 30];
// const aboveTwenty = numbers.filter();  <-- 안애 받을 함수가, 필터링 조건.

function aboveTwentyCondition(n) {
    if (n > 20) {
        return true;
    } else {
        return false;
    }
}

function belowTwentyCondition(n) {
    if (n < 20) {
        return true;
    } else {
        return false;
    }
}

const aboveTwenty = numbers.filter((n) => (n > 20));
    // if (n > 20) { return true; } else { return false; }
    // const result = (n > 20) ? true : false;
    // return (n > 20);
// });
console.log(aboveTwenty);

const belowTwenty = numbers.filter(n => n < 20);
console.log(belowTwenty);

// ------------------------------
const number2 = [1,2,3,4,5,6,7,8,9];
console.log(number2);

const evenNumbers = number2.filter(n => n % 2 === 0); // 짝수만 골라내기
const oddNumbers = number2.filter(n => n % 2 === 1); // 홀수만 골라내기

console.log(evenNumbers);
console.log(oddNumbers);


// 특정 문자열을 필터링
const words = ["apple", "banana", "grape", "blueberry", "avocado"];
// const containsA = words.filter(); // a라는 글자를 포함하는것 담기...
// console.log(containsA);

function containALetter(word) {
    // 이 단어를 for 문으로 길이만큼 반복하면서...
    for (let i = 0; i < word.length; i++) {
        if (word[i] === 'a') {
            return true;
        }
    }

    return false;
    // 만약(if) 그 char위치에 해당 글자 'a' 를 포함하면?? return true인 함수를 작성
}

const containsA = words.filter(word => word.endsWith('e'));
console.log(containsA);

// 객체 배열(Object를 담고 있는 Array) 에서.. 무언가 골라내고 싶음...

const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 },
    { name: "David", age: 35 },
]

const adults = people.filter(p => p.age >= 25); // 30세 이상.. >=
console.log(adults);

const people2 = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie" },
    { name: "David", age: 35 },
]

// Object 가 어떤 속성을 갖고 있는가??
const unknownAge = people2.filter(p => !p.hasOwnProperty('age')); // 나이가 없는 사람을 고르시오
console.log(unknownAge);
