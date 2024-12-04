import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js';

const eventRouter = express.Router();

// Routes for events
eventRouter.get('/', getAllEvents); 
eventRouter.get('/:id', getEventById); 
eventRouter.post('/', createEvent); 
eventRouter.put('/:id', updateEvent); 
eventRouter.delete('/:id', deleteEvent); 

export default eventRouter;
