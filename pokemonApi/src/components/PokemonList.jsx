const PokemonList = ({ pokemon, loading, Cards }) => {
  return (
    <>
      {loading ? (
        <h1> Loading ... </h1>
      ) : (
        pokemon.map((item) => {
          return (
            <>
              <div key={item.id} onClick={() => Cards(item)}>
                <h1 className="font-bold">{item.name}</h1>

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
