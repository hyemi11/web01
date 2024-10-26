class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  greet() {}
  getInCar(car) {
    console.log(`${this.name}이(가) '차'에 탔습니다`);
  }
}

class Parent extends Person {
  constructor(name, age, gender) {
    super(name, age, gender);
  }
  driveCar(familyCar) {
    console.log(
      `${this.name}이(가) 그의 ${familyCar.color}색 차량 ${familyCar.model} ${familyCar.cc}cc를 운전합니다 `
    );
  }
}
class Child extends Person {
  constructor(name, age, gender, grade) {
    super(name, age, gender);
    this.grade = grade;
  }
  playInCar() {
    console.log(
      `${this.name}이가 차에서 게임을합니다. ${this.name}이는 올해 ${this.age}살이고 ${this.grade}이 되었습니다`
    );
  }
  sing() {
    console.log(
      `${this.name}이가 차에서 노래를합니다. ${this.name}이는 올해 ${this.age}살이고 ${this.grade}이 되었습니다`
    );
  }
}

module.exports = { Person, Parent, Child };
