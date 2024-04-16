const SearchFunction = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        className="w-full rounded-lg p-3 font-bold"
        type="text"
        onChange={handleSearch}
        placeholder="Search a Pokemon..."
      />
    </div>
  );
};

export default SearchFunction;
