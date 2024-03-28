import { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList";

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/35`)
      .then((res) => setPokemon(res.data.results.map((p) => p.name)))
      .catch((err) => {
        console.log("🚀 ~ useEffect ~ err:", err);
        return;
      });
  }, []);

  return <PokemonList pokemon={pokemon} />;
};

export default PokemonPage;

//   axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
//     setPokemon(res.data.results.map((p) => p.name));
//   });

//   const fetchPokemon = async (id) => {
//     const res = await getByIdPokemon(id);
//     console.log("🚀 ~ fetchPokemon ~ id:", id);
//     const pokemonData = res.data;
//     return pokemonData;
//   };
