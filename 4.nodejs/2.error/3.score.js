const scores = [85, 90, "ㅇㅇ", 78, 88];

let sum = 0;
let validNum = 0;
for (let i = 0; i < scores.length; i++) {
  try {
    if (typeof scores[i] !== "number") {
      throw new error(
        `합산에 숫자 외 값이 있음! 입력된 문자열:${scores[i]}, ${[
          i,
        ]}번째 입력값`
      );
    }
    sum += scores[i];
    validNum++;
  } catch (error) {
    console.log(`에러발생: ${error.message}`);
  }
}
console.log("합산은: ", sum, validNum);

const average = sum / scores.length;
if (average >= 80) {
  console.log("합격이다!");
} else {
  console.log("열심히하세요");
}
