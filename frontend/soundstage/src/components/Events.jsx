import React, { useEffect, useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events dynamically from the backend
  const fetchEvents = () => {
    setLoading(true);
    setError(null);

    fetch(`/events?query=${query}&location=${location}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {events.map((event, index) => (
          <div key={index}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>{event.date} at {event.time}</p>
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
