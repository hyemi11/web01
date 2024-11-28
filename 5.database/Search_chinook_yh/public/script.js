document.addEventListener("DOMContentLoaded", () => {
  search();
  pageButtons();
});

function search() {
  document
    .getElementById("searchButton")
    .addEventListener("click", async (e) => {
      const page = 1;
      localStorage.setItem("page", page);
      e.preventDefault();
      const query = document.getElementById("search").value;
      const type = document.getElementById("type").value;
      const response = await fetch(
        `/search?searchQuery=${query}&searchScope=${type}&page=${page}`
      );
      const data = await response.json();
      createList(data.results);
      paging(data.pages);
      console.log("현재 페이지는 : ", data.pages.page);
    });
}

function createList(data) {
  const list = document.getElementById("list");
  list.innerHTML = "";
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

function pageButtons() {
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  prev.addEventListener("click", async () => {
    const page = Number(localStorage.getItem("page"));
    const query = document.getElementById("search").value;
    const type = document.getElementById("type").value;
    const response = await fetch(
      `/search?searchQuery=${query}&searchScope=${type}&page=${page - 1}`
    );
    const data = await response.json();
    localStorage.setItem("page", data.pages.page);
    createList(data.results);
    paging(data.pages);
  });
  next.addEventListener("click", async () => {
    const page = Number(localStorage.getItem("page"));
    const query = document.getElementById("search").value;
    const type = document.getElementById("type").value;
    const response = await fetch(
      `/search?searchQuery=${query}&searchScope=${type}&page=${page + 1}`
    );
    const data = await response.json();
    localStorage.setItem("page", data.pages.page);
    createList(data.results);
    paging(data.pages);
  });
}

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
