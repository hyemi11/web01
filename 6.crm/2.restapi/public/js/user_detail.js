const userDetail = document.getElementById("user-detail");
const tableBody = document.getElementById("tableBody");

const userId = window.location.pathname.split("/").pop();
console.log(userId);

function fetchUserDetail() {
  fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      renderUserDetail(data);
    });
}

// function renderUserDetail(user) {
//   const row = document.createElement("p");
//   row.textContent = JSON.stringify(user);
//   userDetail.appendChild(row);
// }

function renderUserDetail(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.Name}</td>
    <td>${user.Gender}</td>
    <td>${user.Age}</td>
    <td>${user.Birthdate}</td>
    <td>${user.Address}</td>
  `;
  tableBody.appendChild(row);
}
fetchUserDetail();
