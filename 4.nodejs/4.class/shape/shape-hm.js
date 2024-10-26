class Shape {
  constructor(type) {
    this.type = type;
  }
  getArea() {
    throw new Error("getArea() must be implement by a subclass");
  }
  getInfo() {
    return `${this.type}
- 넓이 : ${this.getArea()}(m2)
- 사이즈 : ${this.width} x ${this.height}
- 반지름 : ${this.radius}`;
  }
}

class Square extends Shape {
  constructor(width, height) {
    super("Square");
    this.width = width;
    this.height = height;
  }
  getArea() {
    return (this.width * this.height).toFixed(2);
  }
  toString() {
    return `이 Square의 면적은 ${this.getArea()}(m2) 이고, 사이즈는 ${
      this.width
    }x${this.height}입니다`;
  }
}

class Triangle extends Shape {
  constructor(width, height) {
    super("Triangle");
    this.width = width;
    this.height = height;
  }
  getArea() {
    return (this.width * this.height * 0.5).toFixed(2);
  }
  toString() {
    return `이 Triangle의 면적은 ${this.getArea()}(m2) 이고, 사이즈는 ${
      this.width
    }x${this.height}입니다`;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }
  getArea() {
    return (Math.PI * this.radius ** 2).toFixed(2);
  }
  toString() {
    return `이 Circle의 면적은 ${this.getArea()}(m2) 이고, 반지름은 ${
      this.radius
    }입니다`;
  }
}
class Trapezium extends Shape {
  constructor(width, width2, height) {
    super("Trapezium");
    this.width = width;
    this.width2 = width2;
    this.height = height;
  }
  getArea() {
    return ((this.width + this.width2) * this.height * 0.5).toFixed(2);
  }
  toString() {
    return `이 Trapezium 의 면적 ${this.getArea()}(m2) 이고, 사이즈는 ${
      this.width
    }x${this.width2}x${this.height}입니다`;
  }
}

const square = new Square(5, 2);
const triangle = new Triangle(4, 3);
const trapezium = new Trapezium(4, 6, 5);
const circle = new Circle(3);

console.log(trapezium.getInfo());
console.log(trapezium.toString());

// 1 공통함수를 어디에 넣을것인가?
// 2. 개별모양마다 필수로 가져가야하는 요소는?
//    constructor 안에 포함되어서 this. xxxx속성으로 저장되어야 함(객체안에)

// 미션1. 넓이 구하기 함수추가 (getArea())
// 미션2. 객체들의 정보 출력 (getInfo())
//   - 나는 어떤 도형인가
//   - 나는 어떤 속성을 갖고 있는가?
// 미션3. 이 객체를 출력해서 원하는 스트링 얻기

// => 해결과제 : 사이즈 속성 다른거 수퍼클래스에서 맞춤으로 출력하기.. (써글은 반지름, 트라페지움은 위쓰값 2개..)
