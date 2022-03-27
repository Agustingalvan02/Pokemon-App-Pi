import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var response = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: response.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    var response = await axios.get("http://localhost:3001/types");

    return dispatch({
      type: "GET_TYPES",
      payload: response.data,
    });
  };
}

export function searchByName(name) {
  return async function (dispatch) {
      var response = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      return dispatch({
        type: "SEARCH_POKEMON_NAME",
        payload: response.data,
      });
    
    }
  };


export function PokemonDetail(id) {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/pokemons/" + id);
    return dispatch({
      type: "POKEMON_DETAIL",
      payload: response.data,
    });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/pokemons/",
      payload
    );
    return dispatch({
      type: "POST_POKEMON",
      payload: response.data,
    });
  };
}

export function filterByTypes(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload,
  };
}

export function filterByName(payload) {
  return {
    type: "FILTER_BY_NAME",
    payload,
  };
}

export function filterByApiOrDb(payload) {
  return {
    type: "FILTER_BY_API_DB",
    payload,
  };
}

export function filterByAttack(payload) {
  return {
    type: "FILTER_BY_ATTACK",
    payload,
  };
}

