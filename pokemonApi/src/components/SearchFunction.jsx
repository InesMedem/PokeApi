const SearchFunction = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        className="btn"
        type="text"
        onChange={handleSearch}
        placeholder="Search a Pokemon..."
      />
    </div>
  );
};

export default SearchFunction;
