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

const initialState = {
  pokemons: [],
  allPokemons: [],
  detail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return { ...state, detail: action.payload };
    case CLEAN_DETAIL:
      return { ...state, detail: {} };
    case SEARCH_POKEMON:
      return { ...state, pokemons: action.payload };
    case GET_TYPES:
      return { ...state, types: action.payload };
    case POST_POKEMON:
      return { ...state };
    case FILTER_ORIGIN:
      const allPokemons2 = state.allPokemons;
      const filtered2 =
        action.payload === "db"
          ? allPokemons2.filter((pok) => pok.created)
          : allPokemons2.filter((pok) => !pok.created);
      return {
        ...state,
        pokemons: action.payload === "all" ? allPokemons2 : filtered2,
      };
    case FILTER_BY_TYPES:
      const type = action.payload; // este es el tipo que viene del evento
      const allPokemons = state.allPokemons; // tiene siempre todos los pokemons para tener disponibles todos los pokemosn siempre
      const filtered =
        type === "all"
          ? allPokemons
          : allPokemons.filter((pok) => pok.types.includes(type));
      return { ...state, pokemons: filtered };
    case ORDER_BY_ATTACK:
      const order = action.payload;
      let orderedByAttack =
        order === "min"
          ? state.pokemons.sort((a, b) => a.attack - b.attack)
          : state.pokemons.sort((a, b) => b.attack - a.attack);

      return { ...state, pokemons: orderedByAttack };
    case ORDER_ALPHABET:
      let orderedPok =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return { ...state, pokemons: orderedPok };
    case RANDOM_SEARCH:
      const id = action.payload;
      const allPokemons3 = state.allPokemons;
      const filtered3 = allPokemons3.filter((pok) => pok.id === id);
      return { ...state, pokemons: filtered3 };
    default:
      return { ...state };
  }
};

export default rootReducer;

/* 

case ORDER_BY_ATTACK:
      let orderPokePow =
        action.payload === "min"
          ? state.allPokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.allPokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return { ...state, pokemons: orderPokePow };

case ORDER_ALPHABET:
      let orderedPok =
        action.payload === "asc"
          ? state.allPokemons.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.allPokemons.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return { ...state, pokemons: orderedPok };      

*/
