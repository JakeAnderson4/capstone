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

app.get('/test', (req, res) => {
  console.log('Test endpoint was hit.');
  res.json({ message: 'Test endpoint is working!' });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
