// 이 함수 구현을 필수화 하기 위해서.. 다른 언어의 abstract class처럼 만들기. node.js에서는 이 추상클래스가 없음.. (사실 객체지향에서 출발한게 아니라서..)
// 그래서 에러를 던져서 강제화 하여 추상클래스 사용 특징을 녹이는거임.
class Shape {
  constructor(type) {
    this.type = type;
  }
  getArea() {
    throw new Error("getArea() must be implement by a subclass");
  }
  toString() {
    return `${this.type} -  넓이 : ${this.getArea().toFixed()}m2`;
  }
}

class Square extends Shape {
  constructor(sideLength) {
    super("Square");
    this.Length = sideLength;
  }
  getArea() {
    return this.Length ** 2;
  }
  getInfo() {
    return `Square는 길이 ${this.Length}를 갖고 있습니다. `;
  }
}
class Triangle extends Shape {
  constructor(base, height) {
    super("Triangle");
    this.base = base;
    this.height = height;
  }
  getArea() {
    return this.base * this.height * 0.5;
  }
  getInfo() {
    return `Triangle은 밑변 ${this.base}, 높이 ${this.height}를 갖고 있습니다. `;
  }
}
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Trapezium extends Shape {
  constructor(base1, base2, height) {
    super();
    this.base1 = base1;
    this.base2 = base2;
    this.height = height;
  }
  getArea() {
    return (this.base1 + this.base2) * this.height * 0.5;
  }

  getInfo() {
    return `Trapezium은 `;
  }
}

const square = new Square(5);
const triangle = new Triangle(4, 3);
const trapezium = new Trapezium(4, 6, 5);
const circle = new Circle(3);

console.log(Square()); //출력 25
console.log("Triangle Area:", triangle.getArea()); //출력 6
console.log("Trapezium Area:", trapezium.getArea()); //출력 25
console.log("circle Area:", circle.getArea().toFixed(2)); //출력 28.27

// 1 공통함수를 어디에 넣을것인가?
// 2. 개별모양마다 필수로 가져가야하는 요소는?
//    constructor 안에 포함되어서 this. xxxx속성으로 저장되어야 함(객체안에)

// 미션1. 넓이 구하기 함수추가 (getArea())
// 미션2. 객체들의 정보 출력 (getInfo())
//   - 나는 어떤 도형인가
//   - 나는 어떤 속성을 갖고 있는가?
// 미션3. 이 객체를 출력해서 원하는 스트링 얻기
