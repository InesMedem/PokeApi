const SearchFunction = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <input
        className="rounded-full p-3 font-bold"
        type="text"
        onChange={handleSearch}
        placeholder="Search a Pokemon..."
      />
    </div>
  );
};

export default SearchFunction;
