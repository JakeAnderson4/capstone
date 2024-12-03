// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// import User from "./user.js"; // Import the User model
// import Event from "./event.js"; // Import the Event model
// import Venue from "./venue.js"; // Import the Venue model

// dotenv.config();

// // Initialize Sequelize instance
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: "mysql",
//         logging: false, // Optional: Disable logging SQL queries to the console
//     }
// );

// // Initialize models
// User.initModel(sequelize); // Initialize User model
// Event.initModel(sequelize); // Initialize Event model
// Venue.initModel(sequelize); // Initialize Venue model

// // Define models object to pass for associations
// const models = {
//     User,
//     Event,
//     Venue,
// };

// // Call associations
// Event.associate(models); // Associate Event with Venue
// Venue.associate(models); // Associate Venue with Event

// // Test database connection and synchronize models
// (async () => {
//     try {
//         await sequelize.authenticate(); // Test database connection
//         console.log("Database connected successfully!");

//         // Synchronize models with the database
//         await sequelize.sync({ alter: true }); // Update database schema if needed
//         console.log("Models synchronized successfully!");
//     } catch (error) {
//         console.error("Failed to connect to the database:", error.message);
//     }
// })();

// // Export Sequelize instance and models
// export { sequelize, models }; // Export both the Sequelize instance and models
