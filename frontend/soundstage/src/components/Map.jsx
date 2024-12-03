import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Header from "./Header";
import ResultsCard from "./ResultsCard";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const [locations, setLocations] = useState([]); // Fetched locations
  const [searchQuery, setSearchQuery] = useState("Perth"); // Default query
  const [error, setError] = useState(null); // Error handling
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch locations from API
  const fetchLocations = async (query) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/events?location=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data from API:", data);

      if (data.events && data.events.length > 0) {
        // Map the locations properly
        const mappedLocations = data.events.map((event) => ({
          latitude: parseFloat(event.latitude) || null,
          longitude: parseFloat(event.longitude) || null,
          name: event.Name,
          description: event.description || "No description available",
          url: event.url,
          start: event.start,
          end: event.end,
        }));

        console.log("Mapped locations:", mappedLocations);

        // Filter valid locations
        const validLocations = mappedLocations.filter(
          (loc) => loc.latitude && loc.longitude
        );

        console.log("Valid locations:", validLocations);

        setLocations(validLocations);
      } else {
        console.warn("No events found in API response.");
        setLocations([]); // Clear locations if no data found
      }
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch locations on component mount or query update
  useEffect(() => {
    fetchLocations(searchQuery);
  }, [searchQuery]);

  // Update map view
  const MapViewUpdater = ({ locations }) => {
    const map = useMap();

    useEffect(() => {
      const validLocations = locations.filter(
        (loc) => loc.latitude !== null && loc.longitude !== null
      );

      if (validLocations.length > 0) {
        const bounds = validLocations.map((loc) => [
          loc.latitude,
          loc.longitude,
        ]);
        map.fitBounds(bounds);
      } else {
        console.warn("No valid map bounds available.");
      }
    }, [locations, map]);

    return null;
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {/* Left Panel for Events List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        <Header
          onSearch={(query) => setSearchQuery(query)} // Update search query in the Map component
          onLocationChange={(newLocations) => setLocations(newLocations)} // Update locations
        />
        <h2>Event List</h2>
        {loading && <p>Loading events...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <ResultsCard key={index} event={location} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>

      {/* Right Panel for Map */}
      <div style={{ flex: 2 }}>
        <MapContainer
          center={[-31.9505, 115.8605]} // Default to Perth
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapViewUpdater locations={locations} />
          {locations.map((location, index) =>
            location.latitude && location.longitude ? (
              <Marker
                key={index}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <strong>{location.name}</strong>
                  <p>{location.description}</p>
                  <a
                    href={location.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
