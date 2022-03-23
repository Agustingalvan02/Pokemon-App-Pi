const initialState = {
  pokemons: [],
  allPokemons: [],
  pokeTypes: [],
  detail: [],
  newPokemon: [],
};

export default function rootReducer(state = initialState, action) {
  const pokeCopy= state.allPokemons
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        pokeTypes: action.payload,
      };
    case "SEARCH_POKEMON_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "POST_POKEMON":
      return {
        ...state,
        newPokemon: action.payload,
      };
    case "FILTER_BY_TYPES":
      // const pokemons = state.allPokemons;
      
      let pokemons = pokeCopy;
       console.log("PokeDatos:",pokemons)
      const typePokemons =
        action.payload === "Todos"
           ? pokemons
        //    :  pokemons.filter(function(t){
        //     if (t.types.name){
        //       if(t.types[0].name.includes(action.payload))
        //       {
        //         return t
        //       }
        //     }

        //   });
          : pokemons.filter((e=>e.types.map((type)=>type.name)[0] === action.payload||e.types.map((type)=>type.name)[1] === action.payload))
          //  :pokemons.types.map(p=>)
          
    
            
      return {
        ...state,
        pokemons: typePokemons,
      };
    case "FILTER_BY_NAME":
      const PokemonFilteredByName =
        action.payload === "A-Z"
          ? state.pokemons.sort((a, z) => {
              if (a.name > z.name) return 1;
              if (z.name > a.name) return -1;
              return 0;
            })
          : state.pokemons.sort((a, z) => {
              if (a.name > z.name) return -1;
              if (z.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        pokemons: PokemonFilteredByName,
      };

    case "FILTER_BY_ATTACK":
      const PokemonsFilteredByAttack =
        action.payload === "ascendente"
        ? state.pokemons.sort((h, l) => {
            if (h.attack > l.attack) return -1;
            if (l.attack > h.attack) return 1;
            return 0;
          })
          : state.pokemons.sort((h, l) => {
              if (h.attack > l.attack) return 1;
              if (l.attack > h.attack) return -1;
              return 0;
            });

      return {
        ...state,
        pokemons: PokemonsFilteredByAttack,
      };
    case "FILTER_BY_API_BD":
      const PokemonsApiDB = action.payload === "API";
      if (action.payload.includes("-")) {
        state.pokemons.filter((e) => e.id === action.payload);
      }
      return {
        ...state,
        pokemons: PokemonsApiDB,
      };

      case "POKEMON_DETAIL":
          return{
            ...state,
            detail: action.payload
          }
    default:
      return state;
  }

  
}
