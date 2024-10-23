// 직접 필요한 곳에 try-catch 를 통해서... 오류를 해결하기

const scores = [85, 90, 'invalid', 78, 88]; // 국영수과음악
let sum = 0;
let validNum = 0;

// 학생 시험 점수의 합산 구하기
try {
    for (let i = 0; i < scores.length; i++) {
            if (typeof scores[i] !== 'number') {
                throw new Error(`숫자가 아닌 값이 입력되었습니다.: 입력된 문자열 "${scores[i]}", ${i} 번째 입력값.`);
            }
            sum += scores[i];
            validNum++;
    }

    console.log("합산은: ", sum, validNum);

    // 평균
    const average = sum / validNum;

    if (average >= 80) {
        console.log('합격입니다');
    } else {
        console.log('불합격입니다');
    }

    console.log('평균은: ', average);

} catch (error) {
    console.log(`에러발생: ${error.message}`);
}
