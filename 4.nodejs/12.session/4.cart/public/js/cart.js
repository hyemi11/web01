// const { response } = require("express");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/products")
    .then((response) => response.json())
    .then((products) => displayProducts(products));

  fetch("/cart")
    .then((response) => response.json())
    .then((cart) => {
      displayCart(cart.products);
      displayTotalPrice(cart.totalPrice);
    });
});

//여기에다가 돔 요소 가져다가 tbody에다가 상품 목록 출력하기
function displayProducts(products) {
  const productTableBody = document.querySelector("#productTable tbody");

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><button onclick="addToCart(${product.id})">담기</button></td>
        `;
    productTableBody.appendChild(row);
  });
}

function displayCart(products) {
  //   console.log(`서버에서 받아온 cart: ${products}`);
  const productTableBody = document.querySelector("#cartTable tbody");

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        `;
    productTableBody.appendChild(row);
  });
}

function displayTotalPrice(totalPrice) {
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.textContent = `총 합계: ${totalPrice}원`;
}

// function addToCart(productId) {
//   fetch(`/add-to-cart/${productId}`, { method: "POST" });
//   //나중에 성공/실패 작성..
// }
function addToCart(productId) {
  fetch(`/add-to-cart/${productId}`, { method: "POST" }).then(() => {
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        displayCart(data.cart);
        displayTotalPrice(data.totalPrice);
      });
  });
}
