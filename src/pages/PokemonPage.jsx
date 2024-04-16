import { useState, useEffect } from "react";
// import typeColors from "../utils/typeColors";
import "../index.css";

import {
  getAllPokemon,
  getByIdPokemon,
  getByTypePokemon,
} from "../services/pokemon.service";

// import LikeButton from "../components/LikeButton";
import SearchFunction from "../components/SearchFunction";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import PokedexSection from "../components/PokedexSection";
import PokemonCard from "../components/PokemonCard";

const PokemonPage = () => {
  //* SearchFunction
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //* Pagination + Loading
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 17;
  const totalPokemon = 500;

  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  //* Pokemons (grid)
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  //* likeButton
  const [likedPokemons, setLikedPokemons] = useState({});

  //! -------------------- FETCH DATA ----------------

  // const fetchPokemonData = async (startIndex, endIndex) => {
  //   const pokemonData = [];
  //   for (let i = startIndex; i <= endIndex; i++) {
  //     const pokemonInfo = await getByIdPokemon(i);
  //     pokemonData.push(pokemonInfo);
  //   }
  //   return pokemonData;
  // };

  const fetchPokemonData = async (startIndex, endIndex) => {
    const offset = startIndex - 1; // Adjust for 0-based index in API
    const limit = endIndex - startIndex + 1; // Number of pokemons to fetch

    try {
      const pokemonListResponse = await getAllPokemon(offset, limit);
      const pokemonData = await Promise.all(
        pokemonListResponse.results.map(async (pokemon) => {
          const pokemonInfo = await getByIdPokemon(pokemon.name);
          return pokemonInfo;
        }),
      );
      return pokemonData;
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const startIndex = (currentPage - 1) * pokemonsPerPage + 1;
        const endIndex = Math.min(
          startIndex + pokemonsPerPage - 1,
          totalPokemon,
        );
        const pokemonData = await fetchPokemonData(startIndex, endIndex);
        setPokemon(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pokemonsPerPage, totalPokemon]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalPokemon / pokemonsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  //! 1-------------------- FETCH DATA ----------------

  const fetchPokemonTypes = async () => {
    const typesData = await getByTypePokemon();
    setTypes(typesData);
  };

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  //! 4-------------------- SEARCH ----------------

  const filterData = () => {
    const filteredData = pokemon.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, pokemon]);

  //! 5-------------------- LIKE  ----------------

  const handleToggleLike = (id) => {
    setLikedPokemons((prevLikedPokemons) => {
      const isLiked = prevLikedPokemons[id];
      const updatedLikedPokemons = { ...prevLikedPokemons, [id]: !isLiked };
      localStorage.setItem(
        "likedPokemons",
        JSON.stringify(updatedLikedPokemons),
      );
      return updatedLikedPokemons;
    });
  };

  useEffect(() => {
    const savedLikedPokemons = localStorage.getItem("likedPokemons");
    if (savedLikedPokemons) setLikedPokemons(JSON.parse(savedLikedPokemons));
  }, []);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };
  console.log("🚀 ~ handlePokemonClick ~ pokemon:", pokemon);

  //! -------------------- RETURN  ----------------

  return (
    <>
      <div className="flex">
        <section className="flex flex-col items-center gap-10 rounded-xl bg-slate-300 p-10 py-10 lg:w-1/4">
          <p>
            The first generation of Pokémon began in 1996, introducing the first
            151 Pokémon of the series. Pokémon Red, Pokémon Green, Pokémon Blue
            and Pokémon Yellow are the core franchise games of the first
            generation
          </p>
          <SearchFunction setSearchQuery={setSearchQuery} />
          <button className="btn-surprise">
            <span className="material-symbols-outlined">autorenew</span>
            Surprise me
          </button>
          <div>
            sort by:
            <select className="btn">
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <Pagination
            pageNumbers={pageNumbers}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
          {selectedPokemon && (
            <PokedexSection selectedPokemon={selectedPokemon} types={types} />
          )}
        </section>
        <div className="flex flex-col justify-center lg:w-3/4">
          {loading ? (
            <Spinner />
          ) : (
            <div className="ml-10 flex w-full flex-wrap justify-center gap-10">
              {searchResults.map(({ id, name, sprites, types }) => {
                const isLiked = likedPokemons[id] || false;

                return (
                  <PokemonCard
                    key={id}
                    id={id}
                    name={name}
                    sprites={sprites}
                    types={types}
                    isLiked={isLiked}
                    onClick={() =>
                      handlePokemonClick({ id, name, sprites, types })
                    }
                    handleToggleLike={handleToggleLike}
                  />
                );
              })}
            </div>
          )}
          <div className="m-10">
            <button className="btn-surprise">Load more</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
