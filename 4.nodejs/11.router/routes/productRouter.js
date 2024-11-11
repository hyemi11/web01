const express = require("express");
const router = express.Router();

//라우트 체인
router.get("/list", (req, res) => {
  res.send("상품목록출력");
});
router.get("/details", (req, res) => {
  res.send("상품상세목록출력");
});
router.get("/:id/details", (req, res) => {
  const productId = req.params.id;
  res.send(`상품 개별 ${productId} 상세 목록 출력`);
});

module.exports = router;
