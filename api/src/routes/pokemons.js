const { Router } = require("express");
const {
  getPokeInfo,
  getPokeDB,
  getPokemonApiName,
  getPokemonbyId,
  getAllPokemonData,
  postPokemon,
} = require("./Controllers/PokeController");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const {name}  = req.query;
    if (name) {
      let pokename = await getPokemonApiName(name);
      pokename=[pokename]
       res.status(200).send(pokename);
    } else {
      // const allPokemons= getAllPokemonData()
      res.status(200).send(await getAllPokemonData());
    }
  } catch {
    res.status(404).send("../404/PsyduckPC404.jpg");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokeId = await getPokemonbyId(id);
    if (pokeId) return res.status(200).send(pokeId);
  } catch {
    res.status(404).send("../404/PsyduckPC404.jpg");
  }
});

router.post("/", async (req, res) => {
  try {
    const pokeDataPost = req.body;
    await postPokemon(pokeDataPost);
    return res.status(200).send(pokeDataPost);
  } catch {
    res.status(404).send("../404/404Ash.jpg");
  }
});

module.exports = router;
