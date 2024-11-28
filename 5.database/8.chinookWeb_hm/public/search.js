document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("searchForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const word = document.getElementById("searchBox").value;
      const option = document.getElementById("option").value;
      console.log(
        "검색단어랑 카테고리값 클라이언트에 잘 가져왔나: ",
        word,
        option
      );

      const response = await fetch("/search", {
        method: "POST",
        // headers: { "Content-Type": "text/plain" },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ word: word, option: option }),
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
      } else {
        const data = await response.text();
        document.getElementById("searchResult").textContent = data;
      }
    });

  // 데이터 받은걸 저장 -> 로우르 가져다가 하나씩 리스트로 저장 -> 리스트를 돔에 추가
});
