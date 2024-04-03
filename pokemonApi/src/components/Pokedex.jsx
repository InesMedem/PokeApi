import pokedexImage from "../public/pokedex.png";

const Pokedex = () => {
  return (
    <div
      className="w-200 h-200 bg-cover"
      style={{ backgroundImage: `url(${pokedexImage})` }}
    ></div>
  );
};

export default Pokedex;
