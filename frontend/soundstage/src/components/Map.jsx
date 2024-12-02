import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Header from "./Header";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Perth"); // Default location

  // Function to handle updated locations passed from Header
  const onLocationChange = (newLocations) => {
    console.log("Updating locations from Header:", newLocations);
    setLocations(newLocations);
  };

  // Use effect to fetch initial locations when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://www.eventbriteapi.com/v3/events/search/?location.address=${encodeURIComponent(
            searchQuery
          )}&page_size=10&start_date.range_start=${new Date().toISOString()}&token=WDTQIRBUMSTATX23WNSJ`
        );

        if (!response.ok) {
          console.error("Error fetching Eventbrite data:", response.statusText);
          return;
        }

        const data = await response.json();
        if (data.events && Array.isArray(data.events)) {
          const mappedLocations = data.events
            .filter(
              (event) =>
                event.venue && event.venue.latitude && event.venue.longitude
            )
            .map((event) => ({
              latitude: parseFloat(event.venue.latitude),
              longitude: parseFloat(event.venue.longitude),
              name: event.name.text,
              url: event.url, // Include the event URL
              description:
                event.description?.text || "No description available",
            }));
          setLocations(mappedLocations);
        } else {
          console.warn("No events found in API response.");
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching Eventbrite data:", error);
      }
    };

    fetchLocations();
  }, [searchQuery]); // Re-fetch locations when searchQuery changes

  // Update map view when locations change
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

  // Handle search input from Header
  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query
  };

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      {/* Pass onSearch and onLocationChange to Header */}
      <Header onSearch={handleSearch} onLocationChange={onLocationChange} />
      <h1>Event Map</h1>
      <MapContainer
        center={[-31.9505, 115.8605]} // Default to Perth
        zoom={12}
        style={{ height: "90%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapViewUpdater locations={locations} />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <strong>{location.name}</strong>
              <p>{location.description}</p>
              <a href={location.url} target="_blank" rel="noopener noreferrer">
                View Details
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
