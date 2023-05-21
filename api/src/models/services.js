import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Services = sequelize.define(
  "services",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    timestamps: false,
  }
);
