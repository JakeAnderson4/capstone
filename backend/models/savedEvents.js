import { DataTypes } from 'sequelize';


export default(sequelize) => {
  return sequelize.define(
  'SavedEvent',
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    EventID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    IsFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'saved_events', // Match table name in the database
    timestamps: false, // Disable timestamps
  }
);
};

