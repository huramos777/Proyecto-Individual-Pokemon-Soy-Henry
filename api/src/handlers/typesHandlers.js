const {getTypesDb} = require("../controllers/typesControllers")

const getTypesHandler = async (req, res) => {
    try {
      const types = await getTypesDb();
      res.send(types);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

module.exports = {
    getTypesHandler
}