import typeColors from "../utils/typeColors";

const PokedexSection = ({ selectedPokemon }) => {
  return (
    <>
      {selectedPokemon && (
        <div className="p-30 w-full">
          <h2 className="text-2xl font-bold uppercase">
            {selectedPokemon.name}
          </h2>
          {selectedPokemon.types.map((typeData, i) => (
            <button
              key={i}
              className="m-1.5 rounded-full px-3 py-2 font-bold capitalize text-white"
              style={{
                backgroundColor: typeColors[typeData.type.name].color,
              }}
            >
              {typeData.type.name}
            </button>
          ))}
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            className="w-full"
          />
          <img
            src={selectedPokemon.sprites.back_default}
            alt={selectedPokemon.name}
            className="w-full"
          />
          <p>
            {selectedPokemon.types.map((type, i) => (
              <li key={i}>{type.type.name}</li>
            ))}
          </p>
          <p>Weight: {selectedPokemon.base_experience}</p>
          <p>Height: {selectedPokemon.height}</p>
        </div>
      )}
    </>
  );
};

export default PokedexSection;
