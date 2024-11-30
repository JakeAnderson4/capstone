
import User from "./user.js";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

export default sequelize;


/*
import sequelize from "../config/database.js"; // Adjust path to your database config
import User from "./user.js"; // Import the User model

// Initialize all models
const db = {
  sequelize,
  Sequelize,
  User, // Add User here
};

export default db;

*/
