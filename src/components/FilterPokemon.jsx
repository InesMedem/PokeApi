import typeColors from "../utils/typeColors";
import PropTypes from "prop-types";

const FilterPokemon = ({ types }) => {
  return (
    <>
      <div className="p-5">
        {types.map((type, i) => (
          <button
            className="btn btn-blue m-2 capitalize"
            key={i}
            style={{ backgroundColor: typeColors[type.name].color }}
          >
            {type.name}
          </button>
        ))}
      </div>
    </>
  );
};

FilterPokemon.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FilterPokemon;
