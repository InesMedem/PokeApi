import pokedexImage from "../public/pokedex.png";

const Pokedex = ({ selectedPokemon }) => {
  console.log("🚀 ~ Pokedex ~ selectedPokemon:", selectedPokemon);
  return (
    <>
      {selectedPokemon && (
        <div
          className=""
          // style={{ backgroundImage: `url(${pokedexImage})` }}
        >
          <h2 className="capitalize">{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.other.showdown.front_default}
            alt={selectedPokemon.name}
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

export default Pokedex;
