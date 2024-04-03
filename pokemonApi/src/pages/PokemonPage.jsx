import { useState, useEffect } from "react";
import { getByIdPokemon } from "../services/pokemon.service";
import LikeButton from "../components/LikeButton";
import SearchFunction from "../components/SearchFunction";

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);

  //* pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20; // Number of pokemons per page
  const totalPokemon = 1118; // Total number of pokemons in the API

  //* likeButton
  const [likedPokemons, setLikedPokemons] = useState({});

  //* Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //! -------------------- SEARCH ----------------

  useEffect(() => {
    // Filter data based on the search query
    const filteredData = pokemon.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Update the search results
    setSearchResults(filteredData);
  }, [searchQuery, pokemon]);

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

  //! -------------------- RETURN  ----------------

  return (
    <>
      <div className="flex flex-col items-center m-6 justify">
        <SearchFunction setSearchQuery={setSearchQuery} />
        <div className="flex flex-wrap p-4">
          {searchResults.map(({ id, name, sprites }) => {
            const isLiked = likedPokemons[id] || false;
            return (
              <div key={id}>
                <img src={sprites.front_default} alt={name} />
                <h2>{name}</h2>
                <LikeButton
                  isLiked={isLiked}
                  onToggleLike={() => handleToggleLike(id)}
                />
                <button className="btn btn-blue">+ Info</button>
              </div>
            );
          })}
        </div>

        <div>
          {pageNumbers.map((page) => (
            <button
              className="btn"
              key={page}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
