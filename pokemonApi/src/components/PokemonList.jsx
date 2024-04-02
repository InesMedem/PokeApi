import PropTypes from "prop-types";

const PokemonList = ({ pokemon, loading, Cards }) => {
  return (
    <>
      <h1 className="bg-pink-500">WELCOME</h1>
      <div className="grid grid-cols-2">
        {loading ? (
          <h1> Loading ... </h1>
        ) : (
          pokemon.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => Cards(item)}
                className="p-7 flex justify-center items-center rounded-xl bg-pink-500 "
              >
                <h2>{item.id}</h2>

                <img
                  className="w-16 h-16"
                  src={item.sprites.other.dream_world.front_default}
                  alt={`Pokemon ${item.name}`}
                />
                <h1 className="font-bold capitalize">{item.name}</h1>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

PokemonList.propTypes = {
  pokemon: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  Cards: PropTypes.func.isRequired,
};
export default PokemonList;
