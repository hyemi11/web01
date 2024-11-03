const { MyUtility, generateId } = require("./myUtility.js");

//------------------------------------generate속성데이터------------------------------------------------//

//타입,아이템, 금액은 메뉴 클래스로 관리되어야..하지않을까 (타입.메뉴.금액 세트로..)
//coffee.espresso,latte... nonCoffee.tee,juice... desert.cake,waffle...
//그런데. 아이템이 속성, 가격이 값 형식..이래도 되나? 이걸 어떻게 가져오지?
//(했던방식)(구성):속성별 클래스 정의(변수들, 랜덤으로 변수 리턴 하는 함수) + Generator클래스 정의(각 클래스 인스턴스화, 클래스별 함수 n번 호출) + 데이터출력 클래스 정의(콘솔,toHtml,toCsv)
// => (실행): generator클래스, 데이터출력클래스 인스턴스화 -> const.ㅁㅁ = generator.클래스함수 호출하여 데이터생성하는 함수 (데이터 생성및변수에담긴 상태가됨) -> 데이터 출력 함수 호출(ㅁㅁ)
//(바꿀방식1):구성유지하는데, 지금.. 객체이니까.. [커피, 에스프레소, 2500] 이렇게 배열(리스트?)로 바꾸고, Generator 클래스에서는 이걸 new하게 하고, 데이터 엑스포트할때 음... 한개씩 값 가져와야할거같은뎀...호에..ㅠㅠ
//(바꿀방식2): 메뉴단위로 배열로 만들어(8,3) -> 8개를 랜덤으로 생성 -> 값푸시를 인덱스로.... ??

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

  // [coffee, espresso, 2500] [coffee, americano, 4000] 이런식으로 리턴시키기...
  generateItem() {
    const itemIndex = Math.floor(Math.random() * this.items.length);
    return this.items[itemIndex];
  }
}
// const aa = new MenuGenerator();
// console.log(aa.generateMenu());

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
      data.push([id, ...item]);
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
    const rows = data.map((row) => row.join(",")); // join 결과를 반환해야 함
    const csvContent = [header.join(","), ...rows].join("\n"); // 헤더 포함 CSV 내용 생성

    fs.writeFileSync(filePath, csvContent, "utf-8"); // 파일 저장
    console.log("csv파일에 저장이 완료되었습니다");
  }
}

//------------------------------------ 실행 ------------------------------------------------//
function run() {
  console.time("실행시간");
  const generator = new Generator();
  const items = generator.generateData(20);
  const dataPrinter = new DataPrinter(items);
  dataPrinter.printConsole();
  dataPrinter.writeToCSV(items, "item.csv");
  console.timeEnd("실행시간");
}
run();
