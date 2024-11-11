const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 6000,
    },
  })
);

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
  const { username, password } = req.body;
  console.log(
    `사용자로 부터 받아온 username: ${username}, password: ${password}`
  );

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

app.get("/logout", (req, res) => {});
