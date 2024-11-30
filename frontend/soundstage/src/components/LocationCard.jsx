// src/components/LocationCard.jsx
import React from "react";
import { useLocations } from "../context/LocationContext";

const LocationCard = ({ location }) => {
  const { deleteLocation } = useLocations();

  return (
    <div className="location-card">
      <p>{location.name}</p>
      <button onClick={() => deleteLocation(location.id)}>Delete</button>
    </div>
  );
};

export default LocationCard;
