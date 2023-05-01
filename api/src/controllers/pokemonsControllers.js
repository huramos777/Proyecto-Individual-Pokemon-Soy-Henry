const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Op, where } = require("sequelize");

const getPokemonsApi = async () => {
  const api = await axios(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=60"
  );

  const pokemonUrl = [];
  const pokemons = api.data.results;

  pokemons.map((r) => {
    pokemonUrl.push(axios.get(r.url).then((response) => response.data));
  });
  const pokemonProps = Promise.all(pokemonUrl).then(
    (
      response //mapeamos las propiedades individuales
    ) =>
      response.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          hp: pokemon.stats[0].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          speed: pokemon.stats[3].base_stat,
          height: pokemon.height,
          weight: pokemon.weight,
          types: pokemon.types.map((r) => r.type.name).join(", "),
          img: pokemon.sprites.other.dream_world.front_default,
        };
      })
  );
  return pokemonProps;
};

const getPokemonsDb = async () => {
  const pokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //////////
  const mapeados = pokemons.map((el) => {
    return {
      id: el.id,
      name: el.name,
      hp: el.hp,
      attack: el.attack,
      defense: el.defense,
      speed: el.speed,
      height: el.height,
      weight: el.weight,
      types: el?.types && el.types.map((el) => el.name).join(", "),
      img: el.img,
      created: el.created,
    };
  });
  //////////////
  return mapeados;
};

const getPokemonsApiByName = async (name) => {
  const pokemonsApi = await getPokemonsApi();
  const pokemonByName = pokemonsApi.filter((pokemon) => {
    if (pokemon.name.toLowerCase().includes(name.toLowerCase())) {
      return pokemon;
    }
  });
  return pokemonByName;
};

const getPokemonsDbByName = async (name) => {
  const pokemonByName = await Pokemon.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //////////
  const mapeados = pokemonByName.map((el) => {
    return {
      id: el.id,
      name: el.name,
      hp: el.hp,
      attack: el.attack,
      defense: el.defense,
      speed: el.speed,
      height: el.height,
      weight: el.weight,
      types: el?.types && el.types.map((el) => el.name).join(", "),
      img: el.img,
      created: el.created,
    };
  });
  //////////////

  return mapeados;
};

const getPokemonsApiById = async (id) => {
  const pokemonsApi = await getPokemonsApi();
  const pokemonById = pokemonsApi.filter((pokemon) => {
    if (pokemon.id == id) {
      return pokemon;
    }
  });
  return pokemonById;
};

const getPokemonsDbById = async (id) => {
  const pokemonDb = await Pokemon.findAll({
    where: { id: id },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return pokemonDb;
};

const createPokemon = async (
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
  img
) => {
  const newPokemon = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
  });
  if (types) {
    await newPokemon.addTypes(types);
  }
};

module.exports = {
  getPokemonsApi,
  getPokemonsDb,
  getPokemonsApiById,
  getPokemonsDbById,
  getPokemonsApiByName,
  getPokemonsDbByName,
  createPokemon,
};

/* 

const getPokemonsDb = async () => {
  const pokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return pokemons;
};

const getPokemonsApi = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
    .then(response => response.json())
    .then(data => {
      const pokemonUrl = [];
      const pokemons = data.results;

      pokemons.map((r) => {
        pokemonUrl.push(fetch(r.url).then((response) => response.json()));
      });
      const pokemonProps = Promise.all(pokemonUrl).then(
        (response) => 
          response.map((pokemon) => {
            return {
              id: pokemon.id,
              name: pokemon.name,
              hp: pokemon.stats[0].base_stat,
              attack: pokemon.stats[1].base_stat,
              defense: pokemon.stats[2].base_stat,
              speed: pokemon.stats[3].base_stat,
              height: pokemon.height,
              weight: pokemon.weight,
              types: pokemon.types.map((r) => r.type.name).join(", "),
              img: pokemon.sprites.other.dream_world.front_default,
            };
          })
      );
      return pokemonProps;
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

*/
