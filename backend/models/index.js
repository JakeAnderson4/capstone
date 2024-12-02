import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import User from "./user.js"; // Import the User model

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false, // Optional: Disable logging SQL queries to the console
    }
);

// Initialize models
User.initModel(sequelize); // Ensure the User model is initialized

// Test database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
    }
})();

export default sequelize;
