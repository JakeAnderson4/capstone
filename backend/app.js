import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js'; 
import eventRouter  from './routes/eventRoutes.js'; 
import savedEventRouter from './routes/savedEventRoutes.js';  // Import router to use for all routes
import sequelize from './config/database.js';  // Import Sequelize instance to sync DB



/*const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});
// Middleware
app.use(express.json());

app.get('/events', async (req, res) => {
    const { query = '', location = '', sort_by = 'date' } = req.query; // Extract query params from the request
  
    try {
      // Fetch data from Eventbrite API
      const response = await axios.get('https://www.eventbriteapi.com/v3/events/search/', {
        headers: { Authorization: `Bearer ${process.env.EVENTBRITE_API_KEY}` },
        params: {
          q: query,                  // Pass user query (e.g., "music", "art")
          'location.address': location, // Pass location (e.g., "New York")
          sort_by: sort_by,          // Pass sort option (e.g., "date")
        },
      });
  
      // Transform API data
      const events = response.data.events.map((event) => ({
        name: event.name.text,
        description: event.description?.text || 'No description available',
        date: event.start.local.split('T')[0], // Extract date
        time: event.start.local.split('T')[1], // Extract time
        venue: event.venue_id || 'Venue details not available', // Use venue_id if available
        apiProviderId: event.id,
        url: event.url, // Eventbrite event link
      }));
  
      res.json(events); // Send transformed data to frontend
    } catch (error) {
      console.error('Error fetching events:', error.message);
      res.status(500).json({ error: 'Failed to fetch events from Eventbrite' });
    }
  });
  */




console.log('Starting app.js...');

/*const express = require('express');
//import express from 'express';
const sequelize = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;
*/
dotenv.config();


console.log('Database Port:', process.env.DB_PORT);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);


const app = express();
const PORT = 3000;
// Middleware to handle JSON
app.use(express.json());

// Test Route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});


 app.get('/events', async (req, res) => {
  try {
    const events = await sequelize.query('SELECT * FROM events', {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



