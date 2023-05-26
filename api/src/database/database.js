import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("barber", "sa", "Code800512", {
  host: "localhost",
  dialect: "mssql",
});
