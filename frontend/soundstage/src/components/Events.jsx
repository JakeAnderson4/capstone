import React, { useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events dynamically from the Eventbrite API
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = `https://www.eventbriteapi.com/v3/events/search/?q=${encodeURIComponent(
        query
      )}&location.address=${encodeURIComponent(
        location
      )}&token=WDTQIRBUMSTATX23WNSJ`;

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      if (data.events && data.events.length > 0) {
        // Map and transform the API response for easier rendering
        const mappedEvents = data.events.map((event) => ({
          name: event.name?.text || "No title available",
          description: event.description?.text || "No description available",
          date: event.start?.local.split("T")[0] || "No date available",
          time: event.start?.local.split("T")[1] || "No time available",
          venue: event.venue?.name || "No venue available",
          url: event.url || "#",
        }));

        setEvents(mappedEvents);
      } else {
        setEvents([]);
        setError("No events found for this search.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Event Finder</h1>
      <div>
        <input
          type="text"
          placeholder="Search for events"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchEvents}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {events.map((event, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>
              {event.date} at {event.time}
            </p>
            <p>Venue: {event.venue}</p>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              View Event
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
