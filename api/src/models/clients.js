import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { v4 as uuidv4 } from "uuid";

export const Clients = sequelize.define("clients", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});
