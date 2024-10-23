//--------------A_triangle1------------------//
// *
// **
// ***
// ****
// *****
function triangle1(h) {
  let result;
  for (i = 1; i <= h; i++) {
    result = "*".repeat(i);
    console.log(result);
  }
}
//----------------A_triangle2----------------//
// *****
// ****
// ***
// **
// *
function triangle2(h) {
  let result;
  for (i = h; i > 0; i--) {
    result = "*".repeat(i);
    console.log(result);
  }
}
//----------------A_triangle3----------------//
//     *
//    **
//   ***
//  ****
// *****
function triangle3(h) {
  for (let i = 1; i <= h; i++) {
    let space = " ".repeat(h - i);
    let star = "*".repeat(i);
    let result = space + star;
    console.log(result);
  }
}

//----------------A_tree----------------//
//     *
//    ***
//   *****
//  *******
// *********

function tree(h) {
  let result = "";
  for (let i = 1; i <= h; i++) {
    let space = " ".repeat(h - i);
    let star = "*".repeat(2 * i - 1);
    result = space + star;
    console.log(result);
  }
}

function tree2(h) {
  let result = "";
  for (let i = 1; i <= h; i++) {
    result += " ".repeat(h - i) + "*".repeat(i * 2 - 1) + "\n";
  }
  console.log(result);
}

//----------------A_reversTree----------------//
// *********
//  *******
//   *****
//    ***
//     *
function reversTree(h) {
  let result = "";
  for (let i = h; i >= 1; i--) {
    result += " ".repeat(h - i) + "*".repeat(i * 2 - 1) + "\n";
  }
  console.log(result);
}

//----------------B_heart----------------//

function heart(h) {
  let top = "";
  let middle = "";
  for (let i = 1; i < h+1; i++) {
    top +=
      " ".repeat(h - i + ?) +
      "*".repeat(2 * i - 1) +
      " ".repeat((h - i) * 2) +
      "*".repeat(i + 1) +
      "/n";
    }
    console.log(top);
  middle = h * 2 - 1;
}

triangle1(5);
triangle2(5);
triangle3(5);
tree(5);
tree2(5);
reversTree(5);
heart(5);
