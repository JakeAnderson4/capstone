
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();



// Initialize Sequelize with environment variables
/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql', // Use MySQL as the database
  logging: false,   // Disable logging for cleaner output
});
*/

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));

//export default { sequelize };
export default sequelize;