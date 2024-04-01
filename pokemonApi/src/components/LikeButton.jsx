const LikeButton = ({ isLiked, onToggleLike }) => {
  return (
    <>
      <button onClick={onToggleLike}>{isLiked ? "Unlike" : "Like"}</button>
    </>
  );
};

export default LikeButton;
