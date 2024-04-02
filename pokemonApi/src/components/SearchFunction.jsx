import { useEffect, useState } from "react";

const SearchFunction = ({ data, setData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Filter data based on the search query
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    // Update the displayed data with the filtered results
    setData(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchFunction;
