class Person {
    constructor(name, age, gender) { // 속성 Attribute / Properties
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet(name) { // 함수(function) = 클래스의 함수를 Method 라고 부름..
        console.log(`안녕 ${name}님, 나는 ${this.name}이고, ${this.age}살이야`);
    }
    walk(distance) {
        if (distance) { // distance 의 truty인지를 확인함..
            console.log(`${this.name}이(가) ${distance}미터를 걷고 있습니다.`);
        } else {
            console.log(`${this.name}이(가) 멍~하니 걷고 있습니다.`);
        }
    }
    eat() {
        console.log(`${this.name}이(가) 식사 중입니다.`);
    }
}

module.exports = Person;
