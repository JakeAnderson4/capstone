
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import savedEventRouter from './routes/savedEventRoutes.js';
import db from './config/database.js'; // Import database configuration

dotenv.config(); 

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

// Middleware
app.use(express.json()); 

const { sequelize, models } = db; 
const { User } = models; 

// Test the User model initialization
if (!User || typeof User.findOne !== 'function') {
  console.error('User model is not initialized correctly');
} else {
  console.log('User model initialized successfully');
}

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/events', eventRouter);
 app.use('/api/saved-events', savedEventRouter);

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

