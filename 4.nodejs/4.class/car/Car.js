class Car {
  constructor(brand, model, color) {
    this.brand = brand;
    this.model = model;
    this.color = color;
  }
  start() {
    console.log(`${this.brand} ${this.model}의 시동이 걸렸습니다`);
  }
  stop() {}
  drive() {}
}

class Sedan extends Car {
  constructor(brand, model, color, cc) {
    super(brand, model, color);
    this.cc = cc;
  }
  openTrunk() {}
}

class SUV extends Car {
  constructor(brand, model, color) {
    super(brand, model, color);
  }
  offRoad() {}
}

module.exports = { Car, Sedan, SUV };
