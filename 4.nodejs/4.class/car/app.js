const { Car, Sedan, SUV } = require("./Car.js");
const { Person, Parent, Child } = require("./Person.js");

const dad = new Parent("철수", 45, "남성");
const daughter = new Child("지연", 10, "여성", "4학년");
const son = new Child("민수", 8, "남성", "2학년");

const familyCar = new Sedan("현대", "그랜저", "검정", 3000);

familyCar.start();
// dad.getInCar(familyCar);
