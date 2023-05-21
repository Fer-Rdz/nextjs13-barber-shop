import { Router } from "express";
import {
  deleteDateById,
  getDates,
  getTimeByDate,
  saveDates,
} from "../controllers/dates.controller.js";

const router = Router();

router
  .get("/dates", getDates)
  .get("/dates/:date", getTimeByDate)
  .post("/dates", saveDates)
  .delete("/dates/:id", deleteDateById);

export default router;
