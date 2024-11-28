document.addEventListener("DOMContentLoaded", () => {
  search();
  pageButton();
});

//search버튼 눌렀을때 api호출 -> 리스트생성함수 호출, 페이징함수 호출
function search() {
  document.getElementById("searchBtn").addEventListener("click", async (e) => {
    const page = 1;
    localStorage.setItem("page", page);
    e.preventDefault();
    const query = document.getElementById("queryBox").value;
    const option = document.getElementById("option").value;
    const response = await fetch(
      `/api/search?searchQuery=${query}&option=${option}&page=${page}`
    );
    const data = await response.json();
    createList(data.results);
    paging(data.pages);
    console.log("현재 페이지는: ", data.pages.page);
  });
}
//prev, next 버튼 눌렀을때 api호출 -> 리스트생성함수 호출, 페이징함수 호출
function pageButton() {
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  prev.addEventListener("click", async () => {
    const page = parseInt(localStorage.getItem("page"));
    const query = document.getElementById("queryBox").value;
    const option = document.getElementById("option").value;
    const response = await fetch(
      `/api/search?searchQuery=${query}&option=${option}&page=${page - 1}`
    );
    const data = await response.json();
    localStorage.setItem("page", data.pages.page);
    createList(data.results);
    paging(data.pages);
  });

  next.addEventListener("click", async () => {
    const page = parseInt(localStorage.getItem("page"));
    const query = document.getElementById("queryBox").value;
    const option = document.getElementById("option").value;
    const response = await fetch(
      `/api/search?searchQuery=${query}&option=${option}&page=${page + 1}`
    );
    const data = await response.json();
    localStorage.setItem("page", data.pages.page);
    createList(data.results);
    paging(data.pages);
    console.log("현재 페이지는 : ", data.pages.page);
  });
}

//list 돔에 그리기
function createList(data) {
  const list = document.getElementById("list");
  list.innerHTML = " ";
  data.map((item) => {
    const li = document.createElement("li");
    if (item.Title) {
      li.innerText = item.Title;
      list.appendChild(li);
    } else if (item.FullName) {
      li.innerText = item.FullName;
      list.appendChild(li);
    } else if (item.Composer) {
      li.innerText = item.Composer;
      list.appendChild(li);
    } else {
      li.innerText = item.Name;
      list.appendChild(li);
    }
  });
}

// prev,next버튼 활성화
function paging({ page, total }) {
  const pages = document.getElementById("pages");
  pages.innerText = `${page} / ${total}`;

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  console.log("받아온 페이지 : ", page);
  if (page === 1) {
    prev.setAttribute("disabled", "");
    next.removeAttribute("disabled");
  } else if (page === total) {
    next.setAttribute("disabled", "");
    prev.removeAttribute("disabled");
  } else {
    next.removeAttribute("disabled");
    prev.removeAttribute("disabled");
  }
}
