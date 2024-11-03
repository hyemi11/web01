const fs = require("fs");
const csv = require("csv-parser");
const { format } = require("date-fns");
// const { rejects } = require("assert"); //
// const { resolve } = require("path"); //절대경로 변환..

//------------------------------------"기초데이터 클래스" 정의------------------------------------------------//
// 기초 데이터는 generateData(count)에 의해 n번 호출되어 n개를 생성하게됨

class IdGenerator {
  generateId() {
    const { v4: uuidv4 } = require("uuid");
    return uuidv4();
  }
}

//orderAt 랜덤 생성하기
class OrderAtGenerator {
  constructor() {
    this.start = new Date(2024, 0, 2);
    this.end = new Date(2024, 11, 31, 23, 59, 59);
  }
  getOrderAt() {
    const randomDate = new Date(
      this.start.getTime() +
        Math.random() * this.end.getTime() -
        this.start.getTime()
    );
    return format(randomDate, "yyyy-MM-dd HH:mm:ss");
  }
}

//csv파일에 로두 데이터 랜덤으로 한개 가져오기
//선택필요 : 1)csv 파일전체 파싱 후 랜덤 선택 or 2)순차적으로 읽으면서 랜덤 선택
//2)의 경우 읽고-선택이 세트임. 선택할때마다 읽어야함(1000번을 읽어야함)
//1)의 경우 한번읽고 메모리에 다 저장해놓고 여러번 선택함. csv파일이 큰경우 메모리 부담은 크지만, 파일용량대비 실행수가 더 큰 상황같음.그리고 구현이 더 쉽기 때문에 이거로 한다!

function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    // console.log(filePath);

    fs.createReadStream(filePath)
      .pipe(csv()) //csv파일에 파이프꽂기
      .on("data", (row) => {
        rows.push(row);
        // console.log(row);
      })
      .on("end", () => {
        // const selectedCsvRow = rows[Math.floor(Math.random() * rows.length)];

        resolve(rows);
      });
  });
}
// class GetStoreId {
//   constructor(fileName) {
//     this.filePath = fileName;
//     this.storeId = readCsv(this.filePath);
//   }
//   returnStorid() {
//     return this.storeId;
//   }
// }
// class GetUserId {
//   constructor(fileName) {
//     this.userId = readCsv(this.filePath);
//   }
//   returnUserId() {
//     return this.userId;
//   }
// }
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
    this.oderAtGen = new OrderAtGenerator();
    // this.getStoreId = new GetStoreId();
    // this.getUserId = new GetUserId();
  }

  async generateData(count) {
    const storeData = await readCsv("2.store100.csv"); //type:object
    const userData = await readCsv("1.user1000.csv"); //type:object
    // console.log("storeData type은:", typeof storeData);
    // console.log("가져온 storeData:", storeData);

    const storeIds = storeData.map((item) => {
      return item.Id;
    });
    // this.storeIds = Array.from(this.storeIds);
    // console.log("item줍줍", storeIds);
    // console.log("storeIds type은:", typeof storeIds);

    const userIds = userData.map((item) => {
      return item.Id;
    });
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = this.idGen.generateId();
      const oderAt = this.oderAtGen.getOrderAt();
      const storeId = this.storeIds[Math.floor(Math.random() * this.storeIds)];
      const userId = this.userId[Math.floor(Math.random() * this.userId)];
      // const userId =
      //   this.userIds[Math.floor(Math.random() * this.userIds.length)];
      // console(userId);
      data.push([id, oderAt, storeId, userId]);
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
    for (const [id, orderAt, storedId, userId] of this.data) {
      console.log(
        `Id:${id}, OrderAt:${orderAt}, StoredId: ${storedId}, UserId:${userId}`
      );
    }
  }

  writeToCSV(data, filePath) {
    const fs = require("fs");

    const header = ["Id", "OrderAt", "StoredId", "UserId"];
    const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
    const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log("csv파일에 저장이 완료되었습니다");
  }
}

//------------------------------------ 실행 ------------------------------------------------//
async function readOrder() {
  console.time("executionTime");
  const generator = new Generator();
  const items = await generator.generateData(10000);
  const dataPrinter = new DataPrinter(items);
  dataPrinter.writeToCSV(items, "3.order3.csv");
  console.timeEnd("executionTime");
}

// dataPrinter.printConsole();
readOrder();
