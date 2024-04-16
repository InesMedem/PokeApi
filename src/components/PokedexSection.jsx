import { useEffect, useState } from "react";
import typeColors from "../utils/typeColors";
import { getByIdPokemon, getByTypeDetails } from "../services/pokemon.service";

const PokedexSection = ({ selectedPokemon }) => {
  const [prevPokemonId, setPrevPokemonId] = useState(null);
  const [nextPokemonId, setNextPokemonId] = useState(null);
  const [typeWeaknesses, setTypeWeaknesses] = useState([]);

  useEffect(() => {
    const fetchAdjacentPokemon = async () => {
      if (selectedPokemon) {
        const currPokemonId = selectedPokemon.id;
        const prevId = currPokemonId > 1 ? currPokemonId - 1 : null;
        const nextId = currPokemonId + 1;

        setPrevPokemonId(prevId);
        setNextPokemonId(nextId);

        const typeData = await getByTypeDetails(
          selectedPokemon.types[0].type.name,
        );
        setTypeWeaknesses(typeData.damage_relations.double_damage_from);
      }
    };

    fetchAdjacentPokemon();
  }, [selectedPokemon]);

  const handlePrevClick = async () => {
    if (prevPokemonId !== null) {
      const prevPokemon = await getByIdPokemon(prevPokemonId);
    }
  };

  const handleNextClick = async () => {
    const nextPokemon = await getByIdPokemon(nextPokemonId);
  };

  return (
    <>
      {selectedPokemon && (
        <div className="p-30 flex  w-72 flex-col rounded-xl bg-white p-5 text-center shadow-lg">
          <h2 className="text-2xl font-bold uppercase">
            {selectedPokemon.name}
          </h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            className=" animate-bounce"
          />
          {/* <div className="flex justify-between">
           
            <img
              src={selectedPokemon.sprites.back_default}
              alt={selectedPokemon.name}
              className="w-40"
            />
          </div> */}

          <h3 className="font-bold uppercase">Type</h3>
          <div>
            {selectedPokemon.types.map((typeData, i) => (
              <button
                key={i}
                className="m-1.5 w-24 rounded-lg py-2 font-bold capitalize text-white"
                style={{
                  backgroundColor: typeColors[typeData.type.name].color,
                }}
              >
                {typeData.type.name}
              </button>
            ))}

            <p className=" uppercase">Weaknesses</p>
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

          <p>Weight: {selectedPokemon.weight}</p>
          <p>Height: {selectedPokemon.height}</p>
        </div>
      )}
      <div className="flex gap-2">
        <button className="btn-surprise" onClick={handlePrevClick}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
          PREV.
        </button>
        <button className="btn-surprise" onClick={handleNextClick}>
          NEXT
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </>
  );
};

export default PokedexSection;
