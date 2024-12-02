import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; // Sequelize instance
import authRouter from './routes/authRoutes.js'; 
import eventRouter from './routes/eventRoutes.js';
import savedEventRouter from './routes/savedEventRoutes.js';
import cors from 'cors'; // Import CORS middleware


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON requests

// Test Route
app.get('/test', (req, res) => {
  console.log('Test endpoint was hit.');
  res.json({ message: 'Test endpoint is working!' });
});

// Integrate Routers
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/events', eventRouter); // Event routes
app.use('/api/saved-events', savedEventRouter); // Saved events routes

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
});
