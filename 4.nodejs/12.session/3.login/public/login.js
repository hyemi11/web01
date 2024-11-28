document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', login);
    document.getElementById('logoutButton').addEventListener('click', logout);

    checkLoginStatus();
});

function checkLoginStatus() {
    // 나 로그인 중?? 어떻게 알지?? 우리의 서버가 앎...
    fetch('/check-login')
        .then(response => {
            // ??? 나머지 코드를 구현한다.
            // 백엔드에게 내 세션이 살아 있는지 보고, 살아 있으면 사용자 이름을 받아온다.
            if (response.ok) {
                // showProfile(username);
                return response.json();
            } else {
                console.log('로그인 안된 사용자임');
                throw new Error('로그인 안된 사용자');
            }
        })
        .then(data => {
            if (data && data.username) {
                console.log(data.username);
                showProfile(data.username);
            }
        })
        .catch(error => {
            console.log('로그인 안된 사용자였음..');
        });
}

async function checkLoginStatusAsyncAwait() {
    // 나 로그인 중?? 어떻게 알지?? 우리의 서버가 앎...
    try {
        const response = await fetch('/check-login');
        const data = await response.json();

        if (data && data.username) {
            console.log(data.username);
            showProfile(data.username);
        } else {
            showLoginForm();
        }
    } catch {
        console.log('로그인 안된 사용자였음..');
        showLoginForm();
    }
}

function logout() {
    fetch('/logout')
        .then(response => {
            if (response.ok) {
                showLoginForm();
            } 
        });
}

function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('로그인 버튼 클릭');

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password}),
    })
        .then(response => {
            if (response.ok) {
                console.log('로그인 성공');
                // window.location.href = '/profile';
                showProfile(username);
            } else {
                console.log('로그인 실패');
            }
        })
}

function showProfile(username) {
    console.log("showProfile 함수 호출중");
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('usernameSpan').innerText = username;
}

function showLoginForm() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
}
