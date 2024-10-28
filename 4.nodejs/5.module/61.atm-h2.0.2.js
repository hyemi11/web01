// 비동기처리함수를 async - await 와 promise로 동기화처리하기(작업중 완료 및 저장 후 다음 작업 패치)
// rl.question 함수가 비동기처리이기 때문에, promise 값으로(성공, 실패, ?) 리턴하게 만들고,
// atm클래스 내 입출금 함수를 async로 정하고, rl.question함수를 호출하는 함수를 await로 값 전달받을때까지 다음 코드문 실행 못하게함(프로세스 선점 시킴)
// atm클래스 내 메소드를 호출한 switch 문으로 돌아와서 메뉴보드실행하고 break.
//-------------------------------------//

const { resolve } = require("path");
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

  async deposit() {
    const amount = await this.askAmount("입금할 금액을 입력하세요: ");
    if (amount <= 0) {
      console.log("입금 금액은 0보다 커야 합니다.");
    } else {
      this.balance += amount;
      console.log(`${amount}원이 입금되었습니다.`);
      this.checkBalance();
    }
  }

  async withdraw() {
    const amount = await this.askAmount("출금할 금액을 입력하세요: ");
    if (amount <= 0) {
      console.log("출금 금액은 0보다 커야 합니다.");
    } else if (amount > this.balance) {
      console.log("잔액이 부족 합니다.");
      this.checkBalance();
    } else {
      this.balance -= amount;
      console.log(`${amount}원이 출금되었습니다.`);
      this.checkBalance();
    }
  }

  // 금액 입력 받기 (비동기함수)
  askAmount(message) {
    return new Promise((resolve) => {
      rl.question(message, (input) => {
        resolve(Number(input));
      });
    });
  }
}

//ATM 인스턴스화
const atm = new ATM(0);

// (f) ATM 보드 출력
function showAtmBoard() {
  console.log("\n===== ATM 시스템 =====");
  console.log("1. 잔액 확인");
  console.log("2. 입금");
  console.log("3. 출금");
  console.log("4. 종료");
  rl.question("원하는 작업을 선택하세요: ", workSwitch);
}

// (f) 선택작업 스위치 처리
async function workSwitch(choice) {
  switch (choice) {
    case "1":
      atm.checkBalance();
      showAtmBoard();
      break;
    case "2":
      await atm.deposit();
      showAtmBoard();
      break;
    case "3":
      await atm.withdraw();
      showAtmBoard();
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

// 프로그램시작
showAtmBoard();
