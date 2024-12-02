const axios = require('axios');
const dotenv = require('dotenv');
const Event = require('../models/event'); // Your Sequelize model for the events table

dotenv.config();

const API_KEY = process.env.EVENTBRITE_API_KEY;
const BASE_URL = 'https://www.eventbriteapi.com/v3';

/**
 * Fetch and store events from Eventbrite based on a location.
 * @param {string} location - The city or location to search for events.
 * @returns {Array} - List of events that were saved to the database.
 */
async function fetchAndStoreEvents(location) {
    try {
        const response = await axios.get(`${BASE_URL}/events/search/`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
            params: {
                'location.address': location,
                'location.within': '10km', // Search within a radius of 10km
                expand: 'venue', // Include venue details
            },
        });

        const events = response.data.events || [];

        // Map Eventbrite API data to your database schema
        const mappedEvents = events.map(event => ({
            name: event.name.text,
            summary: event.summary || null,
            description: event.description?.text || null,
            url: event.url,
            start: event.start.utc,
            end: event.end.utc,
            created_at: event.created,
            updated_at: event.changed,
            published_at: event.published,
            status: event.status,
            currency: event.currency,
            is_online: event.online_event ? 1 : 0,
            latitude: event.venue?.latitude || null,
            longitude: event.venue?.longitude || null,
        }));

        // Save mapped events to the database
        await Event.bulkCreate(mappedEvents, { ignoreDuplicates: true });

        console.log(`${mappedEvents.length} events saved successfully.`);
        return mappedEvents;
    } catch (error) {
        console.error('Error fetching or saving events from Eventbrite:', error.message);
        throw new Error('Failed to fetch or save events from Eventbrite');
    }
}

module.exports = { fetchAndStoreEvents };
