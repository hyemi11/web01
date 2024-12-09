const axios = require("axios");
require("dotenv").config();

const username = "hyemi11";
const url = `https://api.github.com/users/${username}/repos`; //유저정보가저오는거 api 주소, /repos 붙이면 리포정보

const token = process.env.GITHUB_TOKEN;

// axios.get(url).then((response) => {
//   console.log("내리포정보: ", response.data);
// });

const fetchgithub = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`, //인증헤더 추가
      },
    });
    if (response.status === 200) {
      // console.log("내 리포정보: ", response.data);
      // 나의 리포 목록만 출력하기
      const repos = response.data;
      repos.forEach((repo) => {
        console.log(`리포명: ${repo.name}, 스타수: ${repo.stargazers_count}`);
      });

      // 스타가 많은 리포순으로 소팅, 그 후 top 5만 뽑아내기
      const topStarredRepo = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      console.log("===스타수가 많은 리포 top5 ===");
      topStarredRepo.forEach((repo) => {
        console.log(`리포명: ${repo.name}, 스타수: ${repo.stargazers_count} `);
      });

      //최근에 업데이트가 이루어진 리포들은??
      //최근 한달 이내 업데이트가 이루어진 리포들을 출력하시오
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      console.log(oneMonthAgo);

      const recentlyUpdatedRepo = repos.filter((repo) => {
        const updatedAt = new Date(repo.updated_at);
        return updatedAt >= oneMonthAgo;
      });

      console.log("===최근 한달 이내 업데이트된 리포===");
      recentlyUpdatedRepo.forEach((repo) => {
        // 한국 시간으로 변경
        const koreanTime = new Date(repo.updated_at).toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        });
        console.log(`리포명: ${repo.name}, 업데이트날: ${koreanTime} `);
      });
    } else {
      console.log("오류:", response.status);
    }
  } catch (error) {
    console.error("에러발생: ", error.message);
  }
};

fetchgithub();
