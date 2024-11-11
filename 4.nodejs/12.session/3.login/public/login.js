// const { response } = require("express");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginButton").addEventListener("click", login);
  document.getElementById("logoutButton").addEventListener("click", logout);

  checkLoginStatus();
});

// 나 로그인중? 어떻게 알지.. 우리의 서버가 앎..  (이거 async로 바꿔보기)
function checkLoginStatus() {
  fetch("/check-login")
    .then((response) => {
      if (response.ok) {
        // showProfile(username);
        return response.json();
      } else {
        console.log("로그인 안된 사람임");
        throw new Error("로그인 안된 사용자");
      }
    })
    .then((data) => {
      if (data && data.username) {
        console.log(data.username);
        showProfile(data.username);
      }
    })
    .catch((error) => {
      console.log("로그인 안된 사용자였음..");
    });
}

async function checkLoginStatus() {
    try {
        const response = await fetch("/check-login"){
          
      }
  } catch {
    console.log("로그인 안된 사용자였음..");
    showLoginForm();
  }
}

function logout() {
  fetch("/logout").then((response) => {
    if (response.ok) {
      showLoginForm();
    }
  });
}

function login(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("로그인 버튼 클릭");

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (response.ok) {
      console.log("로그인 성공");
      //   window.location.href = "/profile";
      showProfile(username);
    } else {
      console.log("로그인 성공");
    }
  });
}

function showProfile(username) {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("profile").style.display = "block";
  document.getElementById("usernameSpan").innerHTML = username;
}

function showLoginForm() {
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("profile").style.display = "none";
}
