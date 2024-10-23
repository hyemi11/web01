// reduce() 함수는, 전체 배열 내의 데이터를... 합산(등) 을 통해서, 누계기 (accumulator)
const numbers = [1, 2, 3, 4, 5]; // 하나로 합치면??? 합산..

//                          이전리턴값 , 현재값        => (       함수연산          ), 초기값
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum);

// 모든 수의 곱셈??
const product = numbers.reduce((accumulator, currentValue) => (accumulator * currentValue), 1);
console.log(product);

// 저 배열에서 가장 큰 값은??

const numbers2 = [10, 5, 20, 8, 15]; // 20

                            //  10,       10      => 10
                            //  10,       5       => 10
                            //  10,       20      => 20
                            //  20,       8       => 20
                            //  20,       15      => 20
const max = numbers2.reduce((accumulator, currentValue) => currentValue > accumulator ? currentValue : accumulator, numbers2[0]);
console.log(max);

console.log(Math.max(10, 5, 20, 8, 15));

// 내가 max 함수를 구현한다면????

function my_max(numbers) {
    let max = numbers[0]; // 초기값

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i]
        }
    }

    return max;
}

const numbers3 = [-100000, -99900000, -2000000, -5000000, -150000];  // -10이 가장 큰거...

console.log(my_max(numbers3));
// 20 이 나오도록.. for loop 로 구현해보기...

