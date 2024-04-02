import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";

const Cards = ({ data }) => {
  const [likedPokemons, setLikedPokemons] = useState({});

  useEffect(() => {
    const storedLikedPokemons = JSON.parse(
      localStorage.getItem("likedPokemons")
    );
    if (storedLikedPokemons) {
      setLikedPokemons(storedLikedPokemons);
    }
  }, []);

  const handleToggleLike = (pokemonId) => {
    setLikedPokemons((prevLikedPokemons) => {
      const updatedLikedPokemons = { ...prevLikedPokemons };
      updatedLikedPokemons[pokemonId] = !updatedLikedPokemons[pokemonId];
      localStorage.setItem(
        "likedPokemons",
        JSON.stringify(updatedLikedPokemons)
      );
      return updatedLikedPokemons;
    });
  };

  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1 className="font-bold capitalize">{data.name}</h1>
          <img
            className="w-26 h-26"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
          />
          <h3 className="font-bold">Species:</h3> {}
          <h3 className="font-bold">Height:</h3> {data.height} decimetres
          <h3 className="font-bold">Weight:</h3> {data.weight} hectograms
          <h2 className="font-bold">Abilities:</h2>
          {data.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name} </li>
          ))}
          <h2 className="font-bold">Moves:</h2>
          {data.moves.slice(0, 3).map((moves, index) => (
            <li key={index}>{moves.move.name}</li>
          ))}
          <LikeButton
            isLiked={likedPokemons[data.id]}
            onToggleLike={() => handleToggleLike(data.id)}
          />
        </>
      )}
    </>
  );
};

export default Cards;
