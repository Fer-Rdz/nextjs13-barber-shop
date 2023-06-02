import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("barber", "host", "800512", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      useUTC: true, // Establece el uso de UTC en falso
      dateFirst: 1, // Establece el primer día de la semana en Lunes (1)
      timezone: "America/Monterrey", // Establece la zona horaria deseada
    },
  }
});
