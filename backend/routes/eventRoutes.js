import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js';

const router = express.Router();

// Routes for events
router.get('/', getAllEvents); // Fetch all events (with optional pagination)
router.get('/:id', getEventById); // Fetch a single event by ID
router.post('/', createEvent); // Create a new event
router.put('/:id', updateEvent); // Update an event by ID
router.delete('/:id', deleteEvent); // Delete an event by ID

export default router;
