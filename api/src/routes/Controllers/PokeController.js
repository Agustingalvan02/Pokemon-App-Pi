
const { Pokemon, Types } = require("../../db");
const axios = require("axios");

const getPokeInfo = async () => {
  try {
    const pokeDataUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?&limit=40"
    );
    const ApiPokeSubReq = await pokeDataUrl.data.results.map((obj) =>
      axios.get(obj.url)
    );
    const totalPokeInfo = await axios.all(ApiPokeSubReq);
    let pokemons = totalPokeInfo.map((obj) => obj.data);
    let dataPokeInfo = pokemons.map((pokemon) => pokeObj(pokemon));
    return dataPokeInfo;
  } catch (err) {
    console.log(err, "Algo ha salido mal al traer los datos de la Api!");
  }
};

const pokeObj = (p) => {
  const pokeObj = {
    id: p.id,
    name: p.name,
    sprites:p.sprites.other.dream_world.front_default,
    healthPoints: p.healthPoints,
    attack: p.stats[1].base_stat,
    defense: p.stats[2].base_stat,
    speed: p.stats[5].base_stat,
    height: p.height,
    weight: p.weight,
    types: p.types.length < 2 ? [{ name: p.types[0].type.name}] : [{ name: p.types[0].type.name}, { name: p.types[1].type.name}],
  };
  return pokeObj;
};

const getPokeDB = async () => {
  try {
    return await Pokemon.findAll({
      include: Types,
      attributes: ['name'],
    });
  } catch (error) {
    console.log("Hay un error en la base de datos!", error);
  }
};

const getAllPokemonData = async () => {
  try {
    const pokeApi = await getPokeInfo();
    const pokeDB = await getPokeDB();
    return [...pokeApi,...pokeDB];
  } catch (error) {
    console.log(error, "Error al concatenar los datos!");
  }
};

const getPokemonApiName = async (name) => {
  try {
    const pokeNameDb = await Pokemon.findOne({
      where: { name },
      include: { model: Types },
    });

    if (pokeNameDb) {
      let pokeDataDb = {
        id: pokeNameDb.id,
        name: pokeNameDb.name,
        img: pokeNameDb.img,
        healthPoints: pokeNameDb.healthPoints,
        attack: pokeNameDb.attack,
        defense: pokeNameDb.defense,
        speed: pokeNameDb.speed,
        height: pokeNameDb.height,
        weight: pokeNameDb.weight,
        types:
          pokeNameDb.types.lenght < 2
            ? [pokeNameDb.types[0]]
            : [pokeNameDb.types[0], pokeNameDb.types[1]],
      };
      return pokeDataDb;
    } else {
      const pokemonbyName = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const responsePokebyname = pokeObj(pokemonbyName.data);
      return responsePokebyname;
    }
  } catch (error) {
    console.log(
      "Algo salió mal al buscarlo en la busqueda por nombre :(",
      error
    );
  }
};

const getPokemonbyId = async (id) => {
  try {
    if (id.lenght > 2) {
      const searchPokeDb = await Pokemon.findOne({
        where: { id },
        include: Types,
      });
      let pokeDbId = {
        id: searchPokeDb.id,
        name: searchPokeDb.name,
        img: searchPokeDb.img,
        healthPoints: searchPokeDb.healthPoints,
        attack: searchPokeDb.attack,
        defense: searchPokeDb.defense,
        speed: searchPokeDb.speed,
        height: searchPokeDb.height,
        weight: searchPokeDb.weight,
        types:
        searchPokeDb.types.lenght < 2
            ? [searchPokeDb.types[0]]
            : [searchPokeDb.types[0], searchPokeDb.types[1]],
      };
      return pokeDbId;
    } else {
      const searchPokebyId = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const resPokebyId = pokeObj(searchPokebyId.data);
      return resPokebyId;
    }
  } catch (error) {
    console.log("Fallo en la busqueda por Id :c", error);
  }
};

const postPokemon = async (pokeDataPost) => {
  try {
    const {
      
      name,
      img,
      healthPoints,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    } = pokeDataPost;
    const pokeCreate = await Pokemon.create({
      name,
      img,
      healthPoints,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    const pokeCreateDb = await Types.findAll({
      where: { name: types },
    });
    let pokecreateType = await pokeCreate.addType(pokeCreateDb);
    return pokecreateType;
  } catch (error) {
    console.log("No se ha podido crear tu Pokemon :/", error);
  }
};

module.exports={
    getPokeInfo,
    getPokeDB,
    getPokemonApiName,
    getPokemonbyId,
    getAllPokemonData,
    postPokemon
}