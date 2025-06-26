require("dotenv").config();
const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

//************ import routes *******//

const login = require("./routes/auth/login.routes");
const signup = require("./routes/auth/signup.routes");

router.use("/auth", login);
router.use("/auth", signup);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on my projet airBnBed" });
});

module.exports = router;
