// src/components/Sidebar.jsx
import React from "react";
import { useLocations } from "../context/LocationContext";
import LocationCard from "./LocationCard";

const Sidebar = () => {
  const { locations } = useLocations();

  return (
    <aside className="sidebar">
      <h3>Saved Locations</h3>
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </aside>

    /*
    
    <div>
      <h3>Saved Locations</h3>
      <ul>
        {locations.map((loc, index) => (
          <li key={index}>{loc.name}</li>
        ))}
      </ul>
    </div>
    
    */
  );
};

export default Sidebar;
