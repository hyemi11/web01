const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const port = 3000;

// app.use(express.urlencoded({ extended: true })); //extended는 투뎁스일때랑 지금은 무관함
app.use(express.json());

//express-session을 통해 쿠키에 sessionId를 담아서 보내게된다는거같음
app.use(
  session({
    secret: "my-secret-key", //내 메모리에 저장할 데이터의 암호화 키
    resave: false, //세션 데이터가 변경되지 않았어도 계속 재저장할거냐
    saveUninitialized: true, //초기화되지 않은 세션을 저장소에 저장할거냐?
    cookie: {
      maxAge: 60000, //60초
    },
  })
);

// static 폴더를 정의
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

const users = [
  { id: 1, username: "user1", password: "pass1", hobby: "sleeping" },
  { id: 2, username: "user2", password: "pass2", hobby: "studying" },
  { id: 3, username: "user3", password: "pass3", hobby: "walking" },
];

app.post("/login", (req, res) => {
  //로그인 코드 개발
  const { username, password } = req.body; //이거 쓰려면 미들웨어로 파서 추가해야함
  console.log(
    `사용자로부터 받아온 username: ${username}, password: ${password}`
  );
  // const mybody = { ...req.body }; //안중요.
  // console.log(mybody);

  //사용자가 입력한 id/pw를 위의 users 자료구조에서 검색
  // let user = null;
  // for (let i = 0; i < users.length; i++) {
  //   if (users[i].username == username && users[i].password == password) {
  //     user = users[i];
  //     break;
  //   }
  // }

  const user = users.find(
    (u) => u.username == username && u.password == password
  );

  if (user) {
    req.session.user = user;
    res.json({ message: "로그인 성공" });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});

app.get("/profile", (req, res) => {
  console.log(req.session);
  const user = req.session.user;

  if (user) {
    res.json({ username: user.username, message: "프로필 정보" });
  } else {
    res.status(404).json({ message: "인증되지 않은 사용자임" });
  }
});

//로그아웃은 어덯게?
app.get("/logout", (req, res) => {
  const user = req.session.user;
  if (user && user.username) {
    req.session.destroy(); //서버에 있는 세션정보 삭제
    res.json({ message: "로그아웃성공" });
  } else {
    res.join({ message: "로그인한적없눈뎀???" });
  }
});

app.get("/check-login", (req, res) => {
  //세션 체크해서 .. 사용자에게 username 반납한다.
  const user = req.session.user;
  if (user) {
    res.json({ user: user.username });
  } else {
    res.status(401).json({ message: "로그인 안됨" });
  }
});

app.listen(port, () => {
  console.log("서버레디");
});
