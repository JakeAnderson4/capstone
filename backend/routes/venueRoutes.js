import express from 'express';
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from '../controllers/venueController.js';

const venueRouter = express.Router();

// GET all venues
venueRouter.get('/', getAllVenues);

// GET a single venue by ID
venueRouter.get('/:id', getVenueById);

// POST a new venue
venueRouter.post('/', createVenue);

// PUT (update) an existing venue by ID
venueRouter.put('/:id', updateVenue);

// DELETE a venue by ID
venueRouter.delete('/:id', deleteVenue);

export default venueRouter;
