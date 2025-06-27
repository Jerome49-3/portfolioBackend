const express = require("express");
const axios = require("axios");
const router = express.Router();

//Get all informations of specific comic
router.get(`/comic/:comicId`, async (req, res) => {
  // res.status(200).json({ message: "je suis sur la route GET /comic/:comicId" });
  // console.log("req", req);
  const comicId = req.params.comicId;
  // console.log("comicId:", comicId);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    // console.log("response", response);
    if (response) {
      // console.log("response.data.results", response.data);

      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
