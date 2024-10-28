// 1 계산기구현
// 2 함수화
// 3 클래스화
// 4 클래스를 기반으로 계산기 확장
// 4-2 연산자를 화면에 출력을 어떻게할것인가
// 4-3 연산자를 개별 계산기 안에서 할 수는 없을까?
// 5 파일 분리 (클래스별로)
// 6 디렉토리 분리

//사용자로부터 입력받는다..숫자와 부호와 숫자를 입력받아서 연산
// const readline = require("readline".createInterface({
//   input: Process.stdin,
//   output: process.stdout,
// }));

class GenericCalculator {
  add(num1, num2) {
    return num1 + num2;
  }

  subtract(num1, num2) {
    return num1 - num2;
  }

  multiply(num1, num2) {
    return num1 * num2;
  }

  divide(num1, num2) {
    if (num2 === 0) {
      return "Error: Division by zero is not allowed";
    }
    return num1 / num2;
  }

  calculate(num1, operator, num2) {
    switch (operator) {
      case "+":
        return this.add(num1, num2);
      case "-":
        return this.subtract(num1, num2);
      case "*":
        return this.multiply(num1, num2);
      case "/":
        return this.divide(num1, num2);
      default:
        return "Invalid operator";
    }
  }
}

class EngineeringCalculator extends GenericCalculator {
  // 추가적인 공학용 계산 메서드 구현
  // 예: 지수, 로그, 삼각함수 등
  // 지수 함수 (exponential function)
  exponential(num, power) {
    return Math.pow(num, power);
  }

  // 로그 함수 (logarithmic function)
  logarithm(num, base) {
    return Math.log(num) / Math.log(base);
  }
}

class StandardCalculator extends GenericCalculator {
  // 추가적인 일반 계산 메서드 구현
  // 예: 제곱근, 반올림, 기타 수학 함수 등
}

class ProgrammerCalculator extends GenericCalculator {
  // 추가적인 프로그래머용 계산 메서드 구현
  // 예: 비트 연산, 진법 변환, 기타 프로그래머 관련 계산 등
}

// 사용자 모드 입력을 받는 부분

class UserInput {
  constructor(calculator) {
    this.calculator = calculator;
    this.readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    this.selectCalculatorMode();
  }

  getUserInput() {
    this.readline.question("첫번째 숫자를 입력하세요: ", (num1) => {
      // this.readline.question('연산자를 입력하세요 (+, -, *, /): ', (operator) => {
      // this.readline.question('연산자를 입력하세요 (+, -, *, /, log, pow, |, &, 등등..): ', (operator) => {
      this.readline.question(
        `Enter operator (${this.operators.join(", ")}): `,
        (operator) => {
          this.readline.question("두번째 숫자를 입력하세요: ", (num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            const result = this.calculator.calculate(num1, operator, num2);
            console.log(`Result: ${result}`);
            this.readline.close();
          });
        }
      );
    });
  }

  selectCalculatorMode() {
    console.log("Select Calculator Mode:");
    console.log("1. 공학용 계산기");
    console.log("2. 표준 계산기");
    console.log("3. 프로그래머용 계산기");

    this.readline.question("Enter the mode (1/2/3): ", (mode) => {
      switch (mode) {
        case "1":
          this.calculator = new EngineeringCalculator();
          this.calculator.getOperators();
          // this.operators = ['+', '-', '*', '/', '^', 'log'];
          this.operators = this.calculator.getOperators();
          break;
        case "2":
          this.calculator = new StandardCalculator();
          this.operators = ["+", "-", "*", "/"];
          break;
        case "3":
          this.calculator = new ProgrammerCalculator();
          this.operators = ["+", "-", "*", "/", "&", "|", "^"];
          break;
        default:
          console.log("Invalid mode selection.");
          this.readline.close();
          return;
      }
      this.getUserInput();
    });
  }
}

const userInput = new UserInput();
userInput.start();
