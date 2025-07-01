const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const { SHA256 } = require("crypto-js");
const encBase64 = require("crypto-js/enc-base64");
const fileUpload = require("express-fileupload");

//********* MODEL USER ***********//
const UserMarv = require("../models/User.js");

router.post("/signup", fileUpload(), async (req, res) => {
  // return res.status(200).json({ message: "je suis sur la route /signup" });
  console.log("je suis sur la route /signup");
  const { password, username, email } = req.body;
  console.log("req.body", req.body);
  if (!password && !email) {
    return res.status(400).json({ message: "bad request" });
  } else {
    const userExist = await UserMarv.findOne({ email: email });
    console.log("userExist", userExist);
    if (userExist) {
      return res.status(400).json({ message: "bad request" });
    } else {
      try {
        const salt = uid2(24);
        // console.log("salt:", salt);
        const hash = SHA256(password + salt).toString(encBase64);
        // console.log("hash:", hash);
        const token = uid2(64);
        // console.log("token:", token);
        if ((hash && token !== null) || (hash && token !== undefined)) {
          const newUser = new UserMarv({
            email: email,
            account: {
              username: username,
            },
            token: token,
            hash: hash,
            salt: salt,
          });
          console.log("newUser before save:", newUser);
          await newUser.save();
          console.log("newUser after save:", newUser);
          return res.status(201).json(newUser);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }
});

module.exports = router;
