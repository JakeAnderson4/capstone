import express from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController.js';

const eventRouter = express.Router();

eventRouter.get('/', getAllEvents); // Route to get all events
eventRouter.get('/:id', getEventById); // Route to get an event by ID
eventRouter.post('/', createEvent); // Route to create a new event
eventRouter.put('/:id', updateEvent); // Route to update an event
eventRouter.delete('/:id', deleteEvent); // Route to delete an event

export default eventRouter;
