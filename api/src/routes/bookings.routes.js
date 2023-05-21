import { Router } from "express";
import {
  getBookings,
  deleteBooking,
  createBooking,
  getBookingById,
} from "../controllers/bookings.controller.js";

const router = Router();

router
  .get("/bookings", getBookings)
  .get("/bookings/:id", getBookingById)
  .post("/bookings", createBooking)
  .delete("/bookings/:id", deleteBooking);
/*router.get("/bookings/:id");*/

export default router;
