import Cards from "./Cards";

const PokemonList = ({ pokemon, loading }) => {
  console.log("🚀 ~ PokemonList ~ pokemon:", pokemon);

  return (
    <>
      {loading ? (
        <h1> Loading ... </h1>
      ) : (
        pokemon.map((item) => {
          return (
            <>
              <div className="Card">
                <h2>{item.name}</h2>

                <h2>{item.id}</h2>
                <img src={item.sprites.other.dream_world.front_default} />
                <p>{item.weight}kg</p>
              </div>
            </>
          );
        })
      )}
    </>
  );
};
export default PokemonList;
