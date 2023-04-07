const express = require("express");
const { cryptoPriceScrapper } = require("../../../functions/crypto");

const router = express.Router();

router.get("/crypto", async (req, res) => {
  try {
    const crypto = await cryptoPriceScrapper();
    return res.status(200).json({
      result: crypto,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      err: err.toString(),
    });
  }
});

module.exports = router;


