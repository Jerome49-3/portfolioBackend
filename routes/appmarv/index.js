require("dotenv").config();
const express = require("express");
const router = express.Router({ mergeParams: true });

//***************** MONGOOSE ******************//
const mongoose = require("mongoose");
console.log("process.env.MONGODB_URI_MARV:", process.env.MONGODB_URI_MARV);
const conn = mongoose.createConnection(process.env.MONGODB_URI_MARV);
conn.on("connected", () => {
  console.log("connected to monggose");
});
conn.on("error", (error) => {
  console.log("error connection bdd:", error);
});
conn.on("disconnected", () => {
  console.log("disconnected to mongoose");
});

//***************** ROUTES ******************//
const characters = require("../appmarv/routes/characters.routes");
const character = require("../appmarv/routes/character.routes");
const comics = require("../appmarv/routes/comics.routes");
const comic = require("../appmarv/routes/comic.routes");
const login = require("../appmarv/routes/login.routes");
const signup = require("../appmarv/routes/signup.routes");

router.use(characters);
router.use(character);
router.use(comics);
router.use(comic);
router.use("/user", login);
router.use("/user", signup);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on my projet Marvel" });
});

module.exports = router;
