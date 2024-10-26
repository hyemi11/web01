function asyncOperation1(response, callback) {
  setTimeout(() => {
    console.log("Operation1 completed");
    callback("response1");
  }, 1000);
}
function asyncOperation1(response, callback) {
  setTimeout(() => {
    console.log("Operation2 completed", response);
    callback("response2");
  }, 1000);
}

///callback hell

//
