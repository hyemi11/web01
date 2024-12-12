require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

const apiSecretKey = process.env.TOSS_SECRET_KEY;
const encodedApiSecretKey =
  "Basic " + Buffer.from(apiSecretKey + ":").toString("base64"); //secretKey 인코딩해서 변수로 저장하기
//   console.log(encodedApiSecretKey);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product.html"));
});

//최종 결제 승인 요청을 토스에게 보내기
app.post("/confirm/payment", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;
  console.log(paymentKey, orderId, amount);

  try {
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: encodedApiSecretKey,
          "Content-Type": "application/json",
        },
      }
    );

    //결제 승인 성공
    res.status(200).json(response.data);
  } catch (error) {
    console.error("최종 결제 승인 요청 실패", error.message);
    res.status(400).json({ message: "결제 승인 실패" });
  }
});

app.listen(PORT, () => {
  console.log(`서버레디온 http://localhost:${PORT}`);
});
