/*
import React from "react";

const ResultsCard = ({ event }) => {
  return (
    <div className="results-card">
      <h3>{event.Name}</h3>
      <p>
        <strong>Event ID:</strong> {event.EventID}
      </p>
      <p>
        <strong>Location:</strong> {event.Location}
      </p>
      <p>
        <strong>Start:</strong> {new Date(event.start).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(event.end).toLocaleString()}
      </p>
      <p>
        <strong>URL:</strong>{" "}
        <a href={event.url} target="_blank" rel="noopener noreferrer">
          View Event
        </a>
      </p>
    </div>
  );
};

export default ResultsCard;

*/

import React from "react";

const ResultsCard = ({ event }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>{event.Name}</h3>
      <p><strong>Location:</strong> {event.Location}</p>
      <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
      <p><strong>Description:</strong> {event.description || "No description available"}</p>
      <a href={event.url} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    </div>
  );
};

export default ResultsCard;

