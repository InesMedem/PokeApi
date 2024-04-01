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
          <h1>name {data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
          />
          <div className="abilities">
            <div className="group">
              <h2>blaze</h2>
            </div>
          </div>
          <div className="base-state">
            <h3>Hp: 30</h3>
            <h3>attack: 52</h3>
            <h3>defense: 43</h3>
            <h3>special-attack: 43</h3>
            <h3>speed: 43</h3>
            <LikeButton
              isLiked={likedPokemons[data.id]}
              onToggleLike={() => handleToggleLike(data.id)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Cards;
