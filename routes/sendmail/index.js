require("dotenv").config();
const express = require("express");
const router = express.Router({ mergeParams: true });

//add routes send-mail:
const sendMail = require("./routes/send-mail.routes");
router.use(sendMail);

//add routes get /:
router.get("/", (req, res) => {
  console.log("je suis sur la route get / at projet senMail");
  res.status(200).json({ message: "Welcome on my sendMail project" });
});

//add routes all *:
router.all("{*splat}", (req, res) => {
  console.log("all routes");
  res.status(404).json({ message: "All routes" });
});

// //add listen:
// app.listen(process.env.PORT, () => {
//   console.log("server started");
// });

module.exports = router;
