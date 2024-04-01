import axios from "axios";

//* responsible for fetching a LIST of Pokémon data from an API.

export const fetchPokemonData = async (url) => {
  try {
    const res = await axios.get(url);
    return {
      nextUrl: res.data.next,
      prevUrl: res.data.previous,
      results: res.data.results,
    };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};

//* takes an array of Pokémon data (res) as input. Responsible for fetching INDIVIDUAL Pokémon data and updating the state with each Pokémon's information.

export const getPokemon = async (pokemonArray) => {
  const pokemonPromises = pokemonArray.map(async (item) => {
    const result = await axios.get(item.url);
    return result.data;
  });
  return Promise.all(pokemonPromises);
};

// export const getByIdPokemon = async (id) => {
//   const optionsRequest = {
//     method: "GET",
//     url: `https://pokeapi.co/api/v2/pokemon/${id}`,
//   };
//   return await axiosUtil(optionsRequest);
// };

// useEffect(() => {
//   axios
//     .get(`https://pokeapi.co/api/v2/pokemon`)
//     .then((res) => setPokemon(res.data.results.map((p) => p.name)))
//     .catch((err) => {
//       return;
//     });
// }, [url]);

//   axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
//     setPokemon(res.data.results.map((p) => p.name));
//   });

//   const fetchPokemon = async (id) => {
//     const res = await getByIdPokemon(id);
//     const pokemonData = res.data;
//     return pokemonData;
//   };

// const fetchPokemonData = async () => {
//   setLoading(true);
//   const res = await axios.get(url);
//   setNextUrl(res.data.next);
//   setPrevUrl(res.data.previous);
//   getPokemon(res.data.results);
//   setLoading(false);
// };

// const getPokemon = async (res) => {
//   res.map(async (item) => {
//     const result = await axios.get(item.url);
//     setPokemon((state) => {
//       state = [...state, result.data];
//       state.sort((a, b) => (a.id > b.id ? 1 : -1));
//       return state;
//     });
//   });
// };
