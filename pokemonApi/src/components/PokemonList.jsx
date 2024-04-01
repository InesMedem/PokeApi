import PropTypes from "prop-types";

const PokemonList = ({ pokemon, loading, Cards }) => {
  return (
    <>
      {loading ? (
        <h1> Loading ... </h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => Cards(item)}
              className="flex w-60 p-7 items-center justify-around border border-solid border-black"
            >
              <h2>{item.id}</h2>

              <img
                className="w-12"
                src={item.sprites.other.dream_world.front_default}
                alt={`Pokemon ${item.name}`}
              />
              <h1 className="font-bold capitalize">{item.name}</h1>
            </div>
          );
        })
      )}
    </>
  );
};

PokemonList.propTypes = {
  pokemon: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  Cards: PropTypes.func.isRequired,
};
export default PokemonList;
