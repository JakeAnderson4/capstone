import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current directory:', __dirname);

// Import sequelize and models
import sequelize from path.join(__dirname, './database.js');
import Event from path.join(__dirname, '../models/event.js');

console.log('Sequelize and Event model paths resolved.');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();

console.log('Event model is being loaded...');
console.log('Current directory:', __dirname);


