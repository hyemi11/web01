require('dotenv').config();
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;
const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// 사용자 정의 필터를 추가
env.addFilter('stringify', function (obj) {
    return JSON.stringify(obj);
});

app.set('view engine', 'html');

// 미들웨어 설정
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('입력 인자 없음');
    }

    // 여기에서 실제로 youtube에 검색해서 결과를 반환한다.
    const url = 'https://www.googleapis.com/youtube/v3/search';

    const params = {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        key: API_KEY
    }

    // axios 로 요청한다. 결과 목록을 이쁘게 json으로 처리한다.
    try {
        const response = await axios.get(url, { params });
        // 왕창 다 던져주기.. 니가 알아서해~~~
        // const videos = response.data.items;
        // 필요한 데이터만 골라서 주기
        const videos = response.data.items.map(item => ({
            videoId: item.id.videoId, // 유투브 비디오ID
            title: decodeHtmlEntities(item.snippet.title), // 영상 제목
            description: item.snippet.description, // 영상 설명
            thumbnailUrl: item.snippet.thumbnails.default.url, // 썸네일 URL (작은 사이즈) 
        }))
        console.log(videos);
        res.render('index', { videos });
    } catch (error) {
        console.log('요청 오류', error);
        return res.status(500).send('알수없는 서버 오류');
    }
});

function decodeHtmlEntities(text) {
    const entities = {
        '&#39;': "'", // single quote
        '&quot;': '"', // double quote
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
    };
    return text.replace(/&#39;|&quot;|&amp;|&lt;|&gt;/g, match => entities[match] || match);
}

app.get('/play', (req, res) => {
    const videoId = req.query.videoId;
    const videos = JSON.parse(decodeURIComponent(req.query.videos || '[]'));
    // console.log(req.query.videos);

    const selectedVideo = videos.find((video => video.videoId === videoId));

    res.render('index', { videos, selectedVideo });
})

app.listen(PORT, () => {
    console.log('서버 레디');
});
