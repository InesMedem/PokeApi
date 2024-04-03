import typeColors from "../utils/typeColors";

const FilterPokemon = ({ types }) => {
  return (
    <>
      <div>
        {types.map((type, i) => (
          <button
            className="btn btn-blue m-2 capitalize"
            key={i}
            style={{ backgroundColor: typeColors[type.name].color }}
          >
            {/* {typeColors[type.name.toLowerCase()].emoji}  */}
            {type.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterPokemon;
