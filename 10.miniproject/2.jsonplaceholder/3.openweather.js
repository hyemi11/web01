const axios = require("axios");
require("dotenv").config();

const url = "https://api.openweathermap.org/data/2.5/weather";
const params = {
  q: "Seoul",
  appid: process.env.OPENWEATHER_API_KEY,
  units: "metric", //화씨(k)가 섭씨(c)로 바뀜
  lang: "kr", //한국어로
};

const fetchweather = async () => {
  const response = await axios.get(url, { params });
  //   console.log("응답: ", response.data);
  const weather = response.data;
  console.log(`city: ${weather.name}`);
  console.log(`온도: ${weather.main.temp} C(섭씨)`);
  console.log(`온도: ${weather.main.temp} C(섭씨)`);
  console.log(`체감온도: ${weather.main.feels_like} C(섭씨)`);
  console.log(`날씨: ${weather.weather[0].description}`);
};

fetchweather();

// axios.get(url, { params }).then((response) => {
//   console.log("응답: ", response.data);
// });
