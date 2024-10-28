// showAtmBoard() -> 스위치문.atm.메소드 호출 ->
// r.question으로 amount 이력받아 이프문 실행/showAtmBoard()/메소드 종료
// -> 스위치 케이스문 break
//-------------------------------------//
// (주의)r. question는 비동기 처리이기 때문에 같은 레벨?에 b라는 다른 함수가 있다면, 함수 처리되기전에(사용자입력받기전에) b도 호출되어 b가 먼저 콘솔에 출력되게됨//
//-------------------------------------//

const readline = require("readline");

// 입출력 인터페이스 오브젝트로 생성하여 사용하기 (readline Interface)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//atm 클래스 정의
class ATM {
  constructor(initialBalance = 0) {
    this.balance = initialBalance;
  }

  checkBalance() {
    console.log(`현재 잔액: ${this.balance}원`);
  }

  deposit(amount) {
    rl.question("입금할 금액을 입력하세요: ", (amount) => {
      if (Number(amount) <= 0) {
        console.log("입금 금액은 0보다 커야 합니다.");
      } else {
        this.balance += Number(amount);
        console.log(`${amount}원이 입금되었습니다.`);
        this.checkBalance();
      }
      showAtmBoard();
    });
  }

  withdraw(amount) {
    rl.question("출금할 금액을 입력하세요: ", (amount) => {
      if (Number(amount) <= 0) {
        console.log("출금 금액은 0보다 커야 합니다.");
      } else if (Number(amount) > this.balance) {
        console.log("잔액이 부족 합니다.");
        console.log(this.checkBalance());
      } else {
        this.balance -= Number(amount);
        this.checkBalance();
      }
      showAtmBoard();
    });
  }
}

//ATM 인스턴스화
const atm = new ATM();

// (f) ATM 보딩 출력
function showAtmBoard() {
  console.log("\n===== ATM 시스템 =====");
  console.log("1. 잔액 확인");
  console.log("2. 입금");
  console.log("3. 출금");
  console.log("4. 종료");
  rl.question("원하는 작업을 선택하세요: ", workSwitch);
}

// (f) 선택작업 스위치 처리
function workSwitch(choice) {
  switch (choice) {
    case "1":
      atm.checkBalance();
      showAtmBoard();
      break;
    case "2":
      atm.deposit();
      break;
    case "3":
      atm.withdraw();
      break;
    case "4":
      console.log("ATM 시스템을 종료합니다.");
      rl.close();
      break;
    default:
      console.log("잘못된 입력입니다. 다시 선택해주세요.");
      showAtmBoard();
  }
}

showAtmBoard();
