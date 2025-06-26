require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const airBnBed = require("./routes/backEndAirBnb/index.js");
app.use("/airBnBed", airBnBed);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on my portfolio Backend" });
});

app.all("*", (req, res) => {
  console.log("All routes");
});
app.listen(process.env.PORT, (req, res) => {
  console.log("server on");
});
