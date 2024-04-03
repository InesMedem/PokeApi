const FilterPokemon = ({ types }) => {
  return (
    <>
      <div>
        {types.map((type) => (
          <button className="btn btn-blue m-2" key={type.name}>
            {type.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterPokemon;
