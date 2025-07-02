require("dotenv").config();
const express = require("express");
const router = express.Router({ mergeParams: true });

//***************** MONGOOSE ******************//
const mongoose = require("mongoose");
// console.log("process.env.MONGODB_URI_MARV:", process.env.MONGODB_URI_MARV);
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
router.all("{*splat}", (req, res) => {
  console.log(
    "req.method:",
    req.method,
    "\n",
    "req.url:",
    req.url,
    "\n",
    "req.headers.origin:",
    req.headers.origin,
    "\n",
    "req.headers.referer:",
    req.headers.referer,
    "\n",
    "req.headers['access-control-request-method']:",
    req.headers["access-control-request-method"],
    "\n",
    "req.headers['access-control-request-headers']:",
    req.headers["access-control-request-headers"],
    "\n",
    "req.ip:",
    req.ip,
    "\n",
    "req.connection.remoteAddress:",
    req.connection.remoteAddress
  );

  console.log("All routes in /appmarv");
});

module.exports = router;
