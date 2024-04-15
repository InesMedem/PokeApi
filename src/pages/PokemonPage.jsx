import { useState, useEffect } from "react";
import typeColors from "../utils/typeColors";
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
  const pokemonsPerPage = 40;
  const totalPokemon = 1000;

  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  //* Pokemons (grid)
  const [pokemon, setPokemon] = useState([]);
  console.log("🚀 ~ PokemonPage ~ pokemon:", pokemon);
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
        })
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
          totalPokemon
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
    (_, index) => index + 1
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
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        JSON.stringify(updatedLikedPokemons)
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

  //! -------------------- RETURN  ----------------

  return (
    <>
      <div className="flex flex-col bg-slate-50 p-10 h-screen">
        <section className="flex flex-col py-10 my-10 items-center bg-slate-300 m-4 rounded-xl">
          <div>
            <p>
              The first generation of Pokémon began in 1996, introducing the
              first 151 Pokémon of the series. Pokémon Red, Pokémon Green,
              Pokémon Blue and Pokémon Yellow are the core franchise games of
              the first generation
            </p>
            <SearchFunction setSearchQuery={setSearchQuery} />
            <button className="btn btn-blue">
              <span className="material-symbols-outlined">autorenew</span>
              Surprise me
            </button>
            <Pagination
              pageNumbers={pageNumbers}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </section>
        {loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <div className="flex justify-center">
            <div className="w-full lg:w-1/4">
              {selectedPokemon && (
                <PokedexSection
                  selectedPokemon={selectedPokemon}
                  types={types}
                />
              )}
            </div>
            <div className="w-full lg:w-3/4 flex flex-wrap justify-center gap-10">
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
                  />
                );
              })}
              <div className="flex">
                <button className="btn btn-blue">Load more</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PokemonPage;
