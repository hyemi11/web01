class AddressGenerator {
  constructor() {
    this.seoul = ["서울"];
    this.seoul.gu = [
      "광진구",
      "성동구",
      "서초구",
      "강남구",
      "강동구",
      "송파구",
      "중구",
      "종로구",
    ];
    this.gyeonggi = ["경기"];

    this.gyeonggi.gu = [
      "광주시",
      "하남시",
      "성남시",
      "고양시",
      "오산시",
      "평택시",
    ];
  }
  generateAddress() {
    const street = MyUtility.getRandomInRange(1, 100);
    const city = this.cities[Math.floor(Math.random() * this.cities.length)];
    return `${street} ${city}`;
  }
}
