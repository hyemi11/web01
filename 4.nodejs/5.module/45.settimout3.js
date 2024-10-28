console.log("타이머를 통한 비동기처리");

function greet() {
  console.log("안녕하세요");
}

// setTimeout(1000, greet); 한국말 어순은...
setTimeout(greet, 1000); // 영어는 거꾸로...
setTimeout(greet, 1000);
setTimeout(greet, 1000);
setTimeout(greet, 1000);

// a -> b 저장합니다
// a <- b 저정합니다.
