import typeColors from "../utils/typeColors";
import LikeButton from "./LikeButton";
import PropTypes from "prop-types";

const PokemonCard = ({
  id,
  name,
  sprites,
  types,
  onClick,
  isLiked,
  handleToggleLike,
}) => {
  return (
    <div
      key={id}
      onClick={onClick}
      className="flex w-44 cursor-pointer flex-col rounded-xl bg-white p-5 text-center shadow-lg"
      style={{
        border: `${typeColors[types[0].type.name].color} 5px solid`,
      }}
    >
      <h3>{name}</h3>
      <p className="font-light"> #{id}</p>
      <img src={sprites.front_default} alt={name} className="animate-bounce" />
      <div>
        {types.map((typeData, i) => (
          <button
            key={i}
            className="m-1.5 rounded-lg px-3 py-2 font-bold capitalize text-white"
            style={{
              backgroundColor: typeColors[typeData.type.name].color,
            }}
          >
            {typeData.type.name}
          </button>
        ))}
      </div>
      <LikeButton isLiked={isLiked} onToggleLike={() => handleToggleLike(id)} />
    </div>
  );
};

PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sprites: PropTypes.object.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  handleToggleLike: PropTypes.func.isRequired,
};

export default PokemonCard;
