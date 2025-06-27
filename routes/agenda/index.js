require("dotenv").config();
const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
mongoose.createConnection(process.env.MONGODB_URI);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on my projet agenda" });
});

module.exports = router;
