// 입력값을 인자로 받아서 처리한다....
// 함수명을 sum_to_n() 으로 바꾸고, 입력인자를 입력 받아서, 함수 내에서는 그 인자로 처리하게 코드를 변경할것.

function sum_to_n(max) {
    let sum = 0;
    for (let num = 1; num <= max; num++) {
        // sum = sum + num;
        sum += num;
    }
    return sum;
}

function sum2_to_n(num) {
    let n = 1;
    let sum = 0;
    while (n <= num) {
        //sum += n++; // C언어... 동작은 하지만 지금 시대에는 비추
        sum += n;
        n++;
    }
    return sum;
}

function sum3_to_n(n) {
    // 이 덧셈을 가장 빠르게 하는 알고리즘은?? 수학자...
    let sum = (n * (n+1)) / 2;
    return sum;
}

const sumto = 1_000_000_000;

console.log(sum2_to_n(sumto));
console.log(sum_to_n(sumto));

console.time("for")
console.log(sum_to_n(sumto));
console.timeEnd("for")

console.time("while")
console.log(sum2_to_n(sumto));
console.timeEnd("while")

console.time("gauss")
console.log(sum3_to_n(sumto));
console.timeEnd("gauss")
