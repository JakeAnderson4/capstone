//const { SavedEvent } = require('../models');
import SavedEvent from '../models/savedEvents.js';

const saveEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const savedEvent = await SavedEvent.create({ userId, eventId });
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error saving event' });
  }
};

const getSavedEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const savedEvents = await SavedEvent.findAll({ where: { userId } });
    res.json(savedEvents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching saved events' });
  }
};

export { saveEvent, getSavedEvents };
