import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'User', // Model name
    {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { // Maps to "Name" in the database
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Name', // Explicitly map to the database column
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'Email', // Explicitly map to the database column
      },
      password: { // Maps to "PasswordHash" in the database
        type: DataTypes.STRING,
        allowNull: false,
        field: 'PasswordHash', // Explicitly map to the database column
      },
    },
    {
      tableName: 'users', // Matches your table name in the database
      timestamps: false,  // Disable timestamps if not used
    }
  );
};
