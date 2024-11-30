// src/components/Header.jsx
import React, { useState } from "react";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <header className="header">
      <input
        type="text"
        placeholder="Search for a location in Australia..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </header>
  );
};

export default Header;
