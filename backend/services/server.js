const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const savedEventRoutes = require('./routes/savedEventRoutes');
app.use('/api/saved-events', savedEventRoutes);




// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/api/events', async (req, res) => {
  const { location } = req.query;

  if (!location) {
      return res.status(400).json({ error: "Location is required" });
  }

  try {
      const events = await sequelize.query(
          `SELECT e.EventID, e.Name, e.Description, v.latitude, v.longitude, v.name AS VenueName, e.Start, e.End, e.URL
           FROM events e
           LEFT JOIN venues v ON e.venueId = v.venueId
           WHERE e.Location LIKE :location`,
          {
              replacements: { location: `%${location}%` },
              type: QueryTypes.SELECT,
          }
      );
      res.json({ events });
  } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body; // Event data sent from frontend
  console.log('Event Created:', newEvent);
  res.status(201).json(newEvent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


