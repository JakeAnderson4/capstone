const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.EVENTBRITE_API_KEY;
const BASE_URL = 'https://www.eventbriteapi.com/v3';

/**
 * Fetch events from Eventbrite based on a location.
 * @param {string} location - The city or location to search for events.
 * @returns {Array} - List of events.
 */
async function fetchEventsByLocation(location) {
    try {
        const response = await axios.get(`${BASE_URL}/events/search/`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
            params: {
                location: location,
                'location.within': '10km', // Search within a radius of 10km
                expand: 'venue', // Include venue details
            },
        });

        return response.data.events || [];
    } catch (error) {
        console.error('Error fetching events from Eventbrite:', error.message);
        throw new Error('Failed to fetch events from Eventbrite');
    }
}

module.exports = { fetchEventsByLocation };
