class MyUtility {
  static getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static getRandomInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

function generateId() {
  const { v4: uuidv4 } = require("uuid");
  return uuidv4();
}
module.exports = { MyUtility, generateId };
