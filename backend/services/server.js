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
app.get('/api/events', (req, res) => {
  // Mock data or fetch from DB
  const events = [{ id: 1, name: 'Music Festival', date: '2024-12-01' }];
  res.json(events);
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


