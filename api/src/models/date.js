import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Clients } from "./clients.js";
import { Services } from "./services.js";

export const Date = sequelize.define("dates", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  bookingTime: {
    type: DataTypes.STRING,
  },
  isExpired: {
    type: DataTypes.BOOLEAN,
  },
  totalPrice: {
    type: DataTypes.DOUBLE,
  },
});

export const Date_Services = sequelize.define(
  "Date_services",
  {},
  { timestamps: false }
);

Date.belongsToMany(Services, {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  through: Date_Services,
});

Services.belongsToMany(Date, {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  through: Date_Services,
});

Date.belongsTo(Clients, {
  foreignKey: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    name: "client_id",
    allowNull: false,
  },
});

Clients.hasMany(Date, {
  foreignKey: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    name: "client_id",
    allowNull: false,
  },
});
