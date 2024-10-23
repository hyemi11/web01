class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  greet() {
    console.log(`안녕, 나는 ${this.name}이고, ${this.age}살이야`);
  }
  walk() {
    console.log(`${this.name}이(가) 걷고 있습니다`);
  }
  eat() {
    console.log(`${this.name}이(가) 먹고 있습니다`);
  }
}

const person1 = new Person("철수", 25, "남성");
person1.greet();
person1.walk();
person1.eat();

class Employee extends Person {
  constructor(name, age, gender, jobTitle, salary) {
    super(name, age, gender);
    this.jobTitle = jobTitle;
    this.salary = salary;
  }
  displayInfo() {
    console.log(
      `직원 ${this.name}의 직위는 ${this.jobTitle}이며, 급여는 ${this.salary}원 입니다.`
    );
  }
  work() {
    console.log(`${this.name}이 업무 중입니다.`);
  }
}

const employee1 = new Employee("영희", 30, "여성", "매니저", 50000);
employee1.greet();
employee1.displayInfo();
employee1.walk();
employee1.work();

console.log("직원1이 직원객체인가?", employee1 instanceof Employee); //true
console.log("직원1이 사람객체인가?", employee1 instanceof Person); //true

console.log("사람1이 직원객체인가?", person1 instanceof Employee); //false
console.log("사람1이 사람객체인가?", person1 instanceof Person); //true

console.log("직원1 이라는 변수타입은?", typeof employee1); //object
console.log("사람1 이라는 변수타입은?", typeof person1); //object

class Manager extends Employee {
  constructor(name, age, gender, jobTitle, salary, team) {
    super(name, age, gender, jobTitle, salary);
    this.team = team;
  }
  assignTask() {
    console.log(`${this.name}매니저가 ${this.team}에 업무를 배분하고 있다`);
  }
}
const manager1 = new Manager("수현", 35, "남성", "팀장", 300000, "개발");
manager1.assignTask();

//---------------------------------------------------------------------

class Customer extends Person {
  constructor(name, age, gender, customerId, orderHistory) {
    super(name, age, gender);
    this.customerId = customerId;
    this.orderHistory = orderHistory;
  }

  placeOrder(product) {
    console.log(`${this.name}고객이 ${product}를 주문했습니다`);
    this.orderHistory.push(product);
  }

  orderedHistory1() {
    console.log(`${this.name}고객의 주문내역은 ${this.orderHistory} 입니다`);
  }

  orderedHistory2() {
    this.orderHistory.forEach((orderItem) => {
      console.log(`<li>${orderItem}</li>`);
    });
  }

  orderedHistory3() {
    this.console.log(`주문내역: ${this.orderHistory.join("<BR>")}`);
  }
}

const customer1 = new Customer("지민", 22, "여성", "C1001", ["커피", "라떼"]);
customer1.placeOrder("생크림케익");
customer1.orderedHistory1(); //이 사람이 지금까지 주문한 내역을 모두 출력하시오(함수호출)
customer1.orderedHistory2(); //이 사람이 지금까지 주문한 내역을 모두 출력하시오(함수호출)
// customer1.orderedHistory3(); //이 사람이 지금까지 주문한 내역을 모두 출력하시오(함수호출) //함수오류있음//
console.log(
  `${customer1.name}고객의 주문내역은 ${customer1.orderHistory} 입니다`
); //이 사람이 지금까지 주문한 내역을 모두 출력하시오(개체호출로 하라고?.. ㅇㅇ 개체로 호출해봄 )

console.log("---------------------------");
console.log("---------------------------".repeat(3));

const people = [manager1, customer1, employee1];
introduce(people);

function introduce(people) {
  for (const person of people) {
    //포문임.
    person.greet("철수");
  }
}
