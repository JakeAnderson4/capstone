import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'User',
    {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'Email',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'PasswordHash',
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );
};
