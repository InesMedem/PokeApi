import "./PokemonPageV2.css";
import React, { useState, useEffect } from "react";

// filter dynamic class per TYPE: filterPokemon function (swicth) + FilterButtons
// input
// pagination buttons
// spinner
//pokemonGallery which will be a grid of cards, each card is a component

const PokemonPageV2 = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffecr (()=> {
    const fetchData = async () => {
        const 
    }
  })

  return (
    <>
      <h1 className="bg-pink-500">FIND POKEMONS</h1>
      {pokemon.map(({ id, name, sprites }) => {
        return (
          <div key={id}>
            <img src={sprites.front_default} alt={name} />
            <h2>{name}</h2>
          </div>
        );
      })}
    </>
  );
};

export default PokemonPageV2;
