const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

router.get("/pokemons", async (req, res) => {
  console.log("je suis sur la route pokemons (GET)");
  const offset = req.query.offset;
  console.log("offset in Home:", offset);
  const limit = req.query.limit;
  // console.log("limit in Home:", limit);

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    if (response?.data) {
      // console.log("response.date in Home:", response?.data);
      (newCount = response?.data?.count),
        (newNext = response?.data?.next),
        (newPrev = response?.data?.previous),
        (results = response?.data?.results);
      const newResults = [...results];
      const newArrayOfPokemons = newResults.map((elPok, index) => {
        // console.log("elPok in GET pokemons:", elPok);
        // console.log("index in GET pokemons:", index);
        const newIndex = index + 1;
        // console.log("newIndex in GET pokemons:", newIndex);
        const newElPok = { ...elPok };
        // console.log("newElPok in GET pokemons:", newElPok);
        const pokeUrl = new URL(newElPok.url);
        // console.log("pokeUrl in GET pokemons:", pokeUrl);
        const idStr = pokeUrl.pathname
          .split("/")
          .filter((el) => {
            // console.log("el in filterUrl:", el);
            // console.log("typeof el in filterUrl:", typeof el);
            const newEl = Number(el);
            // console.log("typeof newEl in filterUrl:", typeof newEl);
            if (typeof newEl === "number") {
              return newEl;
            }
          })
          .join("");
        // console.log("idStr in GET pokemons:", idStr);
        const id = Number(idStr);
        const pokeName = newElPok.name;
        const pokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        const objPokemon = {
          name: pokeName,
          id: newIndex,
          url: pokeUrl,
          img: pokeImg,
        };
        // console.log("objPokemon in GET pokemons:", objPokemon);
        return objPokemon;
      });
      // console.log("newArrayOfPokemons in GET pokemons:", newArrayOfPokemons);
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
