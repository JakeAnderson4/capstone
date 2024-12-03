//import { Model, DataTypes } from "sequelize"; 
import { DataTypes } from 'sequelize';

/*
import { db } from '../config/database.js'; // Default import
const { sequelize } = db; // Destructure sequelize
*/

export default (sequelize) => {
  return sequelize.define(
    "Event",
    {
      EventID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "Events",
    }
  );
};

