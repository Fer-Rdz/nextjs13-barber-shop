import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Clients } from "./clients.js";
import { Services } from "./services.js";

export const Bookings = sequelize.define(
  "bookings",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    day: {
      type: DataTypes.STRING,
    },
    month: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    hour: {
      type: DataTypes.STRING,
    },
    minute: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export const Bookings_Services = sequelize.define(
  "bookings_services",
  {},
  { timestamps: false }
);

Bookings.belongsToMany(Services, {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  through: Bookings_Services,
});

Services.belongsToMany(Bookings, {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  through: Bookings_Services,
});

Bookings.belongsTo(Clients, {
  foreignKey: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    name: "client_id",
    allowNull: false,
  },
});

Clients.hasMany(Bookings, {
  foreignKey: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    name: "client_id",
    allowNull: false,
  },
});
