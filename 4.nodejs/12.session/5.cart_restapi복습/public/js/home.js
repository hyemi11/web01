import { fetch_checkLoginStatus } from "./checkuser.js";

document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();

  document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault(); //폼기본동작(서버전송,페이지이동)막고 로그인함수 실행시키기위한 코드
    login();
  });
});

function checkLoginStatus() {
  fetch_checkLoginStatus().then((username) => {
    if (username) {
      showProfile(username);
    } else {
      showLoginForm();
    }
  });
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        //로그인 성공 (= 보낸 데이터의 유효성이 확인되어 세션디비에 저장되었따)
      } else {
        //로그인 실패( = 보낸 데이터가 서버측 디비에 없다)
        throw new Error("로그인 실패");
      }
    })
    .then((data) => {
      // data가 사용되지 않음..왜 적은거지? + api도 username 안넘겨도댐..
      // 로그인 성공시 json 결과 파싱해서 다시 데이터 추출함
      checkLoginStatus(); //여기함수 내부에서 checkLogin api에서 username 받아서 확인한다규..
    })
    .catch((error) => {
      // 로그인 실패시 오류 처리
      alert("로그인 실패");
    });
}

function showProfile(username) {
  document.getElementById("loginFormContainer").style.display = "none";
  document.getElementById("profile").style.display = "block";
  document.getElementById("usernameSpan").innerText = username;
}

function showLoginForm() {
  document.getElementById("loginFormContainer").style.display = "block";
  document.getElementById("profile").style.display = "none";
}
