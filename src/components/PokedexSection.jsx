import typeColors from "../utils/typeColors";

const PokedexSection = ({ selectedPokemon }) => {
  return (
    <>
      {selectedPokemon && (
        <div
          className="p-30 flex w-full flex-col rounded-xl bg-white p-5 text-center shadow-lg"
          // style={{
          //   border: `${typeColors[types[0].type.name].color} 5px solid`,
          // }}
        >
          <h2 className="text-2xl font-bold uppercase">
            {selectedPokemon.name}
          </h2>
          <div className="flex justify-between">
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              className="w-40"
            />
            <img
              src={selectedPokemon.sprites.back_default}
              alt={selectedPokemon.name}
              className="w-40"
            />
          </div>
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
          <p>Weight: {selectedPokemon.base_experience}</p>
          <p>Height: {selectedPokemon.height}</p>
        </div>
      )}
    </>
  );
};

export default PokedexSection;
