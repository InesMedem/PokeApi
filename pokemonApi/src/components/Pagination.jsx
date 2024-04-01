const Pagination = ({ setPokemon, setUrl, nextUrl, prevUrl }) => {
  return (
    <div>
      {prevUrl && (
        <button
          onClick={() => {
            setPokemon([]);
            setUrl(prevUrl);
          }}
        >
          Previous
        </button>
      )}
      {nextUrl && (
        <button
          onClick={() => {
            setPokemon([]);
            setUrl(nextUrl);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
