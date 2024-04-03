const LikeButton = ({ isLiked, onToggleLike }) => {
  return (
    <button onClick={onToggleLike}>
      {isLiked ? (
        <span
          className="material-symbols-outlined text-red-500"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          favorite
        </span>
      ) : (
        <span className="material-symbols-outlined text-red-500">favorite</span>
      )}
    </button>
  );
};

export default LikeButton;
