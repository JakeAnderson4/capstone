import axios from "axios";

const fetchEventbriteData = async () => {
  const apiUrl = "https://www.eventbriteapi.com/v3/events/search/";
  const params = {
    q: "music", // Search keyword
    "location.address": "New York", // Location filter
    token: "YOUR_API_KEY" // Replace with your API key
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const events = response.data.events;

    // Map data to match your SQL fields
    const mappedEvents = events.map((event) => ({
      event_id: event.id,
      name: event.name.text,
      description: event.description.text,
      start_time: event.start.local,
      end_time: event.end.local,
      location: event.venue?.address.localized_address_display,
      latitude: parseFloat(event.venue?.address.latitude),
      longitude: parseFloat(event.venue?.address.longitude)
    }));

    return mappedEvents;
  } catch (error) {
    console.error("Error fetching Eventbrite data:", error);
    throw error;
  }
};

fetchEventbriteData().then((data) => console.log(data));
