import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import verifyToken from "./tokens/validateTokens.js";
import employeesRoutes from "./routes/employees.routes.js";
import clientsRoutes from "./routes/clients.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import bookingsRoutes from "./routes/bookings.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import loginRoute from "./routes/login.routes.js";
import adminRoute from "./routes/admin.routes.js";
import datesRoute from "./routes/dates.routes.js";

dotenv.config();

export const port = 4000;
export const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", verifyToken, adminRoute);
app.use(employeesRoutes);
app.use(clientsRoutes);
app.use(servicesRoutes);
app.use(bookingsRoutes);
app.use(reviewsRoutes);
app.use(loginRoute);
app.use(datesRoute);
