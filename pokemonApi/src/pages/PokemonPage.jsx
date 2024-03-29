import { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList";
import Cards from "../components/Cards";

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  //* responsible for fetching a LIST of Pokémon data from an API.

  const fetchPokemonData = async () => {
    setLoading(true);
    const res = await axios.get(url);
    // console.log("🚀 ~ fetchPokemonData ~ res:", res.data.results);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
    // console.log(pokemon);
  };

  //* takes an array of Pokémon data (res) as input. Responsible for fetching INDIVIDUAL Pokémon data and updating the state with each Pokémon's information.

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      // console.log("🚀 ~ res.map ~ result:", result.data);
      setPokemon((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    fetchPokemonData();
  }, [url]);

  return (
    <>
      <div className="flex flex-row">
        <div className="bg-blue-500">
          <PokemonList
            pokemon={pokemon}
            loading={loading}
            Cards={(poke) => setPokeDex(poke)}
          />
          <div>
            {prevUrl && (
              <button
                onClick={() => {
                  setPokemon([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}
            {nextUrl && (
              <button
                onClick={() => {
                  setPokemon([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className="bg-yellow-500 p-35">
          <Cards data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default PokemonPage;

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
//     console.log("🚀 ~ fetchPokemon ~ id:", id);
//     const pokemonData = res.data;
//     return pokemonData;
//   };
