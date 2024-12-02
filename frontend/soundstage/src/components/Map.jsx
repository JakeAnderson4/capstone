import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Header from "./Header";
import ResultsCard from "./ResultsCard"; // Import ResultsCard if used

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Perth");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch locations from API
  const fetchLocations = async (query) => {
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/events/search/?location.address=${encodeURIComponent(query)}&page_size=10&start_date.range_start=${new Date().toISOString()}&token=WDTQIRBUMSTATX23WNSJ`
      );
  
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("No events found for the given location.");
          setLocations([]);
          return;
        }
        throw new Error(`Eventbrite API responded with status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.events && data.events.length > 0) {
        const mappedLocations = data.events
          .filter(
            (event) =>
              event.venue &&
              event.venue.latitude &&
              event.venue.longitude
          )
          .map((event) => ({
            latitude: parseFloat(event.venue.latitude),
            longitude: parseFloat(event.venue.longitude),
            name: event.name.text,
            description: event.description?.text || "No description available",
            url: event.url,
          }));
  
        setLocations(mappedLocations);
      } else {
        console.warn("No events found in the API response.");
        setLocations([]);
      }
    } catch (err) {
      console.error("Error fetching Eventbrite data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount and query update
  useEffect(() => {
    fetchLocations(searchQuery);
  }, [searchQuery]);

  // Update map view
  const MapViewUpdater = ({ locations }) => {
    const map = useMap();

    useEffect(() => {
      if (locations.length > 0) {
        const bounds = locations.map((loc) => [loc.latitude, loc.longitude]);
        map.fitBounds(bounds);
      }
    }, [locations, map]);

    return null;
  };

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
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
            <ResultsCard key={index} event={location.event} />
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
