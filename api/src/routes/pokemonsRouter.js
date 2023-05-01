const { Router } = require("express");
const pokemonsRouter = Router();
const {
  getPokemonsHandler,
  getPokemonIdHandler,
  createPokemonHandler,
  getPokemonAttackHandler,
} = require("../handlers/pokemonsHandlers");

pokemonsRouter.get("/", getPokemonsHandler);

pokemonsRouter.get("/:id", getPokemonIdHandler);

pokemonsRouter.post("/", createPokemonHandler);

module.exports = {
  pokemonsRouter,
};
