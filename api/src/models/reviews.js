import { BelongsTo, DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Clients } from "./clients.js";

export const Reviews = sequelize.define("reviews", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  message: {
    type: DataTypes.STRING,
  },
  stars: {
    type: DataTypes.INTEGER,
  },
});

Reviews.belongsTo(Clients, {
  foreignKey: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    name: "client_id",
    allowNull: false,
  },
});

Clients.hasOne(Reviews, {
  foreignKey: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    name: "client_id",
    allowNull: false,
  },
});
