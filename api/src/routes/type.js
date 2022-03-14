const { Router } = require("express");
const router = Router();
const{pokeType}=require("./Controllers/TypeController")
router.get('/',async(req,res)=>{
    try{
     let typesData=await pokeType();
      return res.status(200).send(typesData)
    }
    catch(error){
     res.status(400).send("No se han mandado los tipos",error)
    }
})
module.exports = router;