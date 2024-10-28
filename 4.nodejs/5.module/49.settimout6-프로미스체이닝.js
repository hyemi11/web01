//프로미즈함수로 리졸브 받아서 동기처리 하기//
//프로미스 체이닝//

console.log("0. 타이머를 통한 비동기처리");

function setTimeoutSync(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, delay);
  });
}

// 프로미즈 함수 체이닝 x
setTimeoutSync("1. 첫번째 작업: 1초후 실행", 1000).then(() => {
  setTimeoutSync("2. 두번째 작업: 2초후 실행", 1000).then(() => {
    setTimeoutSync("3. 세번째 작업: 3초후 실행", 1000).then(() => {
      console.log("4. 모든 작업이 완료되었습니다.");
    });
  });
});

//프로미스 체이닝(1)
setTimeoutSync("1. 첫번째 작업: 1초후 실행", 1000)
  .then(() => {
    return setTimeoutSync("2. 두번째 작업: 2초후 실행", 1000);
  })
  .then(() => {
    return setTimeoutSync("3. 세번째 작업: 3초후 실행", 1000);
  })
  .then(() => {
    console.log("4. 모든 작업이 완료되었습니다.");
  });

//프로미스 체이닝(2)
etTimeoutSync("1. 첫번째 작업: 1초후 실행", 1000)
  .then(() => setTimeoutSync("2. 두번째 작업: 2초후 실행", 1000))
  .then(() => setTimeoutSync("3. 세번째 작업: 3초후 실행", 1000))
  .then(() => {
    console.log("4. 모든 작업이 완료되었습니다.");
  });
