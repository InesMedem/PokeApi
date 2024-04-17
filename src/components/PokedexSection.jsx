import { useEffect, useState } from "react";
import typeColors from "../utils/typeColors";
import PropTypes from "prop-types";
import { getByTypeDetails } from "../services/pokemon.service";

const PokedexSection = ({ selectedPokemon }) => {
  const [typeWeaknesses, setTypeWeaknesses] = useState([]);
  const weightInKilograms = (selectedPokemon.weight * 0.1).toFixed(1); // Convert hectograms to kilograms and limit to 1 decimal place
  const heightInMeters = (selectedPokemon.height * 0.1).toFixed(1); // Convert decimetres to meters and limit to 1 decimal place

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
        <div className="p-30 flex w-72 flex-col rounded-xl bg-white p-5 text-center shadow-lg">
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
            <h4>type</h4>
            {selectedPokemon.types.map((typeData, i) => (
              <button
                key={i}
                className="tags"
                style={{
                  backgroundColor: typeColors[typeData.type.name].color,
                }}
              >
                {typeData.type.name}
              </button>
            ))}
            <h4>Weaknesses</h4>
            {typeWeaknesses.map((weakness, i) => (
              <button
                key={i}
                className="tags"
                style={{
                  backgroundColor: typeColors[weakness.name].color,
                }}
              >
                {weakness.name}
              </button>
            ))}
          </div>
          <div className="m-2 rounded-lg bg-gray-200 p-5">
            <h4>Physical Attributes</h4>
            <div className="flex justify-center">
              <p className="tags bg-blue-500">{heightInMeters}m</p>
              <p className="tags bg-blue-500">{weightInKilograms}kg</p>
            </div>
            <h4>Abilities:</h4>
            {selectedPokemon.abilities.map((abilityData, index) => (
              <li key={index} className="capitalize">
                {abilityData.is_hidden ? "hidden: " : " "}
                {abilityData.ability.name}
              </li>
            ))}
            {/* <h4>Category:</h4> {selectedPokemon.height} */}
            {/* <h4>Moves:</h4>
            <ul>
              {selectedPokemon.moves.map((move, index) => (
                <li key={index}>{move.move.name}</li>
              ))}
            </ul> */}
          </div>
        </div>
      )}
    </>
  );
};

PokedexSection.propTypes = {
  selectedPokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string.isRequired,
    }),
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    ).isRequired,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        is_hidden: PropTypes.bool.isRequired,
      }).isRequired,
    ).isRequired,
  }),
};

export default PokedexSection;
