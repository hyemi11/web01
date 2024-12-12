const axios = require("./node_modules/axios/index.d.cts");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("YOUTUBE_API_KEY는 필수 입력 사항입니다");
  process.exit(1);
}

const url = "https://www.googleapis.com/youtube/v3/search";

const params = {
  part: "snippet",
  q: "자바스크립트 개발",
  type: "video",
  maxResults: 3,
  key: API_KEY,
};

const fetchYoutube = async () => {
  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    data.items.forEach((item) => {
      const title = item.snippet.title; // 영상 제목
      const channel = item.snippet.channelTitle; //채널명
      const videoId = item.id.videoId; //비디오클립 ID
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 url
      const description = item.snippet.description; // 영상 설명

      console.log(`영상제목: ${title}`);
      console.log(`채널명: ${channel}`);
      console.log(`URL주소: ${videoUrl}`);
      console.log(`설명: ${description}`);
      console.log("-".repeat(40));
    });

    // console.log(data.items[0].id);
    // console.log("-".repeat(40));

    // console.log(data.items);
    // console.log("-".repeat(40));

    // console.log(data);
  } catch (error) {
    console.error("요청실패: ", error.message);
  }
};

fetchYoutube();
