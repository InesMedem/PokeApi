import { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList";

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    // console.log("🚀 ~ pokeFun ~ res:", res.data.results);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
    // console.log(pokemon);
  };

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
    pokeFun();
  }, [url]);

  return (
    <PokemonList
      pokemon={pokemon}
      loading={loading}
      infoPokemon={(poke) => setPokeDex(poke)}
    />
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
