import { useState, useEffect } from "react";
import { fetchPokemonData, getPokemon } from "../services/pokemon.service";
import PokemonList from "../components/PokemonList";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import SearchFunction from "../components/SearchFunction";

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokeDex, setPokeDex] = useState();
  const [data, setData] = useState([]); // Your data state

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
      <div className="flex row justify-center">
        <div className="bg-blue-500 p-10">
          <SearchFunction data={data} setData={setData} />
          <PokemonList
            pokemon={pokemon}
            loading={loading}
            Cards={(poke) => setPokeDex(poke)}
          />
          <Pagination
            setPokemon={setPokemon}
            setUrl={setUrl}
            nextUrl={nextUrl}
            prevUrl={prevUrl}
          />
        </div>

        <div className="bg-yellow-500 p-20">
          <Cards data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
