const FilterPokemon = ({ types }) => {
  return (
    <>
      <div>
        {types.map((type, i) => (
          <button className="btn btn-blue m-2 capitalize" key={i}>
            {/* {typeColors[type.name.toLowerCase()].emoji}  */}
            {type.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterPokemon;
