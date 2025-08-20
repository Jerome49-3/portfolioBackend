const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

router.get("/item/:id", async (req, res) => {
  console.log("je suis sur la route item(GET)");

  try {
    const id = req.params.id;
    console.log("id", id);
    const response = await axios
      .get(`https://pokeapi.co/api/v2/item/${id}`)
      .then((response) => {
        res.status(201).json({ results: response?.data });
      })
      .catch((error) => {
        console.log("error", error);
      });
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
