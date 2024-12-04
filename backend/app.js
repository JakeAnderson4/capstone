/*
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import savedEventRouter from './routes/savedEventRoutes.js';
import cors from 'cors'; // Import CORS middleware
import db from './config/database.js';


const { sequelize } = db;

sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch((err) => console.error('Error syncing database:', err));



// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON requests

app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/test', (req, res) => {
  console.log('Test endpoint was hit.');
  res.json({ message: 'Test endpoint is working!' });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/test', (req, res) => {
  res.send('Backend is running');
});


app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

*/

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import authRouter from './routes/authRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import savedEventRouter from './routes/savedEventRoutes.js';
import db from './config/database.js'; // Import database configuration

dotenv.config(); // Load environment variables

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON requests

const { sequelize, models } = db; // Destructure sequelize and models for clarity
const { User } = models; // Access the User model for debugging

sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');
    console.log('Initialized Models:', Object.keys(models)); // Log available models
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


// Test the User model initialization
if (!User || typeof User.findOne !== 'function') {
  console.error('User model is not initialized correctly');
} else {
  console.log('User model initialized successfully');
}

// Routes
app.use('/api/auth', authRouter);
// Add other routers (eventRouter, savedEventRouter) as needed
// app.use('/api/events', eventRouter);
// app.use('/api/saved-events', savedEventRouter);

// Test route for debugging
app.get('/test', (req, res) => {
  console.log('Test endpoint was hit.');
  res.json({ message: 'Test endpoint is working!' });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
