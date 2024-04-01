import { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokeDex, setPokeDex] = useState();

  //* responsible for fetching a LIST of Pokémon data from an API.

  const fetchPokemonData = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  //* takes an array of Pokémon data (res) as input. Responsible for fetching INDIVIDUAL Pokémon data and updating the state with each Pokémon's information.

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
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
        </div>
        <Pagination
          setPokemon={setPokemon}
          setUrl={setUrl}
          nextUrl={nextUrl}
          prevUrl={prevUrl}
        />

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
//     const pokemonData = res.data;
//     return pokemonData;
//   };
