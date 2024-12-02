// src/components/Map.jsx
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://www.eventbriteapi.com/v3/events/search/?location.address=New+York&token=WDTQIRBUMSTATX23WNSJ"
        );

        if (!response.ok) {
          console.error("Error fetching Eventbrite data:", response.statusText);
          return;
        }

        const data = await response.json();
        if (data.events && Array.isArray(data.events)) {
          const mappedLocations = data.events
            .filter((event) => event.venue && event.venue.latitude && event.venue.longitude) // Ensure valid venue data
            .map((event) => ({
              latitude: parseFloat(event.venue.latitude),
              longitude: parseFloat(event.venue.longitude),
              name: event.name.text,
              description: event.description?.text || "No description available",
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
  }, []);

  const MapViewUpdater = ({ locations }) => {
    const map = useMap();

    useEffect(() => {
      if (locations.length > 0) {
        const bounds = locations.map((loc) => [loc.latitude, loc.longitude]);
        map.fitBounds(bounds);
      } else {
        map.setView([40.7128, -74.0060], 12); // Default to New York City
      }
    }, [locations, map]);

    return null;
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <h1>Event Map</h1>
      <MapContainer
        center={[40.7128, -74.0060]} // Default center
        zoom={12}
        style={{ height: "100%", width: "100%" }}
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
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
