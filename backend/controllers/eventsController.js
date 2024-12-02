import Event from '../models/event.js';
import { validationResult } from 'express-validator'; // Add validation if needed
import { Op } from 'sequelize';

const getAllEvents = async (req, res) => {
  const location = req.query.location ? req.query.location.trim() : null;
  const page = parseInt(req.query.page) || 1; // Default page = 1
  const limit = parseInt(req.query.limit) || 10; // Default limit = 10

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  console.log('Received location query:', location); // Debug log

  try {
    const { count, rows: events } = await Event.findAndCountAll({
      where: {
        Location: { [Op.like]: `%${location}%` },
      },
      attributes: [
        'EventID',
        'Name',
        'Location',
        'url',
        'start',
        'end',
      ],
      offset: (page - 1) * limit,
      limit: limit,
    });

    console.log('Fetched events:', events); // Debug log

    if (events.length === 0) {
      return res.status(404).json({ error: 'No events found for the given location' });
    }

    res.json({
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalEvents: count,
      events,
    });
  } catch (error) {
    console.error('Error fetching events:', error); // Log the exact error
    res.status(500).json({ error: 'Error fetching events' });
  }
};


// Fetch a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, date, location } = req.body;
    const newEvent = await Event.create({ name, date, location });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
};

// Update an existing event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const updatedEvent = await event.update(req.body);
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    await event.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
};

export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
