class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  greet() {}
  getInCar(car) {}
}

class Parent extends Person {
  constructor(name, age, gender) {
    super(name, age, gender);
  }
  driveCar() {}
}
class Child extends Person {
  constructor(name, age, gender, grade) {
    super(name, age, gender);
    this.grade = grade;
  }
  playInCar() {}
  sing() {}
}

module.exports = { Person, Parent, Child };
