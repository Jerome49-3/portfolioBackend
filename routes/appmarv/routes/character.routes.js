const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get(`/character/:characterId`, async (req, res) => {
  // res.status(200).json({ message: "je suis sur la route GET /character/:characterId" });
  // console.log("req", req);
  try {
    const characterId = req.params.characterId;
    // console.log("characterId:", characterId);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    // console.log("response.data:", response.data);
    if (response) {
      // console.log("response.data:", response.data);
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log("error", error.status, error.message);
  }
});

module.exports = router;
