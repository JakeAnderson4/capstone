import React, { useState } from "react";

const Header = ({ onLocationChange }) => {
  const [query, setQuery] = useState("");

  const onSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a location to search.");
      return;
    }

    console.log("Search initiated for:", query);

    const API_URL = `https://www.eventbriteapi.com/v3/events/search/?location.address=${encodeURIComponent(
      query
    )}&page_size=10&start_date.range_start=${new Date().toISOString()}&token=WDTQIRBUMSTATX23WNSJ`;

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("No events found for this location.");
          alert("No events found. Please refine your search.");
          return;
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.events || data.events.length === 0) {
        console.warn("No events found in the API response.");
        alert("No events found. Please refine your search.");
        return;
      }

      console.log("Search results:", data.events);

      // Map and pass event data to the parent component
      const mappedEvents = data.events.map((event) => ({
        name: event.name?.text || "No title available",
        description: event.description?.text || "No description available",
        latitude: event.venue?.latitude || null,
        longitude: event.venue?.longitude || null,
        url: event.url || "#",
      }));

      onLocationChange(mappedEvents); // Update the locations in the parent
    } catch (error) {
      console.error("Error during search:", error);
      alert("An error occurred while searching. Please try again later.");
    }
  };

  return (
    <header className="header">
      <input
        type="text"
        placeholder="Search for a location in Australia..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </header>
  );
};

export default Header;
