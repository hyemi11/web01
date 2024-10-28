const args = process.argv.slice(2); //앞에 두개 인자 버리기
console.log(args);

if (args.length == 0) {
  console.log("입력 인자가 없습니다!");
} else {
  console.log("명령어 인수:");
  args.forEach((arg, index) => {
    console.log(`인수 ${index + 1}은 ${arg}입니다.`);
  });
}

// process.args : 내장함수이고, 콘솔에서 데이터 입력시 리스트로 받아줌.
// 0번 1번 인덱스는 node[0], 파일명[1] 으로 할당댐
//c언어에서왔고, argc, argv
// int main(int argc, char** argv)
