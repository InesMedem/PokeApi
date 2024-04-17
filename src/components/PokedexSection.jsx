import { useEffect, useState } from "react";
import typeColors from "../utils/typeColors";
import { getByIdPokemon, getByTypeDetails } from "../services/pokemon.service";

const PokedexSection = ({ selectedPokemon }) => {
  const [typeWeaknesses, setTypeWeaknesses] = useState([]);

  useEffect(() => {
    const fetchTypeWeaknesses = async () => {
      if (selectedPokemon) {
        const typeData = await getByTypeDetails(
          selectedPokemon.types[0].type.name,
        );
        setTypeWeaknesses(typeData.damage_relations.double_damage_from);
      }
    };

    fetchTypeWeaknesses();
  }, [selectedPokemon]);

  return (
    <>
      {selectedPokemon && (
        <div className="p-30 flex  w-72 flex-col rounded-xl bg-white p-5 text-center shadow-lg">
          <h2 className="text-2xl font-bold uppercase">
            {selectedPokemon.name}
          </h2>
          <p className="font-light"> #{selectedPokemon.id}</p>

          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            className=" animate-bounce"
          />

          <div>
            <p className="uppercase">type</p>
            {selectedPokemon.types.map((typeData, i) => (
              <button
                key={i}
                className="m-1.5 w-24 rounded-lg py-2 capitalize text-white"
                style={{
                  backgroundColor: typeColors[typeData.type.name].color,
                }}
              >
                {typeData.type.name}
              </button>
            ))}
          </div>
          <p className=" uppercase">Weaknesses</p>

          <div>
            {typeWeaknesses.map((weakness, i) => (
              <button
                key={i}
                className="m-1.5 w-24 rounded-lg py-2 capitalize text-white"
                style={{
                  backgroundColor: typeColors[weakness.name].color,
                }}
              >
                {weakness.name}
              </button>
            ))}
          </div>
          <p>Weight: {selectedPokemon.weight}lbs </p>
          <p>Height: {selectedPokemon.height}'' </p>
          <p>Abilities: {selectedPokemon.height} </p>
          <p>CategorySeed: {selectedPokemon.height} </p>
          <div>
            <h3>Moves:</h3>
            <ul>
              {selectedPokemon.moves.map((move, index) => (
                <li key={index}>{move.move.name}</li>
              ))}
            </ul>
            <div>
              <h3>Abilities:</h3>
              <ul>
                {selectedPokemon.abilities.map((abilityData, index) => (
                  <li key={index}>
                    <strong>
                      {abilityData.is_hidden ? "Hidden Ability: " : "Ability: "}
                    </strong>
                    {abilityData.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokedexSection;
