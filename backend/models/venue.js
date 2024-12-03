import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define(
      'Venue',
      {
        VenueID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        City: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        State: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Country: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Capacity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: 'venues', // Match table name in the database
        timestamps: false, // Disable timestamps
      }
    );
  };


