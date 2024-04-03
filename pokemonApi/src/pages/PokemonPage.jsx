import { useState, useEffect } from "react";
import { getByIdPokemon, getByTypePokemon } from "../services/pokemon.service";
import typeColors from "../utils/typeColors";

//* Components
import LikeButton from "../components/LikeButton";
import SearchFunction from "../components/SearchFunction";
import FilterPokemon from "../components/FilterPokemon";
import Pokedex from "../components/Pokedex";
import Pagination from "../components/Pagination";

const PokemonPage = () => {
  //* FilterPokemon
  const [types, setTypes] = useState([]);

  //* SearchFunction
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //* Pokedex (detail)
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  //* Pokemons (grid)
  const [pokemon, setPokemon] = useState([]);

  //* likeButton
  const [likedPokemons, setLikedPokemons] = useState({});

  //* Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 100;
  const totalPokemon = 1118;

  //! -------------------- TYPE ----------------

  const fetchPokemonTypes = async () => {
    const typesData = await getByTypePokemon();
    setTypes(typesData);
  };

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  //! -------------------- SEARCH ----------------

  useEffect(() => {
    const filteredData = pokemon.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchQuery, pokemon]);

  //! -------------------- POKEDEX ----------------

  const handlePokemonClick = async (id) => {
    const selected = await getByIdPokemon(id);
    setSelectedPokemon(selected);
  };

  //! -------------------- LIKE  ----------------

  useEffect(() => {
    const savedLikedPokemons = localStorage.getItem("likedPokemons");
    if (savedLikedPokemons) setLikedPokemons(JSON.parse(savedLikedPokemons));
  }, []);

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

  //! -------------------- PAGINATION ----------------

  const fetchData = async () => {
    const startIndex = (currentPage - 1) * pokemonsPerPage + 1;
    const endIndex = Math.min(startIndex + pokemonsPerPage - 1, totalPokemon);
    const pokemonData = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const pokemonInfo = await getByIdPokemon(i);
      pokemonData.push(pokemonInfo);
    }
    setPokemon(pokemonData);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalPokemon / pokemonsPerPage);

  // Generate page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Handle page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  //! -------------------- RETURN  ----------------

  return (
    <>
      <div className="flex flex-col items-center m-6 justify">
        <FilterPokemon types={types} />
        <SearchFunction setSearchQuery={setSearchQuery} />

        <Pokedex selectedPokemon={selectedPokemon} />

        <div className="flex flex-wrap p-4">
          {searchResults.map(({ id, name, sprites, types }) => {
            const isLiked = likedPokemons[id] || false;
            const pokemonTypes = types.map(({ type }) => type.name).join(", ");
            return (
              <div
                key={id}
                onClick={() => handlePokemonClick(id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: typeColors[types[0].type.name].color,
                }}
              >
                <img src={sprites.front_default} alt={name} />
                <h2>{name}</h2>
                <h2>{pokemonTypes}</h2>
                <LikeButton
                  isLiked={isLiked}
                  onToggleLike={() => handleToggleLike(id)}
                />
              </div>
            );
          })}
        </div>
        <Pagination
          pageNumbers={pageNumbers}
          handlePageClick={handlePageClick}
        />
      </div>
    </>
  );
};

export default PokemonPage;
