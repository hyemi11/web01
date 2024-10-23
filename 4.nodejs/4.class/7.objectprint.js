class Car {
    constructor(name) {
        this.name = name;
    }

    toString() {  // Object 클래스의 기본 속성을 오버라이딩 하였음..
        return `[${typeof this} Object]`
    }
}

const myCar = new Car('Morning');
const myCar2 = new Car('Tesla');

// 객체를 출력하시오.. 객체안의 구조와 속성이 다 나옴.. 객체를 그대로 출력함.
console.log(myCar);
console.log("내 차는: " + myCar); // 문자열로 변환됨, 왜?? 문자랑 덧셈을 시켜서...
console.log("내 차는: ", myCar, 1, 2, "hello"); // raw 값을 출력 시킨것
console.log(`내 차는: ${myCar}`); // 문자열로 변환시킨것...


