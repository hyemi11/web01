try {
    // 실제 여러가지 코드 내용
    invalidFunc1();
    invalidFunc2();
    invalidFunc3();
    invalidFunc4();
    invalidFunc5();
    invalidFunc6();
} catch (error) {
    if (error instanceof TypeError) {
        console.log("타입오류", error.message);
    } else if (error instanceof ReferenceError) {
        console.log("참조 오류", error.message); 
    } else if (error instanceof RangeError) {
        console.log("범위 오류", error.message); 
    } else {
        console.log("기타 오류", error.message);
    }
}
