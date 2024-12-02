import React, { useState } from "react";

const Header = ({ onLocationChange }) => {
  const [query, setQuery] = useState("");

  const useDummyData = () => {
    const dummyEvents = [
      {
        name: { text: "Sample Event 1" },
        description: { text: "This is a sample event description." },
        venue: { latitude: -33.8688, longitude: 151.2093 },
        url: "https://example.com/event1",
      },
      {
        name: { text: "Sample Event 2" },
        description: { text: "Another sample event description." },
        venue: { latitude: -34.9285, longitude: 138.6007 },
        url: "https://example.com/event2",
      },
    ];

    console.log("Using dummy data:", dummyEvents);
    displayEvents(dummyEvents);
  };

  const displayEvents = (events) => {
    const mappedEvents = events.map((event) => ({
      name: event.name.text,
      description: event.description.text,
      latitude: event.venue.latitude,
      longitude: event.venue.longitude,
      url: event.url || "#",
    }));
    console.log("Displaying events:", mappedEvents);
    onLocationChange(mappedEvents); // Pass processed events to parent component
  };

  const onSearch = async (query) => {
    console.log("Search initiated for:", query);

    const API_URL = `https://www.eventbriteapi.com/v3/events/search/?location.address=${encodeURIComponent(
      query
    )}&page_size=10&start_date.range_start=${new Date().toISOString()}&token=WDTQIRBUMSTATX23WNSJ`;

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("No events found for this location.");
          alert("No events found. Showing sample data.");
          return useDummyData();
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.events || data.events.length === 0) {
        console.warn("No events found in the API response.");
        return useDummyData();
      }

      console.log("Search results:", data.events);
      displayEvents(data.events);
    } catch (error) {
      console.error("Error during search:", error);
      alert("An error occurred while searching. Showing sample data.");
      useDummyData();
    }
  };

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a location to search.");
      return;
    }
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
