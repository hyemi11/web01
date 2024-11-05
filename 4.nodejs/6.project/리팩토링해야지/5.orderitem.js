const fs = require("fs");
const csv = require("csv-parser");
const { MyUtility, generateId } = require("./Utility.js");

//------------------------------------generate속성데이터------------------------------------------------//
function readCsv(filePath) {
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

class GetOrderId {
  constructor(filePath) {
    this.filePath = filePath;
    this.extractedCsv = [];
    this.ids = [];
  }
  async getOrderId() {
    this.extractedCsv = await readCsv(this.filePath);
    this.ids = this.extractedCsv.map((column) => {
      return column.Id;
    });
  }
  rndOrderId() {
    const randomId = this.ids[Math.floor(Math.random() * this.ids.length)];
    return randomId;
  }
}

class GetItemId {
  constructor(filePath) {
    this.filePath = filePath;
    this.extractedCsv = [];
    this.ids = [];
  }
  async getItemId() {
    this.extractedCsv = await readCsv(this.filePath);
    this.ids = this.extractedCsv.map((column) => {
      return column.Id;
    });
  }
  rndItemId() {
    const randomId = this.ids[Math.floor(Math.random() * this.ids.length)];
    return randomId;
  }
}

//------------------------------------data Generator------------------------------------------------//
class Generator {
  constructor() {
    this.getOrderId = new GetOrderId("order.csv");
    this.getItemId = new GetItemId("item.csv");
  }

  async generateData(count) {
    await this.getOrderId.getOrderId();
    await this.getItemId.getItemId();

    const data = [];
    for (let i = 0; i < count; i++) {
      const id = generateId();
      const orderId = await this.getOrderId.rndOrderId();
      const itemId = await this.getItemId.rndItemId();
      data.push([id, orderId, itemId]);
    }
    return data;
  }
}

class DataPrinter {
  constructor(data) {
    this.data = data;
  }
  printConsole() {
    for (const [id, orderId, itemId] of this.data) {
      console.log(`Id:${id}, OrderId:${orderId}, ItemId:${itemId}`);
    }
  }
  writeToCSV(data, filePath) {
    const fs = require("fs");
    const header = ["Id", "OrderId", "ItemId"];
    const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
    const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log(`${filePath}파일 저장이 완료되었습니다`);
  }
}

//------------------------------------ 실행 ------------------------------------------------//
async function run() {
  const generator = new Generator();
  const orderItems = await generator.generateData(50000);
  const dataPrinter = new DataPrinter(orderItems);
  //   dataPrinter.printConsole();
  dataPrinter.writeToCSV(orderItems, "orderItem.csv");
}
run();
