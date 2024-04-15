import typeColors from "../utils/typeColors";
import LikeButton from "./LikeButton";

const PokemonCard = ({ id, name, sprites, types, onClick, isLiked }) => {
  return (
    <div
      key={id}
      onClick={onClick}
      className="flex flex-col rounded-xl w-56 text-center p-5 shadow-lg bg-white"
      style={{
        border: `${typeColors[types[0].type.name].color} 5px solid`,
      }}
    >
      <h2 className="uppercase font-bold text-2xl">{name}</h2>
      <p> #{id}</p>
      <img
        src={sprites.front_default}
        alt={name}
        // className="animate-bounce"
      />
      <div>
        {types.map((typeData, i) => (
          <button
            key={i}
            className="capitalize m-1.5 font-bold py-2 px-3 rounded-full text-white"
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

export default PokemonCard;
