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
    const pokeId = response?.data?.id;
    const imgBackDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeId}.png`;
    const imgBackShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokeId}.png`;
    const imgFrontDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
    const imgFrontShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeId}.png`;
    const imagesArr = [
      imgFrontDefault,
      imgBackDefault,
      imgFrontShiny,
      imgBackShiny,
    ];
    const arrImgsLength = imagesArr.length;
    const species = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`
    );
    console.log("species.data on /pokemon/:pokeName:", species.data);
    const pokemonData = {
      results: response?.data,
      images: imagesArr,
      imgsArrLength: arrImgsLength,
      species: species?.data,
    };
    res.status(201).json(pokemonData);
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
