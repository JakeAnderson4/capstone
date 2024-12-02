import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
  EventID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  Date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  Time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  summary: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  start: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

export default Event;
