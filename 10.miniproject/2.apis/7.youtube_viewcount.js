const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("YOUTUBE_API_KEY는 필수 입력 사항입니다.");
  process.exit(1);
}

const searchUrlAPI = "https://www.googleapis.com/youtube/v3/search";
const videoUrlAPI = "https://www.googleapis.com/youtube/v3/videos";

const maxResultPerPage = 1;
const totalPages = 2;

const searchResult = []; // 검색 결과를 담을곳

const fetchYoutube = async () => {
  let nextPageToken = null;

  try {
    for (let page = 1; page <= totalPages; page++) {
      const params = {
        part: "snippet",
        q: "iu",
        type: "video",
        maxResults: maxResultPerPage,
        pageToken: nextPageToken,
        key: API_KEY,
      };

      console.log("start req");
      const response = await axios.get(searchUrlAPI, { params });
      console.log("end req");
      const data = response.data;

      searchResult.push(...data.items);

      // 다음 페이지의 ID;
      nextPageToken = data.nextPageToken;
      console.log("다음페이지: ", nextPageToken);
    }

    const table = [];
    for (let index = 0; index < searchResult.length; index++) {
      // searchResult.forEach(async (item) => {
      const item = searchResult[index];

      let title = item.snippet.title; // 영상 제목
      const videoId = item.id.videoId; // 비디오클립ID
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
      const description = item.snippet.description; // 영상 설명

      // 각각의 비디오 클립에 대해서 추가정보를 조회...
      const videoParams = {
        part: "statistics",
        id: videoId,
        key: API_KEY,
      };

      // 타이틀이 너무 길어서 잘라보기
      const maxTitleLength = 30;
      if (title.length > maxTitleLength) {
        title = title.slice(0, maxTitleLength) + "...";
      }

      const videoResponse = await axios.get(videoUrlAPI, {
        params: videoParams,
      });
      const videoData = videoResponse.data;
      const viewCount = videoData.items[0]?.statistics?.viewCount || "N/A";
      console.log(viewCount);
      table.push({
        Index: index + 1,
        Title: title,
        ViewCount: viewCount,
        VideoURL: videoUrl,
      });

      // console.log(`영상제목: ${title}`);
      // console.log(`URL주소: ${videoUrl}`);
      // console.log(`설명: ${description}`);
      // console.log('-'.repeat(40));
    }

    console.table(table);
  } catch (error) {
    console.error("요청실패: ", error.message);
  }
};

fetchYoutube();
