import Event from '../models/event.js';

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { name, date, location } = req.body;
    const newEvent = await Event.create({ name, date, location });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
};

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

