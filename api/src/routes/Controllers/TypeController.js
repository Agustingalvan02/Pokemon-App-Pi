const { Types } = require("../../db");
const axios = require("axios");


const ArrayTypes = (TypesArr) => {
  let types = TypesArr.map((type) => type.name);
  return types;

};
const pokeType = async () => {
  
  try {
    const typesDB = await Types.findAll({
      attributes: ['name'],
    });
    if (typesDB.length === 0) {
      const pokeTypesUrl = await axios.get("https://pokeapi.co/api/v2/type");
      let pokeTypesDb = pokeTypesUrl.data.results.map((types) =>
        Types.create({ name: types.name })
        );
        const pokeTypesCreated = await axios.all(pokeTypesDb);
        const getTypesApi = ArrayTypes(pokeTypesCreated);
        return getTypesApi;
      } else {
        const getTypesFromDb=ArrayTypes(typesDB)
        return getTypesFromDb
      }
    } catch (error) {
      console.log("Hay error en la ruta Type!",error)
    }
  };
  
module.exports={
    pokeType,
}
