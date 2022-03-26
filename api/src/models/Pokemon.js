const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
     type: DataTypes.UUID,
     defaultValue:DataTypes.UUIDV4,
     allowNull:false,
     primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type:DataTypes.STRING,
      defaultValue:"https://w7.pngwing.com/pngs/394/914/png-transparent-pokemon-go-pokemon-diamond-and-pearl-poke-ball-pokemon-go-game-video-game-pokemon.png"
    },
    healthPoints:{
      type:DataTypes.INTEGER,

    },
    attack:{
      type:DataTypes.INTEGER
    },
    defense:{
      type: DataTypes.INTEGER
    },
    speed:{
      type: DataTypes.INTEGER
    },
    height:{
      type:DataTypes.INTEGER
    },
    weight:{
      type:DataTypes.INTEGER
    },
    createInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
    }
  });
};
