import React, { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTypes,
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
import "./home.css";
import pokenotfound from "../../image/PsyduckPC404.jpg"
// import PokeHome from "../../image/PokeHome.jpg"
export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.pokeTypes);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexofLastPokemon = currentPage * pokemonsPerPage;
  const indexofFirstPokemon = indexofLastPokemon - pokemonsPerPage;
  const [renderPage, setRenderPage] = useState();
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const currentPokemon = allPokemons.slice(
    indexofFirstPokemon,
    indexofLastPokemon
  ); 
  


  useEffect(() => {
    dispatch(getTypes())
    setRenderPage(allPokemons);
    setCurrentPage(1);
  }, [dispatch,allPokemons]);
  
  
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    var dropDownOne = document.getElementById("valueFiltersAt");
    dropDownOne.selectedIndex = "default";
    
    var dropDownTwo = document.getElementById("valueFiltersAZ");
    dropDownTwo.selectedIndex = "default";

    var dropDownThree = document.getElementById("valueFiltersType");
    dropDownThree.selectedIndex = "default";

    var dropDownFour = document.getElementById("valueFiltersADB");
    dropDownFour.selectedIndex = "default";
  }
  function handleFilterByAttack(e) {
    e.preventDefault();
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
  }

  function handleFilterByApiOrDb(e) {
    e.preventDefault();
    dispatch(filterByApiOrDb(e.target.value));
    setRenderPage(e.target.value);
  }

  
  //  const respuesta= useSelector(state=>state.pokemons)
  //  console.log(respuesta);
    return (
      <div>
        {allPokemons&&allPokemons!=="Pokemon not found"? 
      <div className="container">

        <NavBar />
        <div>
          <div className="filtros">
            <select id="valueFiltersAZ" className="selectFiltros" onChange={(e) => handleFilterByName(e)}>
              <option value="default" hidden>
                -Selección Alfabética-
              </option>
              <option value="A-Z"> A-Z </option>
              <option value="Z-A"> Z-A </option>
            </select>
          </div>
          <div className="filtros">
            <select  id="valueFiltersType" autoComplete="off" className="selectFiltros" onChange={(e) => handleFilterByTypes(e)}>
              <option defaultValue="-Selección De Tipos-" hidden>
                -Selección De Tipos-
              </option>
              <option value="Todos">Todos </option>
              {types &&
                types.map((poketypes) => (
                  <option value={poketypes} key={poketypes}>
                    {poketypes}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="filterContainer">
          <div className="filtros">
            <select id="valueFiltersAt" autoComplete="off" className="selectFiltros" onChange={(e) => handleFilterByAttack(e)}>
              <option defaultValue="-Mayor/Menor Ataque-" value="default" hidden>
                 -Mayor/Menor Ataque-
              </option>
              <option value="ascendente"> Mayor Ataque </option>
              <option value="descendente"> Menor Ataque </option>
            </select>
          </div>
          <div className="filtros">
            <select id="valueFiltersADB"autoComplete="off" className="selectFiltros" onChange={(e) => handleFilterByApiOrDb(e)}>
              <option defaultValue="-Existentes/Creados-"value="default" hidden>
                -Existentes/Creados-
              </option>
              <option value="Todos"> Todos </option>
              <option value="API"> API </option>
              <option value="Database"> Creados </option>
            </select>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <Paginado
            className="paginado"
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons?.length}
            paginado={paginado}
          />
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
                <Link className="LinkCard" to={"/Pokemons/" + p.id}>
                  <Cards
                    className="Cards"
                    name={p.name}
                    img={p.img}
                    types={p.types + " "}
                    id={p.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      :(<div>
        {/* <h1>No hay nada </h1> */}
        <button
          className="refreshButton"
          onClick={(e) => {
            handleClick(e);
          }}
        > Volver al Home</button>
          <img src={pokenotfound} alt="Psyduck" />
      </div>
      
      
      
      )
      
    }
      </div>

    );
  
   
}
