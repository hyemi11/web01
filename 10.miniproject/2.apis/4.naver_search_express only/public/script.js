document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 동작 비활성화

    const query = document.getElementById('query').value.trim();
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '<li>loading...</li>'
    
    // 나중에 여기에 try catch 넣기.
    const response = await fetch(`/search/blog?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    resultsElement.innerHTML = ''; // 로딩이 끝났으면 지우기

    // 잘 왔다고 가정하고.. (실제로는 가정 하면 안됨.. 체크해야함.)
    if (data.items && data.items.length > 0) {

        data.items.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.description}</p>
                <small>Post Date: ${item.postdate}</small>
            `;
            resultsElement.appendChild(li);
        })
    } else {
        resultsElement.innerHTML = '<li>검색 결과가 없습니다</li>';
    }
});