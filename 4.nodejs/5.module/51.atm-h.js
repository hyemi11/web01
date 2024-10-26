const { ftruncate } = require("fs");
const readline = require("readline");

// (선언) 변수 및 오브젝트 선언 (인터페이스, 발란스(기본 0원),)//
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let balance = 0;

// (f) atm보딩화면 출력 //
function showAtmBoard() {
  console.log("\n===== 새싹 ATM =====");
  console.log("1. 잔액확인");
  console.log("2. 입금");
  console.log("3. 출금");
  console.log("4. 종료");
  rl.question("원하는 작업을 선택하세요: ", workSwitch);
}

// (f) 선택한 작업 스위치 처리 //
function workSwitch(choice) {
  switch (choice) {
    case "1":
      checkBalance();
      break;
    case "2":
      rl.question("입금할 금액을 입력하세요: ", (amount) =>
        deposit(Number(amount))
      );
      break;
    case "3":
      rl.question("출금할 금액을 입력하세요: ", (amount) =>
        withdraw(Number(amount))
      );
      break;
    case "4":
      console.log("ATM을 종료합니다");
      rl.close();
      break;
    default:
      console.log("=> 숫자로 선택 해주세요");
      showAtmBoard();
  }
}

// (f) 1 잔액 확인  //
function checkBalance() {
  console.log(`=> 현재 잔액: ${balance}원`);
  showAtmBoard();
}
// (f) 2 입금  //
function deposit(amount) {
  if (amount <= 0) {
    console.log("=> 입금 금액은 0보단 커야 합니다.");
  } else {
    balance += amount;
    console.log(`=> ${amount}원이 입금 되었습니다.
   잔액은 ${balance}원 입니다.`);
  }
  showAtmBoard();
}
// (f) 3 출금  //
function withdraw(amount) {
  if (amount <= 0) {
    console.log("=> 출금 금액은 0보다 커야 합니다.");
  } else if (amount > balance) {
    console.log(`=> 잔액이 부족합니다.`);
  } else {
    balance -= amount;
    console.log(`=> ${amount.toLocaleString()}원이 출금되었습니다.
   잔액은 ${balance.toLocaleString()}원 입니다.`);
  }
  showAtmBoard();
}

// (f) 4 종료 //
// 종료는 인터페이스 종료 내장함수를 스위치문에서 바로 호출. 별도 구현 x

// (프로그램 시작)
showAtmBoard();

//-----------------------추가 공부 및 정리 ----------------------------------//
// 1. ${amount.toLocaleString()} 스트링변환 없어도 됨
// 2. rl.question : rl.question() 메서드는 쿼리를 출력에 써서 표시하고,
//    입력 시 사용자 입력이 제공될 때까지 기다린 후,
//    제공된 입력을 첫 번째 인수로 전달하는 콜백 함수를 호출.
// 3. work 선택후 잘못입력했을때, 보드로 빠져나가지 않고 재 입력 기회 주기 (추가+++)
