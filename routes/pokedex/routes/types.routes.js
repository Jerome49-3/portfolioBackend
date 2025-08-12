const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

router.get("/types", async (req, res) => {
  console.log("je suis sur la route types (GET)");
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    if (response?.data) {
      console.log("response.data:", response?.data);
      (newCount = response?.data?.count),
        (newNext = response?.data?.next),
        (newPrevious = response?.data?.previous),
        (results = response?.data?.results);
      results = response?.data?.results;
      const newResults = [...results];
      const newArrayOfTypes = newResults.map((elTyp, index) => {
        console.log("elTyp in GET pokemons:", elTyp);
        console.log("index in GET pokemons:", index);
        const newIndex = index + 1;
        console.log("newIndex in GET pokemons:", newIndex);
        const newElTyp = { ...elTyp };
        console.log("newElTyp in GET pokemons:", newElTyp);
        const pokeUrl = newElTyp.url;
        const typName = newElTyp.name;
        const typImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/${newIndex}.png`;
        const objTyp = {
          name: typName,
          id: newIndex,
          url: pokeUrl,
          img: typImg,
        };
        // console.log("objTyp in GET pokemons:", objTyp);
        return objTyp;
      });
      // console.log("newArrayOfTypes in GET pokemons:", newArrayOfTypes);
      res.status(201).json({
        next: newNext,
        prev: newPrevious,
        count: newCount,
        results: newArrayOfTypes,
      });
    }
  } catch (error) {
    console.log("error in catch:", error);
  }
});

module.exports = router;
