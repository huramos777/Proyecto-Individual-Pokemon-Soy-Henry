import axios from "axios";
import {
  CLEAN_DETAIL,
  FILTER_BY_TYPES,
  FILTER_ORIGIN,
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_TYPES,
  ORDER_ALPHABET,
  ORDER_BY_ATTACK,
  POST_POKEMON,
  RANDOM_SEARCH,
  SEARCH_POKEMON,
} from "./actionsType";

export const getPokemons = () => {
  return async (dispatch) => {
    const response = await axios("http://localhost:3001/pokemons");
    const pokemons = response.data;

    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

export const getPokemonDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
    const pokemon = response.data;
    dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon });
  };
};

export const searchPokemon = (name) => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/pokemons?name=${name}`);
    const pokemon = response.data;
    dispatch({ type: SEARCH_POKEMON, payload: pokemon });
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/types`);
    const types = response.data;
    dispatch({ type: GET_TYPES, payload: types });
  };
};

export const createPokemon = (form) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/pokemons", form);
    const created = response.data;
    dispatch({ type: POST_POKEMON, payload: created });
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const filterByOrigin = (created) => {
  return { type: FILTER_ORIGIN, payload: created };
};

export const filterByTypes = (type) => {
  return { type: FILTER_BY_TYPES, payload: type };
};

export const orderByAttack = (attackLevel) => {
  return { type: ORDER_BY_ATTACK, payload: attackLevel };
};

export const orderAlphabet = (order) => {
  return { type: ORDER_ALPHABET, payload: order };
};

export const randomSearch = (id) => {
  return { type: RANDOM_SEARCH, payload: id };
};

/* 

return (dispatch) => {
    return fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_POKEMONS, payload: data });
      });
  };

*/
