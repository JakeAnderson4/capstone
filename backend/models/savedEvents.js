import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SavedEvent = sequelize.define("SavedEvent", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Table name for the User model
      key: "id", // Primary key in the User model
    },
    onDelete: "CASCADE", // Delete saved events if the user is deleted
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Events", // Table name for the Event model
      key: "id", // Primary key in the Event model
    },
    onDelete: "CASCADE", // Delete saved events if the associated event is deleted
  },
});

export default SavedEvent;
