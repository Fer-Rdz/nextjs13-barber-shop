import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("barber", "host", "800512", {
  host: "localhost",
  dialect: "mssql",
});
