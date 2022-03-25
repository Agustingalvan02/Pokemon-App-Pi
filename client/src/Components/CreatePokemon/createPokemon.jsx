import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../NavBar/nav";
import "./createPokemon.css";
function formValidation(input) {
  let formErrors = {};
  if (!input.name) {
    formErrors.name = "El campo nombre es requerido";
  }
  if (input.healthPoints< 0 || input.healthPoints > 100) {
    formErrors.healthPoints = "Los puntos de salud deben ser entre 1 y 100";
  }
  if (input.speed < 0 || input.speed > 100) {
    formErrors.defense = "Los puntos de velocidad deben ser entre 1 y 100";
  }
  if (input.attack < 0 || input.attack > 100) {
    formErrors.attack = "Los puntos de ataque deben ser entre 1 y 100";
  }

  if (input.defense < 0 || input.defense > 100) {
    formErrors.defense = "Los puntos de defensa deben ser entre 1 y 100";
  }
  if (input.height < 0 || input.height > 100) {
    formErrors.defense = "La altura debe ser entre 1 y 100";
  }
  if (input.weight < 0 || input.weight > 100) {
    formErrors.defense = "El peso debe ser entre 1 y 100";
  }
  if (input.types.length < 2) {
    formErrors.types = "Debes elegir al menos 2 Tipos!";
  }
  return formErrors;
}

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const  types = useSelector((state) => state.pokeTypes);
  const [formErrors, setFormErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    img: "",
    healthPoints: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setFormErrors(
      formValidation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(e)
  }

  function handleSelect(e) {
    setInput({
      ...input,
       types: [...input.types, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(formErrors).length > 0||input.name==="") {
      alert("Porfavor rellena los campos requeridos!");
    } else {
      dispatch(postPokemon(input));
      alert("Pokemon Creado!");
      setInput({
        name: "",
        sprites: " ",
        healthPoints: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
      })
      history.push("/home");
    }
  }
  return (
    <div className="formDiv">
      {/* <NavBar /> */}
      <h1>Crea a tu Pokémon!</h1>
      <form className="FormStyle" onSubmit={(e) => handleSubmit(e)}>
        <div className="divForm">
          <label>Nombre:</label> <br />
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {formErrors.name && <p>{formErrors.name}</p>}
        </div>
        <div className="divForm">
          <label>Puntos de Salud:</label> <br />
          <input
            type="number"
            value={input.healthPoints}
            name="healthPoints"
            onChange={(e) => handleChange(e)}
          />
          {formErrors.healthPoints && <p>{formErrors.healthPoints}</p>}
        </div>
        <div className="divForm">
          <label>Puntos de Ataque:</label> <br />
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
          {formErrors.attack && <p>{formErrors.attack}</p>}
        </div>
        <div className="divForm">
          <label>Puntos de Defensa:</label> <br />
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
          {formErrors.defense && <p>{formErrors.defense}</p>}
        </div>
        <div className="divForm">
          <label>Velocidad:</label> <br />
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
          {formErrors.speed && <p>{formErrors.speed}</p>}
        </div>
        <div className="divForm">
          <label> Altura:</label> <br />
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          {formErrors.height && <p>{formErrors.height}</p>}
        </div>
        <div className="divForm">
          <label> Peso:</label> <br />
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          {formErrors.weight && <p>{formErrors.weight}</p>}
        </div>
        <div className="divForm">
          <label>Imagen:</label> <br />
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="divForm">
          <select onChange={(e) => handleSelect(e)}>
            <option value="default">-Seleccion el tipo-</option>
            { types &&
               types.map((poketypes) => (
                <option value={poketypes} key={poketypes}>
                  {poketypes}
                </option>
              ))}
          </select>
          <ul>
            <li>{input.types.map((t) => t + ",")}</li>
          </ul>
          
        </div>
       
             
             <button type="submit">Crear Pokémon!</button>
             {/* <button disabled type="submit">Rellena los campos!</button> */}
        
      </form>
    </div>
  );
}
