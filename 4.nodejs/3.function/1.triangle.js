function leftTriangle(h) {
  for (let i = 1; i <= h; i++) {
    let result = "";
    for (let j = 1; j <= i; j++) {
      result += "*";
    }
    console.log(result);
  }
}

function leftInvertedTriangle(h) {
  for (let i = h; i > 0; i--) {
    let result = "";
    for (let j = 1; j <= i; j++) {
      result += "*";
    }
    console.log(result);
  }
}
//---------(3)---------------//
// 1 공백반복(height-1 ~ height-height)
// 2 별반복 (height-공백)
// 3 개행
//
function leftTriangle_mirror(h) {
  for (i = 1; i <= h; i++) {
    let result = "";
    for (j = h - i; j >= 0; j--) {
      result += " ";
    }
    result += "*";
    console.log(result);
  }
}

leftTriangle(5);
leftInvertedTriangle(5);
leftTriangle_mirror(5);
