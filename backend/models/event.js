import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define("Event", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  apiProviderId: {
    type: DataTypes.STRING, // Eventbrite ID
  },
  venueId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Venues", // Reference your `Venue` table
      key: "id",
    },
  },
});

export default Event;
