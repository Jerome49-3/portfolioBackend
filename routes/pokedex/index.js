require("dotenv").config();
const express = require("express");
const router = express.Router({ mergeParams: true });

const pokemons = require("./routes/pokemons.routes");
const pokemon = require("./routes/pokemon.routes");
const types = require("./routes/types.routes");
router.use(pokemons);
router.use(pokemon);
router.use(types);
router.get("/", (req, res) => {
  console.log("je suis sur la route get / at projet pokedex");
  res.status(200).json({ message: "Welcome on my pokedex project" });
});

//add routes all *:
router.all("{*splat}", (req, res) => {
  console.log("all routes on my pokedex project");
  res.status(404).json({ message: "All routes on my pokedex project" });
});

module.exports = router;
