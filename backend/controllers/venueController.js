import db from '../config/database.js';

const { Venue } = db.models;

export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.status(200).json(venues);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
};

export const getVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findByPk(id);
    if (venue) {
      res.status(200).json(venue);
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    console.error('Error fetching venue:', error);
    res.status(500).json({ error: 'Failed to fetch venue' });
  }
};

export const createVenue = async (req, res) => {
  try {
    const newVenue = await Venue.create(req.body);
    res.status(201).json(newVenue);
  } catch (error) {
    console.error('Error creating venue:', error);
    res.status(500).json({ error: 'Failed to create venue' });
  }
};

export const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Venue.update(req.body, { where: { VenueID: id } });
    if (updatedRows > 0) {
      const updatedVenue = await Venue.findByPk(id);
      res.status(200).json(updatedVenue);
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(500).json({ error: 'Failed to update venue' });
  }
};

export const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Venue.destroy({ where: { VenueID: id } });
    if (deletedRows > 0) {
      res.status(200).json({ message: 'Venue deleted successfully' });
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    console.error('Error deleting venue:', error);
    res.status(500).json({ error: 'Failed to delete venue' });
  }
};
