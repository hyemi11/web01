//------------------------------------"기초데이터 클래스" 정의------------------------------------------------//

class IdGenerator {
  generateId() {
    const { v4: uuidv4 } = require("uuid");
    return uuidv4();
  }
}

//지점별로 중복없이 생성하고싶다..(나중에...)
// + 주소별로 지점 생성은....?? (나중에...)
class NameGenerator {
  constructor() {
    this.local = [
      "홍대",
      "신촌",
      "신천",
      "잠실",
      "강남",
      "둔촌",
      "올림픽공원",
      "종로",
      "팔당",
      "마포",
    ];
    // this.local2 = ["1호점","2호점", "3호점", "4호점", "5호점"]
  }
  generateName(type) {
    const name = type;

    return (
      name +
      " " +
      this.local[Math.floor(Math.random()) * this.local.length] +
      MyUtility.getRandomInRange(1, 10) +
      "호점"
    );
  }
}

class TypeGenerator {
  constructor() {
    this.type = ["스타벅스", "이디야", "할리스", "투썸플레이스", "커피빈"];
  }

  generateType() {
    return this.type[Math.floor(Math.random() * this.type.length)];
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
    this.typeGen = new TypeGenerator();
    this.nameGen = new NameGenerator();
    this.addressGen = new AddressGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.idGen.generateId();
      const type = this.typeGen.generateType();
      const name = this.nameGen.generateName(type);
      const address = this.addressGen.generateAddress();
      data.push([id, name, type, address]);
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
    for (const [id, name, type, address] of this.data) {
      console.log(`Id:${id}, Name:${name}, Type:${type}, Address:${address}`);
    }
  }

  writeToCSV(data, filePath) {
    const fs = require("fs");

    const header = ["Id", "Name", "Type", "Address"];
    const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
    const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log("csv파일에 저장이 완료되었습니다");
  }
}

//------------------------------------ 실행 ------------------------------------------------//
const generator = new Generator();
const stores = generator.generateData(100);
const dataPrinter = new DataPrinter(stores);
dataPrinter.printConsole();
dataPrinter.writeToCSV(stores, "2.store100.csv");
