const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const port = 3000;

const products = [
  { id: 1, name: "바나나", price: 2000 },
  { id: 2, name: "사과", price: 3000 },
  { id: 3, name: "오렌지", price: 1000 },
];

//정적 폴더를 public으로 정의
//그말인즉, 사용자가 루트를 요청해서, 그중에 없으면? 여기를 뒤져서 있는 파일 가져가라는거
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  console.log(`카트요청: ${JSON.stringify(cart)}`);
  res.json(cart);
});

app.post("/add-to-cart/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "상품이없다!" });
  }
  //장바구니에 담는 코드
  const cart = req.session.cart || [];

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
  });

  req.session.cart = cart;
  console.log(cart);

  res.json({ message: "상품이 장바구니에 담겼습니다" });
});

app.listen(port, () => {
  console.log("서버레디");
});
