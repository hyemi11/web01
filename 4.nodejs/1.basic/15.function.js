function sum_to_100() {
    // 1부터 100까지의 합산을 반납한다.
    let sum = 0;
    for (let num = 1; num <= 100000000; num++) {
        sum = sum + num;
    }
    return sum;
}

function sum2_to_100() {
    let num = 1;
    let sum = 0;
    while (num <= 100000000) {
        sum = sum + num;
        num++;
    }
    return sum;
}

function sum3_to_100() {
    // 이 덧셈을 가장 빠르게 하는 알고리즘은?? 수학자...
    let n = 100000000;
    let sum = (n * (n+1)) / 2;
    return sum;
}


function my_long_func() {
    sum_to_100();
    sum2_to_100();
    sum_to_100();
    sum2_to_100();
}

console.log(sum2_to_100());
console.log(sum_to_100());

console.time("for")
console.log(sum_to_100());
console.timeEnd("for")

console.time("while")
console.log(sum2_to_100());
console.timeEnd("while")

console.time("gauss")
console.log(sum3_to_100());
console.timeEnd("gauss")
