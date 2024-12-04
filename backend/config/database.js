import Sequelize from "sequelize";
import initVenue from '../models/venue.js';
import initUser from '../models/user.js';
import initSavedEvent from "../models/savedEvents.js";
import initEvent from "../models/event.js";
import dotenv from 'dotenv';

dotenv.config();


export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

const models = {
  Venue: initVenue(sequelize),
  User: initUser(sequelize),
  Event: initEvent(sequelize),
  SavedEvent: initSavedEvent(sequelize)
};

export const db = { sequelize, models }; // Named export
export default db;

