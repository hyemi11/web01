class NameGenerator {
  constructor() {
    this.lastNames = ["박", "김", "이", "조"];
    this.firstNames = ["John", "Jane", "Michael", "Emily", "William", "Olivia"];
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

class MyUtility {
  static getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

class BirthDateGenerator {
  generateBirthDate() {
    const year = MyUtility.getRandomInRange(1960, 2010);
    const month = MyUtility.getRandomInRange(1, 12);
    const day = MyUtility.getRandomInRange(1, 28);

    return `${year}-${month}-${day}`;
  }
}

class AddressGenerator {
  constructor() {
    this.cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Philadelphia",
    ];
  }
  generateAddress() {
    const street = MyUtility.getRandomInRange(1, 100);
    const city = this.cities[Math.floor(Math.random() * this.cities.length)];
    return `${street} ${city}`;
  }
}

class UserGenerator {
  constructor() {
    this.nameGen = new NameGenerator();
    this.birthGen = new BirthDateGenerator();
    this.genderGen = new GenderGenerator();
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const name = this.nameGen.generateName();
      const birthDate = this.birthGen.generateBirthDate();
      const gender = this.genderGen.generateGender();
      const address = this.addressGen.generateAddress();
      data.push([name, birthDate, gender, address]);
    }
    return data;
  }
}
// 좋지 않은 설계 예시
// class DataPrinter extends UserGenerator{
//   printData(count) {
//     const data = this.generateData(count);
//     for (const [name, birthDate, gender, address] of data) {
//       console.log(`이름: ${name}, 생년월일:${birthDate}, 성별: ${gender}, 주소${address}`)
//     }
//   }
// }

class DataPrinter {
  constructor(data) {
    this.data = data; // 의존성..의존성 삽입
  }

  printConsole() {
    for (const [name, birthDate, gender, address] of this.data) {
      console.log(
        `이름: ${name}, 생년월일:${birthDate}, 성별: ${gender}, 주소${address}`
      );
    }
  }

  writeToHTML() {
    console.log("HTML파일에 저장이 완료되었습니다");
  }

  writeToCSV(data, filePath) {
    const fs = require("fs");

    const header = ["Name", "Gender", "BirthDate", "Address"];
    const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
    const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log("csv파일에 저장이 완료되었습니다");
  }
}

const userGenerator = new UserGenerator();
const users = userGenerator.generateData(10);

const dataPrinter = new DataPrinter(users);
dataPrinter.printConsole();
dataPrinter.writeToHTML();
dataPrinter.writeToCSV(users, "user2.csv");
