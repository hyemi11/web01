import { useState } from "react";
import axios from "axios";
import SearchBar from "./component/SearchBar";
import VideoList from "./component/VideoList";

const YoutubeApp = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          part: "snippet",
          q: query,
          maxResults: 10,
          key: API_KEY,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.log("에러", error);
    }
  };

  console.log("온체인지될때마다 query업뎃: ", query);
  console.log("받아온 패치: ", videos);

  return (
    <div>
      <h1> 유튭 검색기</h1>
      <SearchBar
        query={query}
        onInputChange={setQuery}
        onSearch={handleSearch}
      />
      <VideoList videos={videos} />
    </div>
  );
};

export default YoutubeApp;

// 흐름상 궁금한점.
// 서치바 컨포넌트에서 패치 요청해서 받아온 데이터가 App.videos로 저장되고, 그 다음에
// 비디오리스트 턴포넌트를 App.videos를 인자를 보내서 돔에 뿌리는데..
// 그러면, App. 파일에서 서치바와 비이오리스트 컨포넌트의 라인위치는..? 내일 물어볼래
