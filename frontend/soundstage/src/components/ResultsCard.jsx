import React from "react";

const ResultsCard = ({ event }) => {
  if (!event) {
    return <div>No event data available.</div>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>{event.name}</h3>
      <p>
        <strong>Location:</strong> {event.Location || "Unknown"}
      </p>
      <p>
        <strong>Start:</strong> {new Date(event.start).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(event.end).toLocaleString()}
      </p>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <a href={event.url} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    </div>
  );
};

export default ResultsCard;
