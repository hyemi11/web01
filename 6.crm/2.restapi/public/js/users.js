const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-name");

searchButton.addEventListener("click", () => {
  searchName = searchInput.value;
  fetchUsers(searchName);
});

//이함수는 api 요청해서 값 받아오면 끝이야
function fetchUsers(searchName) {
  fetch(`/api/users`)
    .then((response) => response.json())
    .then((data) => {
      // 랜더링 코드 작성
      renderTable(data);
      //   console.log(data);
    });

  // const response = await fetch(`/api/users`);
  // const data = await response.json();
}

//받아온거 돔에 그려주는 함수
function renderTable(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");

  // 지우고 출발
  tableHeader.innerHTML = " ";
  tableBody.innerHTML = " ";

  //헤더그리기 (tr안에 th)
  const headerRow = document.createElement("tr");
  const fields = Object.keys(data[0]);
  // console.log(fields);
  fields.forEach((f) => {
    if (f !== "Id" && f !== "Address") {
      const th = document.createElement("th");
      th.textContent = f;
      headerRow.appendChild(th);
    }
  });
  tableHeader.appendChild(headerRow);

  //바디그리기 (tr안에 td그리기)
  data.forEach((row) => {
    const bodyRow = document.createElement("tr");
    bodyRow.addEventListener("click", () => {
      window.location = `/users/${row.Id}`;
    });

    for (const [key, value] of Object.entries(row)) {
      if (key !== "Id" && key !== "Address") {
        const td = document.createElement("td");
        td.textContent = value;
        bodyRow.appendChild(td);
      }
    }
    tableBody.appendChild(bodyRow);
  });
}

fetchUsers(""); //시작할때는 그냥 빈값으로 검색, 즉 모든사용자 출력으로 시작.
