const { Type } = require("../db");

const getTypesDb = async () => {
  const types = await Type.findAll({
    attributes: ["id", "name"],
  });
  return types;
};

module.exports = {
  getTypesDb,
};