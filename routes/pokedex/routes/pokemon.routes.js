const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const pokePromise = require("../lib/pokePromise");

router.get("/pokemon/:pokeName", async (req, res) => {
  console.log("je suis sur la route pokemon/:id (GET)");

  try {
    const pokeName = req.params.pokeName;
    // console.log("pokeName on /pokemon/:pokeName:", pokeName);
    try {
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
      const pokeUrlsArr = [
        `https://pokeapi.co/api/v2/location/${pokeId}`,
        `https://pokeapi.co/api/v2/region/${pokeId}`,
        `https://pokeapi.co/api/v2/evolution-chain/${pokeId}`,
        `https://pokeapi.co/api/v2/encounter-method/${pokeId}`,
        `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`,
      ];
      const pokeUrlsForMap = pokeUrlsArr.map((url) => {
        return axios.get(url);
      });
      // console.log("pokeUrlsForMap:", pokeUrlsForMap);
      const pokeArrFinal = await pokePromise(pokeUrlsForMap);
      // console.log("pokeArrFinal:", pokeArrFinal);
      const pokeArrFinally = pokeArrFinal.map((result) => {
        console.log("result:", result);
        if (result.status === "fulfilled") {
          return result.value.data;
        }
      });
      // console.log("pokeArrFinally:", pokeArrFinally);
      const pokemonData = {
        results: response?.data,
        images: imagesArr,
        imgsArrLength: arrImgsLength,
        moreResults: pokeArrFinally,
      };
      res.status(201).json(pokemonData);
    } catch (error) {
      console.log("error:", error);
    }
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
