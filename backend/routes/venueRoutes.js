import express from 'express';
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from '../controllers/venueController.js';

const router = express.Router();

// GET all venues
router.get('/', getAllVenues);

// GET a single venue by ID
router.get('/:id', getVenueById);

// POST a new venue
router.post('/', createVenue);

// PUT (update) an existing venue by ID
router.put('/:id', updateVenue);

// DELETE a venue by ID
router.delete('/:id', deleteVenue);

export default router;
