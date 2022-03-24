import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPokemons,
  filterByTypes,
  filterByName,
  filterByApiOrDb,
  filterByAttack,
} from "../../Actions/index";
import Cards from "../Cards/cards";
import Paginado from "../Paginado/paginado";
import NavBar from "../NavBar/navBar";
import SearchBar from "../SearchBar/searchBar";
import './home.css'
export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.pokeTypes);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexofLastPokemon = currentPage * pokemonsPerPage;
  const indexofFirstPokemon = indexofLastPokemon - pokemonsPerPage;
  console.log("AllPokemons: ",typeof allPokemons)
  const currentPokemon = allPokemons.slice(
    indexofFirstPokemon,
    indexofLastPokemon
  );
  const [renderPage, setRenderPage] = useState(" ");
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

console.log("Current Pokemons es: " + typeof currentPokemon)
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  function handleFilterByAttack(e) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterByAttack(e.target.value));
    setRenderPage(e.target.value);
  }
  function handleFilterByName(e) {
    e.preventDefault();
    dispatch(filterByName(e.target.value));
    setRenderPage(e.target.value);
  }
  function handleFilterByTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
    setRenderPage(e.target.value);
    console.log("FilterTypes: ",e.target.value)
  }

  function handleFilterByApiOrDb(e) {
    e.preventDefault();
    dispatch(filterByApiOrDb(e.target.value));
    setRenderPage(e.target.value);
  }
  return (
    <div>
      <NavBar />
      <div>
        <div>
          <select onChange={(e) => handleFilterByName(e)}>
            <option value="default" hidden>
              -Selección Alfabética-
            </option>
            <option value="A-Z"> A-Z </option>
            <option value="Z-A"> Z-A </option>
          </select>
        </div>
        <select onChange={(e) => handleFilterByTypes(e)}>
          <option value="default" hidden>
            -Selección De Tipos-
          </option>
          <option value="Todos">Todos </option>
          {types&&types?.map((poketypes) => (
            <option value={poketypes} key={poketypes}>
              {poketypes}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={(e) => handleFilterByAttack(e)}>
          <option value="default" hidden>
            -Mayor/Menor Ataque-
          </option>
          <option value="ascendente"> Mayor Ataque </option>
          <option value="descendente"> Menor Ataque </option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleFilterByApiOrDb(e)}>
          <option value="default" hidden>
            -Existentes/Creados-
          </option>
          <option value="API"> API </option>
          <option value="Database"> Creados </option>
        </select>
      </div>
      <div>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons?.length}
          paginado={paginado}
        />
      </div>
      <div>
        <SearchBar/>
      </div>
      <button
        className="refreshButton"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Refresh
      </button>
      <div className="CardContainer">
        {currentPokemon?.map((p) => {
          return (
            <div>
              {/* <Link to={'/Pokemons/'+p.id}> */}
              <Cards
                name={p.name}
                img={p.img}
                types={p.types.map((t) => t.name + " ")}
                // id={p.id}
              />
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
