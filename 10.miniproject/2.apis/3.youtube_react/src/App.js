import { useState, useEffect } from 'react';
import axios from 'axios';

const YoutubeApp = () => {
    const [videos, setVideos] = useState([]);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';

    useEffect(() => {
        const fetchYoutube = async() => {
            try {
                const response = await axios.get(`${BASE_URL}`, {
                    params: {
                        part: 'snippet,contentDetails,statistics',
                        chart: 'mostPopular',
                        regionCode: 'KR',
                        maxResults: 10,
                        key: API_KEY,
                    }
                });
                setVideos(response.data.items);
            } catch (error) {
                console.log('에러', error);
            }
        }

        fetchYoutube();
    }, [API_KEY]); // 시작할때 최초 한번 외부에 요청해서 결과를 받아옴..

    return (
        <div>
            <h1>유툽 현재 실시간 탑10 랭킹</h1>
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>
                        <h2>{video.snippet.title}</h2>
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title}></img>
                        <p>{video.snippet.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default YoutubeApp;
