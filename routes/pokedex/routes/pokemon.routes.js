const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

router.get("/pokemon/:pokeName", async (req, res) => {
  console.log("je suis sur la route pokemon/:id (GET)");

  try {
    const pokeName = req.params.pokeName;
    console.log("pokeName on /pokemon/:pokeName:", pokeName);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );
    // console.log("response.data on /pokemon/:pokeName:", response.data);
    const id = response?.data?.id;
    const imgBackDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    const imgBackShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`;
    const imgFrontDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const imgFrontShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
    const species = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    // console.log("species.data on /pokemon/:pokeName:", species.data);
    res.status(201).json({
      results: response.data,
      images: [imgFrontDefault, imgBackDefault, imgFrontShiny, imgBackShiny],
      // species: species,
    });
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
