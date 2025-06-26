require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
/********* CORS **********/
app.use(cors());

/********* ROUTES **********/
const airBnBed = require("./routes/backEndAirBnb/index.js");
app.use("/airbnbed", airBnBed);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on my portfolio Backend" });
});

app.all("{*splat}", (req, res) => {
  console.log("All routes");
});
app.listen(process.env.PORT, (req, res) => {
  console.log("server on");
});
