class MyUtility {
  // 숫자범위중에서 랜덤선택
  static getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // 배열범위중에서 랜덤선택
  static getRandomInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
// uuid
function generateId() {
  const { v4: uuidv4 } = require("uuid");
  return uuidv4();
}
module.exports = { MyUtility, generateId };
