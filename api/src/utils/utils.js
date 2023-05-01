const { Type } = require("../db");
const axios = require("axios");

const cargaTypes = async () => {
  const tipos = await axios(`https://pokeapi.co/api/v2/type`);
  const types = tipos.data.results.map((type) => type.name);
  types.forEach(
    async (type) =>
      await Type.findOrCreate({
        where: { name: type },
      })
  );

  console.log("Types pre-cargados");
};

module.exports = {
  cargaTypes,
};

/* 

const { Type } = require("../db");
const axios = require("axios");

const cargaTypes = async () => {
  const tipos = await axios(`https://pokeapi.co/api/v2/type`);
  const types = tipos.data.results.map((type) => type.name);
  types.forEach(
    async (type) =>
      await Type.findOrCreate({
        where: { name: type },
      })
  );

  console.log("Types pre-cargados");
};

module.exports = {
  cargaTypes,
};


*/
