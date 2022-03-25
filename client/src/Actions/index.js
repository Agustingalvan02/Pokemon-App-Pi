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
    try {
      var response = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      return dispatch({
        type: "SEARCH_POKEMON_NAME",
        payload: response.data,
      });
    } catch (error) {
      console.log(error + "Pokemon no encontrado!");
    }
  };
}

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
    console.log(response);
    return dispatch({
      type: "POST_POKEMON",
      payload: response.data,
    });
  };
}

export function filterByTypes(payload) {
  console.log(payload)
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

export function filterByApiOrDb(id) {
  return {
    type: "FILTER_BY_API_DB",
    payload:id,
  };
}

export function filterByAttack(payload) {
  return {
    type: "FILTER_BY_ATTACK",
    payload,
  };
}

