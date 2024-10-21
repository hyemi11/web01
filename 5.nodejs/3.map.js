//-----------제곱, 거듭제곱--------------//

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const doubled = numbers.map((n) => n * 2);
console.log(doubled);
const squared = numbers.map((n) => n * n);
console.log(squared);
//-----------이름만골라내기, 나이만 골라내기--------------//

const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 },
  { name: "David", age: 35 },
];

const names = people.map((p) => p.name);
console.log(names);

const ages = people.map((p) => p.age);
console.log(ages);

//-----------좌우를 <li>태그로 감싸기</li>--------------//
const fruits = ["apple", "banana", "grape", "blueberry", "avocado"];
const htmlTags = fruits.map((f) => `<li>${f}</li>`);
console.log(htmlTags);

//-----------각각 객체의 full name 만들기--------------//
const apiData = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 1, firstName: "John", lastName: "Doe" },
];
const fullName = apiData.map((user) => `${user.firstName} ${user.lastName}`);
console.log(fullName);
