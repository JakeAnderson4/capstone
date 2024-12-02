import React, { useState } from "react";

const Header = ({ onSearch, onLocationChange }) => {
  const [query, setQuery] = useState("");

  const onSearchHandler = async () => {
    if (!query.trim()) {
      alert("Please enter a location to search.");
      return;
    }

    try {
      // Fetch events from the backend
      const response = await fetch(
        `http://localhost:5000/api/events?location=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      if (!data.events || data.events.length === 0) {
        alert("No events found for this location.");
        return;
      }

      console.log("Search results:", data.events);
      onLocationChange(data.events); // Pass data to parent component
      if (onSearch) {
        onSearch(query.trim()); // Update search state in the parent if provided
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  return (
    <header className="header">
      <input
        type="text"
        placeholder="Search for a location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearchHandler}>Search</button>
    </header>
  );
};

export default Header;
