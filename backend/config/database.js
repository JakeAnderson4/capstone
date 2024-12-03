import Sequelize from "sequelize";
// import User from "../models/user.js";
// import Event from "../models/event.js";
// import Venue from "../models/venue.js";
// import SavedEvent from "../models/savedEvents.js";
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
  SavedEvent: initSavedEvent(sequelize) // this one may need to be checked
};

// Initialize models
// User.initModel(sequelize);
// Event.initModel(sequelize);
// Venue.initModel(sequelize);
// SavedEvent.initModel(sequelize);

// Define models object
// export const models = {
//     User,
//     Event,
//     Venue,
//     SavedEvent,
// };

// Call associations
//User.associate?.(models);
//Event.associate?.(models);
//Venue.associate?.(models);
//SavedEvent.associate?.(models);

//const db = { sequelize, models };
export const db = { sequelize, models }; // Named export
export default db;

