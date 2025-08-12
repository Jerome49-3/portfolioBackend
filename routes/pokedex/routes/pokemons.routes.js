const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

router.get("/pokemons", async (req, res) => {
  console.log("je suis sur la route pokemons (GET)");

  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    if (response?.data) {
      console.log("response.date in Home:", response?.data);
      (newCount = response?.data?.count),
        (newNext = response?.data?.next),
        (newPrev = response?.data?.previous),
        (results = response?.data?.results);
      const newResults = [...results];
      const newArrayOfPokemons = newResults.map((elPok, index) => {
        console.log("elPok in GET pokemons:", elPok);
        console.log("index in GET pokemons:", index);
        const newIndex = index + 1;
        console.log("newIndex in GET pokemons:", newIndex);
        const newElPok = { ...elPok };
        console.log("newElPok in GET pokemons:", newElPok);
        const pokeUrl = newElPok.url;
        const pokeName = newElPok.name;
        const pokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newIndex}.png`;
        const objPokemon = {
          name: pokeName,
          id: newIndex,
          url: pokeUrl,
          img: pokeImg,
        };
        console.log("objPokemon in GET pokemons:", objPokemon);
        return objPokemon;
      });
      console.log("newArrayOfPokemons in GET pokemons:", newArrayOfPokemons);
      res.status(201).json({
        count: newCount,
        next: newNext,
        prev: newPrev,
        results: newArrayOfPokemons,
      });
    }
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
