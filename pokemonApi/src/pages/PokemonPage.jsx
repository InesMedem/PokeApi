import { useState, useEffect } from "react";
import { fetchPokemonData, getPokemon } from "../services/pokemon.service";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { nextUrl, prevUrl, results } = await fetchPokemonData(url);
      setNextUrl(nextUrl);
      setPrevUrl(prevUrl);
      const fetchedPokemon = await getPokemon(results);
      setPokemon(fetchedPokemon);
      setLoading(false);
    };
    fetchData(); // Fetch data when component mounts
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
