import Event from "../models/event.js";
import Venue from "../models/venue.js"; // Import Venue model
import { validationResult } from "express-validator";
import { Op } from "sequelize";

// Fetch all events by ID
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};


// Fetch a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Error fetching event" });
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
    res.status(500).json({ error: "Error creating event" });
  }
};

// Update an existing event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const updatedEvent = await event.update(req.body);
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
};

export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
