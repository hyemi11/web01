//promise
//비동기 작업 수행을 하는데, 
//성공하면 resolved()를 호출해줌
//실패하면 reject()를 호출해줌


const mypromise = new Promise((resolve, reject) => {
    .then((result) => {
        
    })
    .catch((error) => {
        
    })
});


function asyncOperation1(response, callback) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log("Operation1 completed");
            resolve("response1");
        }, 1000);
    });
}
function asyncOperation1(response, callback) {
    return new Promise((resolve, reject) => {

    })
  setTimeout(() => {
    console.log("Operation2 completed", response);
    callback("response2");
  }, 1000);
}
