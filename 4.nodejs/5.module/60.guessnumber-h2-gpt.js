const readline = require("readline");

// Readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 1~100 사이의 랜덤 숫자 생성
const answer = Math.floor(Math.random() * 100) + 1;
let attempts = 0; // 시도 횟수

console.log("1부터 100 사이의 숫자를 맞춰보세요!");

// `rl.question`을 Promise로 감싸기
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// 숫자 맞추기 게임 로직 (async/await 사용)
async function startGame() {
  while (true) {
    const input = await askQuestion("숫자를 입력하세요: ");
    const guess = parseInt(input, 10);
    attempts++;

    if (isNaN(guess)) {
      console.log("숫자만 입력하세요!");
    } else if (guess < answer) {
      console.log("더 큰 숫자입니다.");
    } else if (guess > answer) {
      console.log("더 작은 숫자입니다.");
    } else {
      console.log(`정답입니다! ${attempts}번 만에 맞추셨습니다.`);
      break; // 정답을 맞췄을 때 반복문 종료
    }
  }

  rl.close(); // 게임 종료
}

// 게임 시작
startGame();
