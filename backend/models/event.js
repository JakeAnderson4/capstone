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

// class Event extends Model {
//     static initModel(sequelize) {
//         Event.init(
//             {
//                 EventID: {
//                     type: DataTypes.INTEGER,
//                     autoIncrement: true,
//                     primaryKey: true,
//                 },
//                 Name: {
//                     type: DataTypes.STRING,
//                     allowNull: false,
//                 },
//                 url: {
//                     type: DataTypes.STRING,
//                     allowNull: true,
//                 },
//                 start: {
//                     type: DataTypes.DATE,
//                     allowNull: false,
//                 },
//                 end: {
//                     type: DataTypes.DATE,
//                     allowNull: false,
//                 },
//                 venueId: {
//                     type: DataTypes.INTEGER,
//                     allowNull: false,
//                 },
//             },
//             {
//                 sequelize,
//                 modelName: "Event",
//                 tableName: "Events",
//             }
//         );
//     }

//     // Define the relationship between Event and Venue
//     static associate(models) {
//         Event.belongsTo(models.Venue, {
//             foreignKey: "venueId", // Reference the venueId column
//             as: "venue", // Alias for the joined data
//         });
//     }
// }
