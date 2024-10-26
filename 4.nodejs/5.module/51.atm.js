const readline = require("readline");

// ATM 클래스 정의
class ATM {
  constructor(initialBalance = 100000) {
    this.balance = initialBalance; // 초기 잔액 설정
  }

  // 잔액 확인 메서드
  checkBalance() {
    console.log(`현재 잔액: ${this.balance.toLocaleString()}원`);
  }

  // 입금 메서드
  deposit(amount) {
    if (amount <= 0) {
      console.log("입금 금액은 0보다 커야 합니다.");
    } else {
      this.balance += amount;
      console.log(`${amount.toLocaleString()}원이 입금되었습니다.`);
    }
  }

  // 출금 메서드
  withdraw(amount) {
    if (amount <= 0) {
      console.log("출금 금액은 0보다 커야 합니다.");
    } else if (amount > this.balance) {
      console.log("잔액이 부족합니다.");
    } else {
      this.balance -= amount;
      console.log(`${amount.toLocaleString()}원이 출금되었습니다.`);
    }
  }
}

// 입력 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ATM 인스턴스 생성
const atm = new ATM(); // 기본 잔액 100,000원

// 메뉴 표시 함수
function showMenu() {
  console.log("\n===== ATM 시스템 =====");
  console.log("1. 잔액 확인");
  console.log("2. 입금");
  console.log("3. 출금");
  console.log("4. 종료");
  rl.question("원하는 작업을 선택하세요: ", handleMenu);
}

// 메뉴 선택 처리 함수
function handleMenu(choice) {
  switch (choice) {
    case "1":
      atm.checkBalance();
      showMenu();
      break;
    case "2":
      rl.question("입금할 금액을 입력하세요: ", (amount) => {
        atm.deposit(Number(amount));
        showMenu();
      });
      break;
    case "3":
      rl.question("출금할 금액을 입력하세요: ", (amount) => {
        atm.withdraw(Number(amount));
        showMenu();
      });
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

// 프로그램 시작
showMenu();
