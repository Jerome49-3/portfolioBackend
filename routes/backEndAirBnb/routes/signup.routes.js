const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uid2 = require("uid2");
const { SHA256 } = require("crypto-js");
const encBase64 = require("crypto-js/enc-base64");
const fileUpload = require("express-fileupload");

// router.get("/signup", (req, res) => {
//   return res.status(200).json({ message: "route signup" });
// });

router.post("/signup", async (req, res) => {
  // return res.status(200).json({ message: "je suis sur la route /signup" });
  const { username, email, password, confirmPassword, description } = req.body;
  console.log("req.body:", req.body);
  // console.log("req.body", req.body);
  if (password !== undefined && email !== undefined) {
    const userExist = await User.findOne({ email: email });
    // console.log("userExist", userExist);
    // si l'utilisateur existe, retourner un mssg d'erreur
    if (userExist) {
      return res.status(400).json({ message: "bad request" });
    }
    //sinon si password est egale à confirmPassword alors:
    else {
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "les deux mots de passe ne sont pas identiques" });
      } else {
        try {
          const salt = uid2(24);
          console.log("salt:", salt);
          const hash = SHA256(password + salt).toString(encBase64);
          console.log("hash:", hash);
          const token = uid2(64);
          console.log("token:", token);
          if ((hash && token !== null) || (hash && token !== undefined)) {
            const newUser = new User({
              email: email,
              account: {
                username: username,
                description: description,
              },
              token: token,
              hash: hash,
              salt: salt,
            });
            console.log("newUser before save:", newUser);
            await newUser.save();
            console.log("newUser after save:", newUser);
            res.status(201).json({
              newUser,
              message: "user created",
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  }
});

module.exports = router;
