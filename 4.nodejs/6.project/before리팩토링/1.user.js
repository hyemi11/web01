//------------------------------------"기초데이터 클래스" 정의------------------------------------------------//

class IdGenerator {
  generateId() {
    const { v4: uuidv4 } = require("uuid");
    return uuidv4();
  }
}

class NameGenerator {
  constructor() {
    this.firstNames = [
      "박",
      "김",
      "이",
      "조",
      "강",
      "최",
      "서",
      "장",
      "윤",
      "유",
      "홍",
      "조",
      "신",
      "염",
    ];
    this.lastNames = [
      "가람",
      "가온",
      "가우",
      "가을",
      "강은",
      "겨레",
      "겨울",
      "경민",
      "경빈",
      "경윤",
      "경연",
      "경원",
      "경주",
      "경진",
      "규람",
      "규민",
      "규은",
      "규빈",
      "규진",
      "규연",
      "규영",
      "규원",
      "규인",
      "규정",
      "근출",
      "금선",
      "기연",
      "기영",
      "기은",
      "나오",
      "노아",
      "노을",
      "누리",
      "다민",
      "다빈",
      "다온",
      "다원",
      "다운",
      "다율",
      "다현",
      "도연",
      "도영",
      "두리",
      "리안",
      "라온",
      "로운",
      "루다",
      "마음",
      "믿음",
      "명진",
      "미루",
      "미르",
      "미오",
      "미준",
      "민서",
      "민수",
      "민영",
      "민재",
      "민주",
      "바다",
      "보경",
      "보영",
      "보현",
      "사이",
      "상은",
      "상희",
      "서우",
      "서원",
      "서율",
      "서빈",
      "서진",
      "서현",
      "석희",
      "선우",
      "선진",
      "성경",
      "성민",
      "성연",
      "성원",
      "성은",
      "성주",
      "성지",
      "성희",
      "성화",
      "세빈",
      "세영",
      "세윤",
      "세원",
      "세진",
      "세현",
      "시경",
      "시언",
      "솔민",
      "수민",
      "수빈",
      "수인",
      "연수",
      "연재",
      "은재",
      "유진",
      "재경",
      "주연",
      "미셸",
      "에밀리",
      "윌리엄",
      "올리비아",
    ];
  }

  generateName() {
    return (
      this.firstNames[Math.floor(Math.random() * this.firstNames.length)] +
      this.lastNames[Math.floor(Math.random() * this.lastNames.length)]
    );
  }
}

class GenderGenerator {
  generateGender() {
    return Math.random() < 0.5 ? "남성" : "여성";
  }
}

class BirthDateGenerator {
  generateBirthDate() {
    const year = MyUtility.getRandomInRange(1960, 2010);
    const month = String(MyUtility.getRandomInRange(1, 12)).padStart(2, "0");
    const day = String(MyUtility.getRandomInRange(1, 28)).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}

class AgeGenerator {
  getAge(birthDate) {
    const b_year = parseInt(birthDate.slice(0, 4), 10); //슬라이스쓴건 스트링반환, 연산을 위해 형변환함(10은 10진수)
    const b_month = parseInt(birthDate.slice(5, 7), 10);
    const b_day = parseInt(birthDate.slice(8, 10), 10);

    const c_year = new Date().getFullYear(); //얘네는 정수반환
    const c_month = new Date().getMonth() + 1; //getMonth()는 0부터 시작
    const c_day = new Date().getDay();

    // 91.1.3 - 90.5.4 => 0살
    // 91.5.3 - 90.5.4 => 0살
    // 91.5.4 - 90.5.4 => 1살
    // age <= c.year - 생년
    // age =-1 <=  c.month > 생월 || c.month = 생얼 & c.day >= 생일 (생일이 안지났으면 -1)

    let age = c_year - b_year; // -연산이라 자동형변환되긴함
    const checkDay =
      c_month > b_month || (c_month == b_month && c_day >= b_day); //return boolean
    if (checkDay == true) {
      age--;
    }
    return age;
  }
}

class AddressGenerator {
  constructor() {
    this.cities = ["서울", "인천", "부산", "대구", "광주"];
    this.gu = ["일구", "이구", "삼구", "사구", "오구"];
  }
  generateAddress() {
    const street1 = MyUtility.getRandomInRange(1, 100);
    const street2 = MyUtility.getRandomInRange(1, 100);
    const city =
      this.cities[Math.floor(Math.random() * this.cities.length)] +
      " " +
      this.gu[Math.floor(Math.random() * this.gu.length)];
    return `${city} ${street1}길 ${street2}`;
  }
}

//------------------------------------"유틸리티 클래스" 정의------------------------------------------------//
class MyUtility {
  static getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

//------------------------------------"dataGenerator 클래스" "dataPrinter 클래스" 정의------------------------------------------------//
class Generator {
  constructor() {
    this.idGen = new IdGenerator();
    this.nameGen = new NameGenerator();
    this.genderGen = new GenderGenerator();
    this.birthGen = new BirthDateGenerator();
    this.ageGen = new AgeGenerator();
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.idGen.generateId();
      const name = this.nameGen.generateName();
      const gender = this.genderGen.generateGender();
      const birthDate = this.birthGen.generateBirthDate();
      const age = this.ageGen.getAge(birthDate);
      const address = this.addressGen.generateAddress();
      data.push([id, name, gender, age, birthDate, address]);
    }
    return data;
  }
}

class DataPrinter {
  constructor(data) {
    this.data = data; // 의존성..의존성 삽입
    // console.log(data);
  }

  printConsole() {
    for (const [id, name, gender, age, birthDate, address] of this.data) {
      console.log(
        `Id:${id}, Name:${name}, Gender:${gender}, Age:${age}, BirthDate:${birthDate}, Address:${address}`
      );
    }
  }

  writeToHTML() {
    console.log("HTML파일에 저장이 완료되었습니다");
  }

  writeToCSV(data, filePath) {
    const fs = require("fs");

    const header = ["Id", "Name", "Gender", "Age", "BirthDate", "Address"];
    const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
    const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log("csv파일에 저장이 완료되었습니다");
  }
}

//------------------------------------ 실행 ------------------------------------------------//
const generator = new Generator();
const users = generator.generateData(1000);
const dataPrinter = new DataPrinter(users);
// dataPrinter.printConsole();
// dataPrinter.writeToHTML();
dataPrinter.writeToCSV(users, "1.user1000.csv");
