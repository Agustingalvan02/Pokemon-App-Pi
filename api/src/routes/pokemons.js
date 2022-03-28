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
  
    const {name}  = req.query;
    if (name) {
      let pokename = await getPokemonApiName(name.toLowercase());
       pokename=[pokename]
       pokename.length
        ?res.status(200).send(pokename.toLowercase())
       :res.send({error: 'Pokemon not found'});
    } else {
      res.status(200).send(await getAllPokemonData());
    }
 
});

router.get("/:id", async (req, res) => {
  
    const { id } = req.params;
    const pokeId = await getPokemonbyId(id);
    if (pokeId) return res.status(200).send(pokeId);
     else{

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
