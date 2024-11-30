//const express = require('express');
import express from 'express';
import { saveEvent, getSavedEvents } from '../controllers/savedEventController.js';
const savedEventsRouter = express.Router();

savedEventsRouter.post('/', saveEvent);
savedEventsRouter.get('/:userId', getSavedEvents);

export default savedEventsRouter;
