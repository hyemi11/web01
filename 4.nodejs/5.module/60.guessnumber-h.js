const readline = require("readline");

// 변수 및 오브젝트 선언 : readline 인터페이스 / 랜덤넘버 / 시도횟수
const rl = readline.createInterface({
  input: process.stderr,
  output: process.stdout,
});
const randomNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// 함수
function guessStart() {
  rl.question("숫자를 입력하세요: ", (input) => {
    const guessNum = parseInt(input, 10);
    attempts++; //잘못입력했을 때도 시도+1되는 구조.. (요거 나중에 더 생각해보기)

    if (isNaN(guessNum)) {
      console.log("숫자만 입력하세요");
      guessStart();
    } else if (guessNum < randomNum) {
      console.log("더 큰 숫자입니다");
      guessStart();
    } else if (guessNum > randomNum) {
      console.log("더 작은 숫자입니다");
      guessStart();
    } else {
      console.log(`정답입니다! ${attempts}번 만에 맞췄습니다`);
      rl.close();
    }
  });
}

// 게임시작
console.log("1부터 100 사이의 숫자를 맞춰보세요");
guessStart();
