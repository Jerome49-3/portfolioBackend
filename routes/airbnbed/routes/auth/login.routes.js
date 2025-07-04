const express = require("express");
const router = express.Router();
const { SHA256 } = require("crypto-js");
const encBase64 = require("crypto-js/enc-base64");
const fileUpload = require("express-fileupload");

//********* MODEL USER ***********//
const User = require("../../../appmarv/models/User");
// router.get("/login", (req, res) => {
//   return res.status(200).json({ message: "route login" });
// });

router.post("/login", fileUpload(), async (req, res) => {
  // return res.status(200).json({ message: "je suis sur la route /login" });
  try {
    const { password, email } = req.body;
    console.log("req.body:", req.body);
    if (password !== undefined && email !== undefined) {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "bad request: have you an account ?" });
      } else {
        const pwdHash = SHA256(password + user.salt).toString(encBase64);
        if (pwdHash === user.hash) {
          // console.log('user:', user);
          return res.status(200).json({
            _id: user.id,
            token: user.token,
            account: user.account,
            message: "login succesfully",
          });
        } else {
          return res.status(400).json({ message: "password does not match" });
        }
      }
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
