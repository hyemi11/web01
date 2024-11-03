// Date(..)는 js내장객체임
// 년,월,일,시,분,초의 인수를 받음
// 월은 0부터시작함(0=1월)
// start.getTime(), end.getTime()이라는 메소드를 가지고있음
// getTime메서드는 밀리초단위의 숫자로 반환하는 함수
console.log(new Date(2024, 11, 31, 23, 59, 59)); //2024-12-31T14:59:59.000Z
console.log(new Date(2024, 11, 31)); //2024-12-30T15:00:00.000Z
console.log("--------------------------------");

// Date로 랜덤 날자 생성하기

const { format } = require("date-fns"); //{..} : format함수를 내문서에 있는 전역변수처럼 직접 사용가능하게하는 호출법

function getRandomDate() {
  const start = new Date(2024, 0, 1); //Mon Jan 01 2024 00:00:00 GMT+0900 (대한민국 표준시)
  const end = new Date(2024, 11, 31, 23, 59, 59); //Tue Dec 31 2024 23:59:59 GMT+0900 (대한민국 표준시)

  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  // console.log(randomDate); //2024-07-09T11:16:29.721Z (<-포멧팅 필요. 이건 npm라이브러리 쓰겠다) (i wanna This 2023-03-26 13:37:31)

  return format(randomDate, "yyyy-MM-dd HH:mm:ss"); // date-fns.format
}

console.log(getRandomDate());
