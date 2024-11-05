const { MyUtility, generateId } = require("./Utility.js");

//------------------------------------generate속성데이터------------------------------------------------//

//data generator에서 배열로 넣으니까 그냥 배열로 만들자.(메뉴는 아이템은 함께 움직이니까)
class ItemGenerator {
  constructor() {
    this.items = [
      ["espresso", "coffee", 2500],
      ["americano", "coffee", 4000],
      ["latte", "coffee", 5000],
      ["blendedTee", "nonCoffee", 6000],
      ["orangeJuice", "nonCoffee", 7000],
      ["bananaSmoothie", "nonCoffee", 7500],
      ["lemonCake", "desert", 8000],
      ["waffle", "desert", 9000],
    ];
  }

  // [coffee, espresso, 2500] [coffee, americano, 4000] 이런식으로 리스트 통으로 리턴시키기...
  generateItem() {
    const itemIndex = Math.floor(Math.random() * this.items.length);
    // console.log("리턴되는 리스트:", itemIndex);
    return this.items[itemIndex];
  }
}

//------------------------------------data Generator------------------------------------------------//

class Generator {
  constructor() {
    this.itemGen = new ItemGenerator();
  }

  generateData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
      const id = generateId();
      const item = this.itemGen.generateItem();
      data.push([id, ...item]); //(주의)리스트에 리스트넣기 : ((id, item)은 [ ,[]]이 되고...  (id, ...item은 [, , , , ,]이렇게 넣어짐))
    }
    return data;
  }
}
//------------------------------------data print------------------------------------------------//
class DataPrinter {
  constructor(data) {
    this.data = data;
  }

  printConsole() {
    for (const [id, name, type, unitPrice] of this.data) {
      console.log(
        `Id:${id}, Name:${name}, Type: ${type}, UnitPrice:${unitPrice}`
      );
    }
  }

  writeToCSV(data, filePath) {
    const fs = require("fs");

    const header = ["Id", "Name", "Type", "UnitPrice"];
    const rows = data.map((row) => row.join(","));
    const csvContent = [header.join(","), ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log(`${filePath}파일 저장이 완료되었습니다`);
  }
}

//------------------------------------ 실행 ------------------------------------------------//
function run() {
  const generator = new Generator();
  const items = generator.generateData(20);
  const dataPrinter = new DataPrinter(items);
  // dataPrinter.printConsole();
  dataPrinter.writeToCSV(items, "item.csv");
}
run();
