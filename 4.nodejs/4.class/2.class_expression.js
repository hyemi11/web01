const Car = class { // 익명/실명, 호이스팅 X
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    drive() {
        return `${this.make} 의 ${this.model} 이 운항중입니다.`
    }
}

const myCar = new Car('현대차', 'K5');
const status2 = myCar.drive();
console.log(status2);
