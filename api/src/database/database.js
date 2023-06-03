import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("barber", "root", "Code800512", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    options: {
      useUTC: false, // Establece el uso de UTC en falso
      dateFirst: 1, // Establece el primer día de la semana en Lunes (1)
      timezone: "America/Monterrey", // Establece la zona horaria deseada
    },
  }
});
