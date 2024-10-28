// showMenu() -> 스위치문.r.question으로 amount 받고 그걸 인자로 atm매소드 호출
// -> atm메소드실행/종료-> 스위치문.showMenu()실행 -> 케이스문 break
//-------------------------------------//

// 리드라인, 인터페이스 선언
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ATM 클래스 정의
class ATM {
  constructor(initialBalance = 0) {
    this.balance = initialBalance; // 초기 잔액 설정
  }

  // 잔액 확인 메서드
  checkBalance() {
    console.log(`현재 잔액: ${this.balance.toLocaleString()}원`);
  }
  // 입금 메서드
  deposit(amount) {
    if (isNaN(amount) || amount <= 0) {
      console.log("유효한 금액을 입력해주세요.");
    } else {
      this.balance += amount;
      console.log(`${amount.toLocaleString()}원이 입금되었습니다.`);
      this.checkBalance();
    }
  }
  // 출금 메서드
  withdraw(amount) {
    if (isNaN(amount) || amount <= 0) {
      console.log("유효한 금액을 입력해주세요.");
    } else if (amount > this.balance) {
      console.log(`잔액이 부족합니다. 현재잔액: ${this.balance}`);
    } else {
      this.balance -= amount;
      console.log(`${amount.toLocaleString()}원이 출금되었습니다.`);
      this.checkBalance();
    }
  }
}

// 금액 입력 받기 (입/출금 공통 처리) (r. question)
function askAmount(message, callback) {
  rl.question(message, (input) => {
    const amount = Number(input);
    callback(amount);
    showMenu();
  });
}

// 메뉴 선택 처리 함수
function handleMenu(choice) {
  switch (choice) {
    case "1":
      atm.checkBalance();
      showMenu();
      break;
    case "2":
      askAmount("입금할 금액을 입력하세요: ", (amount) => atm.deposit(amount));
      break;
    case "3":
      askAmount("출금할 금액을 입력하세요: ", (amount) => atm.withdraw(amount));
      break;
    case "4":
      console.log("ATM 시스템을 종료합니다.");
      rl.close();
      break;
    default:
      console.log("잘못된 입력입니다. 다시 선택해주세요.");
      showMenu();
  }
}

// 메뉴 표시 함수
function showMenu() {
  console.log("\n===== ATM 시스템 =====");
  console.log("1. 잔액 확인");
  console.log("2. 입금");
  console.log("3. 출금");
  console.log("4. 종료");
  rl.question("원하는 작업을 선택하세요: ", handleMenu);
}

// ATM 인스턴스 생성
const atm = new ATM();
// 프로그램 시작
showMenu();
