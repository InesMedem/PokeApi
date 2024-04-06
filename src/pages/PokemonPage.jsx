import { useState, useEffect } from "react";
import typeColors from "../utils/typeColors";

import {
  getAllPokemon,
  getByIdPokemon,
  getByTypePokemon,
} from "../services/pokemon.service";

import LikeButton from "../components/LikeButton";
import SearchFunction from "../components/SearchFunction";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

const PokemonPage = () => {
  //* SearchFunction
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //* Pokemons (grid)
  const [pokemon, setPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  //* likeButton
  const [likedPokemons, setLikedPokemons] = useState({});

  //* Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 100;
  const totalPokemon = 1118;

  //* Loading
  const [loading, setLoading] = useState(true);

  //! -------------------- FETCH DATA ----------------

  const fetchData = async (startIndex, endIndex) => {
    const pokemonData = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const pokemonInfo = await getByIdPokemon(i);
      pokemonData.push(pokemonInfo);
    }
    return pokemonData;
  };

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      setLoading(true);
      const allPokemonData = await getAllPokemon();
      console.log("🚀 ~ fetchAllPokemonData ~ allPokemonData:", allPokemonData);
      setPokemonData(allPokemonData);
      setLoading(false);
    };
    fetchAllPokemonData();
  }, []);

  //! -------------------- TYPE ----------------

  const fetchPokemonTypes = async () => {
    const typesData = await getByTypePokemon();
    setTypes(typesData);
  };

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  //! -------------------- SEARCH ----------------

  const filterData = () => {
    const filteredData = pokemon.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, pokemon]);

  //! -------------------- LIKE  ----------------

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

  //! -------------------- PAGINATION ----------------

  const handlePageChange = async (page) => {
    setLoading(true);
    const startIndex = (currentPage - 1) * pokemonsPerPage + 1;
    const endIndex = Math.min(startIndex + pokemonsPerPage - 1, totalPokemon);
    const pokemonData = await fetchData(startIndex, endIndex);
    setPokemon(pokemonData);
    setCurrentPage(page);
    setLoading(false);
  };

  const totalPages = Math.ceil(totalPokemon / pokemonsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    fetchData(
      (currentPage - 1) * pokemonsPerPage + 1,
      currentPage * pokemonsPerPage
    ).then((data) => {
      setPokemon(data);
    });
  }, [currentPage]);

  //! -------------------- RETURN  ----------------

  return (
    <>
      <div className="flex flex-col px-20 bg-slate-50">
        <section className="flex flex-col p-4 items-center bg-slate-300 m-4 rounded-xl">
          <div>
            <SearchFunction setSearchQuery={setSearchQuery} />
            <Pagination
              pageNumbers={pageNumbers}
              handlePageClick={handlePageChange}
            />
          </div>
        </section>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {searchResults.map(({ id, name, sprites, types }) => {
              const isLiked = likedPokemons[id] || false;

              return (
                <div
                  key={id}
                  // onClick={() => handlePokemonClick(id)}
                  className="flex flex-col rounded-xl w-56 text-center p-4 shadow-lg bg-white"
                  style={{
                    border: `${typeColors[types[0].type.name].color} 5px solid`,
                  }}
                >
                  <h2 className="uppercase font-bold text-2xl">{name}</h2>
                  <img
                    src={sprites.front_default}
                    alt={name}
                    className="animate-bounce"
                  />
                  <div>
                    {types.map((typeData, i) => (
                      <button
                        key={i}
                        className="capitalize m-1.5 font-bold py-2 px-3 rounded-full text-white"
                        style={{
                          backgroundColor: typeColors[typeData.type.name].color,
                        }}
                      >
                        {typeData.type.name}
                      </button>
                    ))}
                  </div>

                  <LikeButton
                    isLiked={isLiked}
                    onToggleLike={() => handleToggleLike(id)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default PokemonPage;
