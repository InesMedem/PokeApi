import pokedexImage from "../public/pokedex.png";

const Pokedex = ({ selectedPokemon }) => {
  return (
    <>
      {selectedPokemon && (
        <div
          className="bg-cover bg-gray-400"
          style={{ backgroundImage: `url(${pokedexImage})` }}
        >
          <h2>name:{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p></p>
          <p></p>
        </div>
      )}
    </>
  );
};

export default Pokedex;
