import { DataTypes } from 'sequelize';

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
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true, // Optional field
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true, // Optional field
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "Events",
    },
    
  );
};

