// add.js 는?? 더하는 함수가 있는 모듈...

function addNumbers(a, b) {
    return a + b;
}

function subNumbers(a, b) {
    return a - b;
}

// 모듈을 내보낼때는
module.exports = { 
    addNumbers, 
    subNumbers
};

