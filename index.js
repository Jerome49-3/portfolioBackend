require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
/********* CORS **********/
const cors = require("cors");

console.log(
  "process.env.URL_CORS_FRONTEND_APPMARV on index.js:",
  process.env.URL_CORS_FRONTEND_APPMARV
);
const corsOptions = {
  origin: "*",
  // origin: [
  //   process.env.URL_CORS_FRONTEND_APPMARV,
  //   process.env.URL_CORS_FRONTEND_LOCALHOST,
  // ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("{*splat}", cors(corsOptions));
/********* ROUTES **********/
const airBnBed = require("./routes/airbnbed/index.js");
const appMarv = require("./routes/appmarv/index.js");

app.use("/airbnbed", airBnBed);
app.use("/appmarv", appMarv);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on my portfolio Backend" });
});

app.all("{*splat}", (req, res) => {
  console.log("All routes");
});
app.listen(process.env.PORT, (req, res) => {
  console.log("server on");
});
