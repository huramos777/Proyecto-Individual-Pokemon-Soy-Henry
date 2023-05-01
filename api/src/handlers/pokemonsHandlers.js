const {
  getPokemonsApi,
  getPokemonsDb,
  getPokemonsApiById,
  getPokemonsDbById,
  getPokemonsApiByName,
  getPokemonsDbByName,
  createPokemon,
} = require("../controllers/pokemonsControllers");

//__________________GET ALL y GET BY NAME_________________
const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      //veo si hay un name
      const pokemonByNameDb = await getPokemonsDbByName(name);
      const pokemonByNameApi = await getPokemonsApiByName(name);
      const pokemonByName = [...pokemonByNameDb, ...pokemonByNameApi];
      pokemonByName.length === 0 //si el nombre no coincide hago esto
        ? res.send([{ name: "No se encontraron coincidencias" }])
        : res.send([...pokemonByNameDb, ...pokemonByNameApi]);
    } else {
      // si no hay nombre me traigo todo
      const dbPokemons = await getPokemonsDb();
      const apiPokemons = await getPokemonsApi();
      const allPokemons = [...dbPokemons, ...apiPokemons];
      res.send(allPokemons);
    }
  } catch (error) {
    // cualquier error cae aca
    res.status(400).send({ error: error.message });
  }
};

//__________________GET BY ID_________________
const getPokemonIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.toString().length > 12) {
      // si el length es mayor a 12 busca en la DB
      const pokemonById = await getPokemonsDbById(id);
      pokemonById.length === 0
        ? res.send("No se encontraron coincidencias")
        : res.send(pokemonById);
    } else {
      // si es menor que 12 busca en API
      const pokemonById = await getPokemonsApiById(id);
      pokemonById.length === 0
        ? res.send("No se encontraron coincidencias")
        : res.send(pokemonById);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//__________________POST POKEMON_________________
const createPokemonHandler = async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, types, img } =
    req.body;

  try {
    const newPokemon = await createPokemon(
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      img
    );

    res.send(`"${name.toUpperCase()}" se creo correctamente`);
    // res.send(newPokemon);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getPokemonsHandler,
  getPokemonIdHandler,
  createPokemonHandler,
};
