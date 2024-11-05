const fs = require("fs");
const csv = require("csv-parser");
const { format } = require("date-fns");
const { MyUtility, generateId } = require("./Utility.js");

//------------------------------------generate속성데이터------------------------------------------------//

//orderAt 랜덤 생성하기 : 타임스템프로 치환하여 24년안에서 랜덤 추출하고 포켓팅함수로 포멧팅//
//Date()로 2024시작과 끝을 생성 + gettime()으로 타임스템프로 변환하기
//범위내랜덤숫자얻어오기
//format()로 포멧팅
class OrderAtGenerator {
  constructor() {
    this.start = new Date(2024, 0, 2).getTime();
    this.end = new Date(2024, 11, 31, 23, 59, 59).getTime();
    // console.log("this.start:", this.start);
    // console.log("this.start:", this.end);
  }
  getOrderAt() {
    const randomDate = MyUtility.getRandomInRange(this.end, this.start);
    return format(randomDate, "yyyy-MM-dd HH:mm:ss");
  }
  // getOrderAt() {
  //   const randomDate = new Date(
  //     this.start.getTime() +
  //       Math.random() * (this.end.getTime() - this.start.getTime())
  //   );
  //   return format(randomDate, "yyyy-MM-dd HH:mm:ss");
  // }
}

//csv파일에서 id데이터 랜덤으로 가져오기
//실행순서 : run -> Generator 클래스 생성 new GetStoreId  펑션호출 -> ( csv파일 1번 2번 파일 저장 -> 컬럼추출 -> 배열생성) -> 아이템별 랜덤 추출 호출 1000번//

//csv파일을 스트림으로 읽어와서 로우단위로 저장(오브젝트형태로 저장됨)//
//csv파일이 우선 완전히 저장되고 다음 프로세스가 진행되어야하기 때문에,
//promise함수로 지정하여 resolve로 저장된 데이터를 반환(이 함수를 호출하는 함수는 동기처리(async - await))
function readCsv(filePath) {
  // console.log("readCsv()가 받은 파일패스 확인;", filePath);
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      });
  });
}

//csv파일 불러와서 id 랜덤 리턴시키기
// 1-1)csv스트림함수실행 하여 데이터받아오기, 1-2)id컬럼추출하여(map함수) 배열에 저장하기
// 2-1)id배열중에서 랜덤으로 id 리턴시키기
class GetStoreId {
  constructor(filePath) {
    this.filePath = filePath;
    this.extractedCsv = []; //csv 데이터 저장용
    this.ids = []; //csv id 저장용
  }
  async getStoreId() {
    this.extractedCsv = await readCsv(this.filePath); //생성과 함께 1차 수행
    this.ids = this.extractedCsv.map((column) => {
      return column.Id; //csv파일 완전히 받아온 후 컬럼만 저장
    });
    // console.log("extractedCsv type확인: ", typeof this.extractedCsv);
    // console.log("extractedCsv : ", this.extractedCsv);
    // console.log("ids type확인: ", typeof this.ids);
    // console.log("map함수작동확인 : ", this.ids);
  }
  rndStoreId() {
    const randomId = MyUtility.getRandomInArray(this.ids);
    // console.log("랜덤으로선택된스토어id:", randomId);
    return randomId;
  }
}

class GetUserId {
  constructor(filePath) {
    this.filePath = filePath;
    this.extractedCsv = [];
    this.ids = [];
  }
  async getUserId() {
    this.extractedCsv = await readCsv(this.filePath);
    this.ids = this.extractedCsv.map((column) => column.Id);
  }

  rndUserId() {
    const randomId = MyUtility.getRandomInArray(this.ids);
    return randomId;
  }
}

//------------------------------------data Generator------------------------------------------------//
class Generator {
  constructor() {
    this.oderAtGen = new OrderAtGenerator();
    this.getStoreId = new GetStoreId("store.csv");
    this.getUserId = new GetUserId("user.csv");
  }

  async generateData(count) {
    await this.getStoreId.getStoreId(); //클래스 생성과 함께 실행하는것처럼 구현.
    await this.getUserId.getUserId();

    const data = [];
    for (let i = 0; i < count; i++) {
      const id = generateId();
      const oderAt = this.oderAtGen.getOrderAt();
      const storeId = await this.getStoreId.rndStoreId();
      const userId = await this.getUserId.rndUserId();
      // console.log("포문통해가져온 userId:", userId);
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
    for (const [id, orderAt, storeId, userId] of this.data) {
      console.log(
        `Id:${id}, OrderAt:${orderAt}, StoreId: ${storeId}, UserId: ${userId}`
      );
    }
  }

  writeToCSV(data, filePath) {
    const fs = require("fs");
    const header = ["Id", "OrderAt", "StoreId", "UserId"];
    const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
    const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log(`${filePath}파일 저장이 완료되었습니다`);
  }
}

//------------------------------------ 실행 ------------------------------------------------//
async function run() {
  const generator = new Generator();
  const orders = await generator.generateData(10000);
  const dataPrinter = new DataPrinter(orders);
  dataPrinter.writeToCSV(orders, "order.csv");
}
run();
