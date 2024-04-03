import pokedexImage from "../public/pokedex.png";

const Pokedex = ({ id }) => {
  return (
    <>
      <div
        className="w-200 h-200 bg-cover bg-gray-400"
        style={{ backgroundImage: `url(${pokedexImage})` }}
      >
        <h2>{id}</h2>
      </div>
    </>
  );
};

export default Pokedex;
