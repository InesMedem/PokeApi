import typeColors from "../utils/typeColors";

const PokedexSection = ({ selectedPokemon }) => {
  return (
    <>
      {selectedPokemon && (
        <div className="bg-blue-400 w-full p-30">
          <h2 className="uppercase font-bold text-2xl">
            {selectedPokemon.name}
          </h2>
          {selectedPokemon.types.map((typeData, i) => (
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
          <p>weight</p>
          <p>height</p>
          <p>height</p>
        </div>
      )}
    </>
  );
};

export default PokedexSection;
