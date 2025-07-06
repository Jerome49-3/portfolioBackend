const express = require("express");
const axios = require("axios");
const router = express.Router();

//Get a list of comics
router.get(`/comics`, async (req, res) => {
  console.log("Im on a road /comics GET");

  // res.status(200).json({ message: "je suis sur la route GET /comics" });
  // console.log("req", req);
  const title = req.query.title || "";
  // console.log("title:", title);
  const limit = req.query.limit || 100;
  const skip = req.query.skip || 0;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY_MARVEL_REACTEUR}&title=${title}&limit=${limit}&skip=${skip}`
    );
    console.log("response /comics:", response?.data?.results);
    if (response) {
      const data = response?.data?.results;
      const count = response?.data?.count;
      // console.log("response.data.results", response.data.results);
      return res.status(200).json({
        dataMarv: {
          data,
          count: count,
        },
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});

//Get a list of comics containing a specific character
router.get(`/comics/:characterId`, async (req, res) => {
  console.log("Im on a road /comics/:characterId GET");
  // res.status(200).json({ message: "je suis sur la route GET /comics/:characterId" });
  // console.log("req", req);
  const characterId = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY_MARVEL_REACTEUR}`
    );
    console.log("response /comics/:characterId", response);
    if (response) {
      // console.log("response.data.results", response.data);
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
